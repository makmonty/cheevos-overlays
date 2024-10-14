<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue';
import CheevoBadgeList from '@/components/CheevoBadgeList.vue';
import OverlayLayout from '@/layouts/OverlayLayout.vue';
import { useGetGameInfoAndUserProgress } from '@/composables/cheevosApi';
import FormGroup from '@/components/FormGroup.vue';
import { useSettingsStore } from '@/stores/settings';
import BaseInput from '@/components/BaseInput.vue';
import IconButton from '@/components/IconButton.vue';
import BaseButton from '@/components/BaseButton.vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useOverlayPermanentUrl } from '@/composables/overlays';
import { storeToRefs } from 'pinia';

const { query } = useRoute()

const {data, run: fetchProgress} = useGetGameInfoAndUserProgress()

const settings = useSettingsStore()
const auth = useAuthStore()
const {preferences} = storeToRefs(settings)
const {setPreferences} = settings

const hideLocked = ref(!!query.hideLocked || preferences.value.progress.hideLocked)
const gameId = ref(query.gameId as string || preferences.value.global.gameId)

const sortedCheevos = computed(() =>
	data.value?.Achievements ?
	[...Object.values(data.value.Achievements)]
		.filter((cheevo) => hideLocked.value ? !!cheevo.DateEarned || !!cheevo.DateEarnedHardcore: true)
		.sort((a1, a2) =>
			Math.max(new Date(a2.DateEarned || 0).getTime(), new Date(a2.DateEarnedHardcore || 0).getTime()) -
			Math.max(new Date(a1.DateEarned || 0).getTime(), new Date(a1.DateEarnedHardcore || 0).getTime())
		)
		: [])

const {generate: generatePermanentUrl} = useOverlayPermanentUrl('game-progress')

const permanentUrl = ref('')

const onChange = () => {
	setPreferences({
		...settings.preferences,
		global: {
			...settings.preferences.global,
			gameId: gameId.value
		},
		progress: {
			...settings.preferences.progress,
			hideLocked: hideLocked.value
		}
	})

}

const fetch = () => {
	fetchProgress(gameId.value, auth.username)

  permanentUrl.value = generatePermanentUrl({
    hideLocked: hideLocked.value ? '1' : '',
    gameId: gameId.value,
  })
}

watchEffect(fetch)
</script>

<template>
	<OverlayLayout>
		<CheevoBadgeList :cheevos="sortedCheevos" />

		<template #options>
      <a :href="permanentUrl">Permanent URL</a>
			<FormGroup>
				<BaseButton size="large" @click="fetch">Refresh</BaseButton>
			</FormGroup>
			<form @submit.prevent="onChange">
				<FormGroup label="Game ID">
					<BaseInput type="text" v-model="gameId">
						<template #suffix>
							<IconButton type="submit">🔎</IconButton>
						</template>
					</BaseInput>
				</FormGroup>
			</form>
			<FormGroup label="Hide locked" checkbox>
				<input type="checkbox" v-model="hideLocked" @change="onChange" />
			</FormGroup>
		</template>
  </OverlayLayout>
</template>

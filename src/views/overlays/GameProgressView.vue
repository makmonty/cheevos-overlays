<script setup lang="ts">
import { computed, ref, toRefs, watchEffect } from 'vue';
import CheevoBadgeList from '@/components/CheevoBadgeList.vue';
import OverlayLayout from '@/layouts/OverlayLayout.vue';
import { useGetGameInfoAndUserProgress } from '@/composables/cheevosApi';
import FormGroup from '@/components/FormGroup.vue';
import { useSettingsStore } from '@/stores/settings';
import BaseInput from '@/components/BaseInput.vue';
import IconButton from '@/components/IconButton.vue';
import BaseButton from '@/components/BaseButton.vue';

const {data, run: fetchProgress} = useGetGameInfoAndUserProgress()

const settings = useSettingsStore()
const {setPreferences} = settings

const hideLocked = ref(settings.preferences.progress.hideLocked)
const gameId = ref(settings.preferences.global.gameId)

const sortedCheevos = computed(() =>
	data.value?.Achievements ?
	[...Object.values(data.value.Achievements)]
		.filter((cheevo) => hideLocked.value ? !!cheevo.DateEarned || !!cheevo.DateEarnedHardcore: true)
		.sort((a1, a2) =>
			Math.max(new Date(a2.DateEarned || 0).getTime(), new Date(a2.DateEarnedHardcore || 0).getTime()) -
			Math.max(new Date(a1.DateEarned || 0).getTime(), new Date(a1.DateEarnedHardcore || 0).getTime())
		)
		: [])

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
	fetchProgress(settings.preferences.global.gameId, settings.username)
}

watchEffect(fetch)
</script>

<template>
	<OverlayLayout>
		<CheevoBadgeList :cheevos="sortedCheevos" />

		<template #options>
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

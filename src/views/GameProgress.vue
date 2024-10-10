<script setup lang="ts">
import { computed, ref, watchEffect } from 'vue';
import CheevoBadgeList from '@/components/CheevoBadgeList.vue';
import OverlayLayout from '@/layouts/OverlayLayout.vue';
import { useGetGameInfoAndUserProgress } from '@/composables/cheevosApi';
import FormGroup from '@/components/FormGroup.vue';
import ColorPicker from '@/components/ColorPicker.vue';
import { useSettingsStore } from '@/stores/settings';

const {data, run} = useGetGameInfoAndUserProgress()

const settings = useSettingsStore()

watchEffect(() => {
	run(settings.gameId)
})

const hideLocked = ref(false)
const backgroundColor = ref('#ff00ff')
const gameId = ref(settings.gameId)

const sortedCheevos = computed(() =>
	data.value?.Achievements ?
	[...Object.values(data.value.Achievements)]
		.filter((cheevo) => hideLocked.value ? !!cheevo.DateEarned || !!cheevo.DateEarnedHardcore: true)
		.sort((a1, a2) =>
			Math.max(new Date(a2.DateEarned || 0).getTime(), new Date(a2.DateEarnedHardcore || 0).getTime()) -
			Math.max(new Date(a1.DateEarned || 0).getTime(), new Date(a1.DateEarnedHardcore || 0).getTime())
		)
		: [])

const changeGameId = () => {
	settings.setGameId(gameId.value)
}

</script>

<template>
	<OverlayLayout :backgroundColor="backgroundColor">
		<CheevoBadgeList :cheevos="sortedCheevos" />

		<div class="options">
			<form @submit.prevent="changeGameId">
				<FormGroup label="Game ID">
					<input type="text" v-model="gameId" />
					<button type="submit" @click="changeGameId">🔎</button>
				</FormGroup>
			</form>
			<FormGroup label="Hide locked" checkbox>
				<input type="checkbox" v-model="hideLocked" />
			</FormGroup>
			<FormGroup label="Background color">
				<ColorPicker v-model="backgroundColor" />
			</FormGroup>
		</div>
  </OverlayLayout>
</template>

<style scoped>
.options {
	margin-top: 64px;
	padding: 0 32px;
	display: flex;
	flex-direction: column;
	gap: 16px;
}
</style>

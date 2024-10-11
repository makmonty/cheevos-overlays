<script lang="ts" setup>
import ColorPicker from '@/components/ColorPicker.vue';
import FormGroup from '@/components/FormGroup.vue';
import { useSettingsStore } from '@/stores/settings';
import { ref } from 'vue';

const settings = useSettingsStore()
const {setPreferences} = settings

const backgroundColor = ref(settings.preferences.global.backgroundColor)
const textColor = ref(settings.preferences.global.textColor)

const onChange = () => {
	setPreferences({
		...settings.preferences,
		global: {
			...settings.preferences.global,
			backgroundColor: backgroundColor.value,
			textColor: textColor.value
		}
	})
}
</script>

<template>
	<main
		class="overlay-layout"
		:style="{backgroundColor, color: textColor}"
	>
		<slot />
		<div class="options">
			<FormGroup label="Background color">
				<ColorPicker v-model="backgroundColor" @change="onChange" />
			</FormGroup>

			<FormGroup label="Text color">
				<ColorPicker v-model="textColor" @change="onChange" />
			</FormGroup>

			<slot name="options" />
		</div>
	</main>
</template>

<style scoped>
.overlay-layout {
	height: 100%;
	overflow-y: auto;
	padding-bottom: 64px;
	color: var(--background-color);
}

.options {
	margin-top: 64px;
	padding: 0 32px;
	display: flex;
	flex-direction: column;
	gap: 16px;
}
</style>

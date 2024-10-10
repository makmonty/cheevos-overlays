<script lang="ts" setup>
const {backgroundColor} = defineProps<{
	backgroundColor: string
}>()
</script>

<template>
	<main class="overlay-layout" :style="{backgroundColor}">
		<slot />
	</main>
</template>

<style scoped>
.overlay-layout {
	height: 100%;
	overflow-y: auto;
	padding-bottom: 64px;
}
</style>

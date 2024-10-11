<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
	<div class="app-wrapper">
		<RouterView />
	</div>
</template>

<style scoped>
.app-wrapper {
	height: 100%;
	background: var(--background-color);
	color: var(--foreground-color);
}
</style>

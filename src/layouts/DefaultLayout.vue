<script setup lang="ts">
import NavBar from '@/components/NavBar.vue';
</script>

<template>
	<NavBar />
	<main class="default-layout">
		<slot />
	</main>
</template>

<style scoped>
.default-layout {
	height: 100%;
	padding: 32px;
}
</style>

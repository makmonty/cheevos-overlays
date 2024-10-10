<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue';
</script>

<template>
	<DefaultLayout>
		<nav>
			<ul>
				<li><router-link :to="{name: 'game-progress'}">Game progress</router-link></li>
			</ul>
		</nav>
	</DefaultLayout>
</template>

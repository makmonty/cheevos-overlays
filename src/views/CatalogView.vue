<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue';

const catalog = [
	{
		title: 'Game progress',
		to: 'game-progress'
	},
	{
		title: 'Profile',
		to: 'user-profile'
	}
]
</script>

<template>
	<DefaultLayout>
		<h1>Catalog</h1>
		<nav>
			<ul class="list">
				<li v-for="item in catalog" :key="item.to">
					<router-link :to="{name: item.to}">{{item.title}}</router-link>
				</li>
			</ul>
		</nav>
	</DefaultLayout>
</template>

<style scoped>
.list {
	list-style: none;
	display: flex;
	flex-direction: column;
	gap: 8px;
	font-size: 1.4em;
}
</style>

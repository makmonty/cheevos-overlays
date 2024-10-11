<script lang="ts" setup>
import { useSettingsStore } from '@/stores/settings';
import { useRouter } from 'vue-router';
import BaseButton from './BaseButton.vue';

const router = useRouter()

const settings = useSettingsStore();
const logout = () => {
	settings.logout()
	router.push({name: 'home'})
}
</script>

<template>
	<nav class="nav-bar">
		<div class="nav-bar-right">
			<div v-if="settings.username" class="nav-bar-session">
				<div>Logged in as <span>{{settings.username}}</span></div>
				<BaseButton variant="text" @click="logout">Logout</BaseButton>
			</div>
			<div v-else>
				<router-link :to="{name: 'home'}">Login</router-link>
			</div>
		</div>
	</nav>
</template>

<style scoped>
.nav-bar {
	height: 32px;
	display: flex;
	align-items: center;
}

.nav-bar-right {
	display: flex;
	align-items: center;
	gap: 8px;
	margin-left: auto;
	padding-right: 16px;
}

.nav-bar-session {
	display: flex;
	align-items: center;
	gap: 8px;
}
</style>

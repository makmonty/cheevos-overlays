<script setup lang="ts">
import FormGroup from '@/components/FormGroup.vue';
import { useGetUserProfile } from '@/composables/cheevosApi';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import { useSettingsStore } from '@/stores/settings';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const username = ref('')
const webApiKey = ref('')

const {setUsername, setWebApiKey, setProfile} = useSettingsStore()
const {run, data: userProfile, isLoading, isError} = useGetUserProfile()

const submit = async () => {
	setUsername(username.value)
	setWebApiKey(webApiKey.value)
	await run()

	if (isError.value) {
		return
	}
	setProfile(userProfile.value)
	console.log(userProfile.value)
	router.push({name: 'catalog'})
}

</script>

<template>
	<DefaultLayout>
		<form class="login-form" @submit.prevent="submit">
			<FormGroup label="Username">
				<input type="text" v-model="username" />
			</FormGroup>
			<FormGroup label="Web API Key">
				<input type="text" v-model="webApiKey" />
			</FormGroup>
			<div>
				<button type="submit">
					Login
				</button>
			</div>
		</form>
		<p v-if="isLoading">Loading...</p>
	</DefaultLayout>
</template>

<style scoped>
.login-form {
	display: flex;
	flex-direction: column;
	gap: 16px;
}
</style>

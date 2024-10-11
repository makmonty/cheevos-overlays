<script setup lang="ts">
import LoginForm from '@/components/LoginForm.vue';
import { useLogin } from '@/composables/auth';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const {
	isLoading,
	isError,
	errors,
	submit
} = useLogin({
	onLogin: () => {
		router.push({name: 'catalog'})
	}
})

</script>

<template>
	<DefaultLayout>
		<div class="login">
			<img src="../assets/images/trophy.png" class="icon" />

			<LoginForm @submit="submit" class="login-form" :disabled="isLoading" />
			<p v-if="isLoading">Loading...</p>
			<div v-if="isError">
				<p>Error</p>
				<ul>
					<li v-for="(error, index) in errors" :key="index">{{error}}</li>
				</ul>
			</div>

			<section class="disclaimer">
				<h3>Disclaimer</h3>
				<p>
					Every communication made is exclusively between the app itself and the Retroachievements API. No other backend is involved. You can check it yourself in the Network tab of the developer tools of your browser. If we ever add some monitoring features, we'll notify it in this	disclaimer.
				</p>
			</section>
		</div>
	</DefaultLayout>
</template>

<style scoped>
.icon {
	width: 36px;
	margin-bottom: 64px;
}

.login {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 240px;
	margin: 0 auto;
}

.login-form {
	width: 100%;
}

.disclaimer {
	margin-top: 36px;
}
</style>

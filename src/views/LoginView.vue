<script setup lang="ts">
import LoginForm from '@/components/LoginForm.vue';
import { useLogin } from '@/composables/auth';
import FullScreenLayout from '@/layouts/FullScreenLayout.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const { isLoading, isError, errors, submit } = useLogin({
  onLogin: () => {
    router.push({ name: 'catalog' });
  }
});
</script>

<template>
  <FullScreenLayout data-testid="home-view">
    <div class="login">
      <img src="../assets/images/trophy.png" class="icon" />
      <h1 class="login-title">Retroachievements overlays</h1>

      <LoginForm @submit="submit" class="login-form" :disabled="isLoading" size="large" />
      <p v-if="isLoading">Loading...</p>
      <div v-if="isError">
        <p>Error</p>
        <ul data-testid="login-errors">
          <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
        </ul>
      </div>

      <section class="howto" target="_blank">
        <p>
          <a
            href="https://github.com/makmonty/cheevos-overlays?tab=readme-ov-file#how-to-use"
            title="How to use the overlays?"
            >How to use?</a
          >
        </p>
      </section>

      <section class="disclaimer">
        <h3>Disclaimer</h3>
        <p>
          Every communication made is exclusively between the app itself and the Retroachievements
          API, and a self-hosted monitoring tool. No other backend is involved. You can check it
          yourself in the Network tab of the developer tools of your browser.
        </p>
      </section>
    </div>
  </FullScreenLayout>
</template>

<style scoped>
.icon {
  width: 36px;
  margin: 64px 0 32px 0;
}

.login-title {
  text-align: center;
  margin: 0;
  margin-bottom: 32px;
  padding: 0;
  font-size: 1.4rem;
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

.catalog {
  margin-top: 16px;
}

.howto {
  margin-top: 24px;
}

.disclaimer {
  margin-top: 24px;
}
</style>

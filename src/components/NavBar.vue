<script lang="ts" setup>
import { useRouter } from 'vue-router';
import BaseButton from './buttons/BaseButton.vue';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';

const router = useRouter();
const auth = useAuthStore();

const { username } = storeToRefs(auth);

const logout = () => {
  auth.logout();
  router.push({ name: 'login' });
};
</script>

<template>
  <nav class="nav-bar">
    <div class="nav-bar-right">
      <div v-if="username" class="nav-bar-session">
        <div>
          Logged in as <span>{{ username }}</span>
        </div>
        <BaseButton variant="text" @click="logout">Logout</BaseButton>
      </div>
      <div v-else>
        <router-link :to="{ name: 'home' }">Login</router-link>
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

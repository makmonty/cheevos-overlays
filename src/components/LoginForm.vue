<script setup lang="ts">
import BaseButton from '@/components/BaseButton.vue';
import FormGroup from '@/components/FormGroup.vue';
import { ref } from 'vue';
import BaseInput from './BaseInput.vue';

const { disabled } = defineProps<{
  disabled?: boolean;
}>();
const emit = defineEmits<{
  (e: 'submit', username: string, webApiKey: string): void;
}>();

const username = ref('');
const webApiKey = ref('');

const submit = async () => {
  emit('submit', username.value, webApiKey.value);
};
</script>

<template>
  <form class="login-form" @submit.prevent="submit">
    <FormGroup label="Username">
      <BaseInput type="text" v-model="username" data-testid="login-form-input-username" />
    </FormGroup>
    <FormGroup label="Web API Key">
      <BaseInput type="password" v-model="webApiKey" data-testid="login-form-input-webapikey" />
    </FormGroup>
    <div>
      <BaseButton type="submit" :disabled="disabled" data-testid="login-form-submit">
        Login
      </BaseButton>
    </div>
  </form>
</template>

<style scoped>
.login-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>

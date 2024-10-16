<script setup lang="ts">
import { ref } from 'vue';
import BaseButton from '@/components/buttons/BaseButton.vue';
import FormGroup from '@/components/forms/FormGroup.vue';
import BaseInput from '@/components/forms/BaseInput.vue';

const { disabled, size = 'medium' } = defineProps<{
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
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
    <FormGroup label="Username" :size="size">
      <BaseInput
        type="text"
        v-model="username"
        :size="size"
        data-testid="login-form-input-username"
      />
    </FormGroup>
    <FormGroup label="Web API Key" :size="size">
      <BaseInput
        type="password"
        v-model="webApiKey"
        :size="size"
        data-testid="login-form-input-webapikey"
      />
    </FormGroup>
    <div>
      <BaseButton type="submit" :disabled="disabled" data-testid="login-form-submit" :size="size">
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

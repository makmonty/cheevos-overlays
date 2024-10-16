<script lang="ts" setup>
import { ref } from 'vue';

const model = defineModel();

const update = () => {
  model.value = color.value;
};

const color = ref(model);
</script>

<template>
  <input type="color" @input="update" v-model="color" />
</template>

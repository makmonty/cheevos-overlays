<script lang="ts" setup>
const {type = 'text'} = defineProps<{
	type: 'text' | 'password' | 'number' | 'email' | 'url'
}>()

const model = defineModel()

</script>

<template>
	<input :type="type" v-model="model" class="input" />
</template>

<style scoped>
.input {
	border: 1px solid transparent;
	border-radius: var(--default-border-radius);
}
</style>

<script lang="ts" setup>
const {type = 'button'} = defineProps<{
	type: 'button' | 'submit'
	disabled?: boolean
}>()
</script>

<template>
	<button :type="type" class="button" :disabled="disabled">
		<slot />
	</button>
</template>

<style scoped>
.button {
	border: 1px solid transparent;
	background: var(--info-color);
	border-radius: var(--default-border-radius);
}
</style>

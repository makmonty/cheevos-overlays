<script lang="ts" setup>
const {label, checkbox} = defineProps<{
	label?: string
	checkbox?: boolean
}>()
</script>

<template>
	<label class="label" :class="{checkbox, input: !checkbox}">
		<span v-if="!checkbox" class="label-text">{{label}}</span>
		<slot />
		<span v-if="checkbox">{{label}}</span>
	</label>
</template>

<style scoped>
.label {
	.input {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}
}
.label-text {
	display: block;
}
</style>

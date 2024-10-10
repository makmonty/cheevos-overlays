<script lang="ts" setup>
const {label, checkbox} = defineProps<{
	label: string
	checkbox?: boolean
}>()
</script>

<template>
	<div>
		<label>
			<span v-if="!checkbox" class="label-text">{{label}}</span>
			<slot />
			<span v-if="checkbox">{{label}}</span>
		</label>
	</div>
</template>

<style scoped>
.label-text {
	display: block;
}
</style>

<script lang="ts" setup>
import { ref, useSlots } from 'vue';

const {type = 'text', size = 'medium'} = defineProps<{
	type?: 'text' | 'password' | 'number' | 'email' | 'url'
	size?: 'small' | 'medium' | 'large'
}>()

const model = defineModel()
const slots = useSlots()
const focused = ref(false)

const onFocus = () => {
	focused.value = true
}

const onBlur = () => {
	focused.value = false
}

</script>

<template>
	<div class="input-wrapper" :class="{[size]: true, focused}">
		<input :type="type" v-model="model" class="input" @focus="onFocus" @blur="onBlur" />
		<div v-if="slots.suffix" class="input-suffix">
			<slot name="suffix" />
		</div>
	</div>
</template>

<style scoped>
.input-wrapper {
	border: none;
	outline: 2px solid transparent;
	border-radius: var(--default-border-radius);
	background: var(--foreground-color);
	display: flex;
	height: 30px;

	&.focused {
		outline-color: var(--focus-input-border-color);
	}

	&.large {
		.input {
			padding: 8px;
			font-size: 16px;
		}
	}
}

.input {
	flex-grow: 1;
	background: none;
	border: none;
	outline: none;
	padding: 0 4px;
	font-size: inherit;
}

.input-suffix {
	color: var(--background-color);
}
</style>

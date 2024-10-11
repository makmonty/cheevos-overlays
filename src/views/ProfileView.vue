<script setup lang="ts">
import { useSettingsStore } from '@/stores/settings';

const {profile} = useSettingsStore()
</script>

<template>
  <main>
		<p>User profile</p>
		{{ profile }}
  </main>
</template>

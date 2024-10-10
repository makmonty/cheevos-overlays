<script setup lang="ts">
import { useGetUserProfile } from '@/composables/cheevosApi';

const {data, run} = useGetUserProfile()

run()

</script>

<template>
  <main>
		<p>User profile</p>
		{{ data }}
  </main>
</template>

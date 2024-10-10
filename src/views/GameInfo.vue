<script setup lang="ts">
import { useGetGame } from '@/composables/cheevosApi';
import { useRoute } from 'vue-router';

const route = useRoute()
const gameId = route.query.game as string
const {data, run} = useGetGame()

run(gameId)

</script>

<template>
  <main>
		<p>holi</p>
		{{ data }}
  </main>
</template>

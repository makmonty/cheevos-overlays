<script lang="ts" setup>
import type { Cheevo } from '@/composables/types';
import { cheevosMediaBaseUrl } from '@/utils/config';
import { toRefs } from 'vue';

const props = defineProps<{
  cheevos: Cheevo[];
}>();

const { cheevos } = toRefs(props);
</script>

<template>
  <ul class="cheevo-badge-list">
    <li v-for="cheevo in cheevos" :key="cheevo.ID" class="cheevo-badge" data-testid="cheevo-item">
      <img
        :src="
          cheevosMediaBaseUrl + `/Badge/${cheevo.BadgeName}${cheevo.DateEarned ? '' : '_lock'}.png`
        "
        :alt="cheevo.Title"
        :title="cheevo.Title"
      />
    </li>
  </ul>
</template>

<style scoped>
.cheevo-badge-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 2px;
}

.cheevo-badge {
  display: flex;
  width: 64px;
  flex-direction: column;
}
</style>

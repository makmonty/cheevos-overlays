<script setup lang="ts">
import OverlayLayout from '@/layouts/OverlayLayout.vue';
import { cheevosMediaBaseUrl } from '@/composables/cheevosApi';
import { computed, ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { useOverlayPermanentUrl } from '@/composables/overlays';

const auth = useAuthStore()

const {profile} = storeToRefs(auth)

const rankPercent = computed(() => Math.round(10000 * (profile.value?.Rank || 0) / (profile.value?.TotalRanked
	|| 1)) / 100)

const {generate: generatePermanentUrl} = useOverlayPermanentUrl('user-profile')
const permanentUrl = ref(generatePermanentUrl({}))
</script>

<template>
	<OverlayLayout>
		<div v-if="profile" class="profile">
			<img :src="`${cheevosMediaBaseUrl}${profile.UserPic}`" class="image" />
			<div class="info">
				<div class="username">
					{{profile.User}}
					<span class="points">
						({{profile.TotalPoints}} / {{profile.TotalTruePoints}})
					</span>
				</div>
				<div class="motto">{{profile.Motto}}</div>
				<div class="rank">Rank: #{{profile.Rank}} of {{profile.TotalRanked}} (Top {{rankPercent}}%)</div>
			</div>
		</div>

    <template #options>
      <a :href="permanentUrl">Permanent URL</a>
    </template>
  </OverlayLayout>
</template>

<style scoped>
.profile {
	display: flex;
	gap: 16px;
}

.info {
	font-size: 1.4em;
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 8px;
}

.image {
	width: 100px;
}

.username {
	font-size: 1.4em;
}
</style>

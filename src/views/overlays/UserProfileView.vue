<script setup lang="ts">
import OverlayLayout from '@/layouts/OverlayLayout.vue';
import { cheevosMediaBaseUrl } from '@/composables/cheevosApi';
import { useSettingsStore } from '@/stores/settings';
import { computed } from 'vue';

const settings = useSettingsStore()

const profile = settings.profile

const rankPercent = computed(() => Math.round(10000 * (profile?.Rank || 0) / (profile?.TotalRanked
	|| 1)) / 100)
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

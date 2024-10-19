<script setup lang="ts">
import OverlayLayout from '@/layouts/OverlayLayout.vue';
import { computed, ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { useOverlayPermanentUrl } from '@/composables/overlays';
import { cheevosMediaBaseUrl } from '@/utils/config';
import { useGetCurrentUserSummary } from '@/composables/cheevosApi';
import { useSettingsStore } from '@/stores/settings';
import FormGroup from '@/components/forms/FormGroup.vue';
import BaseInput from '@/components/forms/BaseInput.vue';
import BaseButton from '@/components/buttons/BaseButton.vue';

const auth = useAuthStore();
const settings = useSettingsStore();

const { profile } = storeToRefs(auth);
const { preferences } = storeToRefs(settings);
const { setPreferences } = settings;
const avatarScale = ref(preferences.value.profile.avatarScale);
const hideMotto = ref(preferences.value.profile.hideMotto);
const hideRank = ref(preferences.value.profile.hideRank);
const hidePoints = ref(preferences.value.profile.hidePoints);
const hideAvatar = ref(preferences.value.profile.hideAvatar);
const hideUsername = ref(preferences.value.profile.hideUsername);

const rankPercent = computed(
  () => Math.round((10000 * (profile.value?.Rank || 0)) / (profile.value?.TotalRanked || 1)) / 100
);

const { generateUrl } = useOverlayPermanentUrl('user-profile');
const permanentUrl = ref(generateUrl({}));

const { run: fetch } = useGetCurrentUserSummary();

const onChange = () => {
  setPreferences({
    ...settings.preferences,
    profile: {
      ...settings.preferences.profile,
      avatarScale: avatarScale.value,
      hideMotto: hideMotto.value,
      hideRank: hideRank.value,
      hidePoints: hidePoints.value,
      hideAvatar: hideAvatar.value,
      hideUsername: hideUsername.value
    }
  });
  permanentUrl.value = generateUrl({
    avatarScale: avatarScale.value.toString(),
    hideMotto: hideMotto.value ? '1' : '',
    hidePoints: hidePoints.value ? '1' : '',
    hideAvatar: hideAvatar.value ? '1' : '',
    hideUSername: hideUsername.value ? '1' : '',
    hideRank: hideRank.value ? '1' : ''
  });
};
</script>

<template>
  <OverlayLayout :refresh="fetch">
    <div v-if="profile" class="profile">
      <img
        v-if="!hideAvatar"
        :src="`${cheevosMediaBaseUrl}${profile.UserPic}`"
        :style="{ width: `calc(var(--avatar-default-size) * ${preferences.profile.avatarScale})` }"
        class="image"
      />
      <div class="info">
        <div class="username">
          <span v-if="!hideUsername">{{ profile.User }}</span>
          <span v-if="!hidePoints" class="points">
            ({{ profile.TotalPoints }} / {{ profile.TotalTruePoints }})
          </span>
        </div>
        <div v-if="!hideMotto" class="motto">{{ profile.Motto }}</div>
        <div v-if="!hideRank" class="rank">
          Rank: #{{ profile.Rank }} of {{ profile.TotalRanked }} (Top {{ rankPercent }}%)
        </div>
      </div>
    </div>

    <template #options>
      <a :href="permanentUrl">Permanent URL</a>
      <FormGroup class="avatar-scale-input" label="Avatar scale" inline>
        <BaseInput type="number" v-model="avatarScale" @change="onChange"> </BaseInput>
      </FormGroup>
      <FormGroup label="Hide motto" checkbox>
        <input type="checkbox" v-model="hideMotto" @change="onChange" />
      </FormGroup>
      <FormGroup label="Hide rank" checkbox>
        <input type="checkbox" v-model="hideRank" @change="onChange" />
      </FormGroup>
      <FormGroup label="Hide points" checkbox>
        <input type="checkbox" v-model="hidePoints" @change="onChange" />
      </FormGroup>
      <FormGroup label="Hide avatar" checkbox>
        <input type="checkbox" v-model="hideAvatar" @change="onChange" />
      </FormGroup>
      <FormGroup label="Hide username" checkbox>
        <input type="checkbox" v-model="hideUsername" @change="onChange" />
      </FormGroup>
    </template>
  </OverlayLayout>
</template>

<style scoped>
.profile {
  display: flex;
  gap: 16px;
  --avatar-default-size: 128px;
}

.image {
  flex-shrink: 0;
}

.info {
  font-size: 1.4em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
}

.username {
  font-size: 1.4em;
  font-weight: bold;
}

.avatar-scale-input :deep(input) {
  width: 50px;
}
</style>

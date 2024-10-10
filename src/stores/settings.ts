import type { UserProfile } from '@/composables/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const WEB_API_KEY_STORAGE_KEY = 'WEB_API_KEY'
const USERNAME_STORAGE_KEY = 'USERNAME'
const GAME_ID_STORAGE_KEY = 'GAME_ID'

export const useSettingsStore = defineStore('settings', () => {
	const webApiKey = ref(localStorage.getItem(WEB_API_KEY_STORAGE_KEY) || '')
	const username = ref(localStorage.getItem(USERNAME_STORAGE_KEY) || '')
	const gameId = ref(localStorage.getItem(GAME_ID_STORAGE_KEY) || '')
	const profile = ref<UserProfile | null>(null)

	function setWebApiKey(newValue: string) {
		webApiKey.value = newValue
		localStorage.setItem(WEB_API_KEY_STORAGE_KEY, newValue)
	}

	function setUsername(newValue: string) {
		username.value = newValue
		localStorage.setItem(USERNAME_STORAGE_KEY, newValue)
	}

	function setGameId(newValue: string) {
		gameId.value = newValue
		localStorage.setItem(GAME_ID_STORAGE_KEY, newValue)
	}

	function setProfile(newValue: UserProfile | null) {
		profile.value = newValue
	}

	return {
		webApiKey,
		username,
		gameId,
		setWebApiKey,
		setUsername,
		setGameId,
		setProfile
	}
})

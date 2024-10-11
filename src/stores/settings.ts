import type { UserSummary } from '@/composables/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const WEB_API_KEY_STORAGE_KEY = 'WEB_API_KEY'
const USERNAME_STORAGE_KEY = 'USERNAME'
const USER_PROFILE_STORAGE_KEY = 'USER_PROFILE'
const PREFERENCES_STORAGE_KEY = 'PREFERENCES'

interface Preferences {
	global: {
		backgroundColor: string
		textColor: string
		gameId: string
	},
	progress: {
		hideLocked: boolean
	}
}

export const useSettingsStore = defineStore('settings', () => {
	const webApiKey = ref(localStorage.getItem(WEB_API_KEY_STORAGE_KEY) || '')
	const username = ref(localStorage.getItem(USERNAME_STORAGE_KEY) || '')
	const profile = ref<UserSummary | null>(JSON.parse(localStorage.getItem(USER_PROFILE_STORAGE_KEY) || 'null'))
	const preferences = ref<Preferences>(JSON.parse(localStorage.getItem(PREFERENCES_STORAGE_KEY) || 'null') || {
		global: {
			backgroundColor: '#ff00ff',
			textColor: '#000000'
		},
		progress: {
			hideLocked: false
		}
	})

	function setWebApiKey(newValue: string) {
		webApiKey.value = newValue
		localStorage.setItem(WEB_API_KEY_STORAGE_KEY, newValue)
	}

	function setUsername(newValue: string) {
		username.value = newValue
		localStorage.setItem(USERNAME_STORAGE_KEY, newValue)
	}

	function setProfile(newValue: UserSummary | null) {
		profile.value = newValue
		localStorage.setItem(USER_PROFILE_STORAGE_KEY, JSON.stringify(newValue))
	}

	function setPreferences(newValue: Preferences) {
		preferences.value = newValue
		localStorage.setItem(PREFERENCES_STORAGE_KEY, JSON.stringify(newValue))
	}

	function logout() {
		webApiKey.value = ''
		username.value = ''
		profile.value = null
		localStorage.removeItem(WEB_API_KEY_STORAGE_KEY)
		localStorage.removeItem(USERNAME_STORAGE_KEY)
		localStorage.removeItem(USER_PROFILE_STORAGE_KEY)
	}

	return {
		webApiKey,
		username,
		profile,
		preferences,
		setWebApiKey,
		setUsername,
		setProfile,
		logout,
		setPreferences
	}
})

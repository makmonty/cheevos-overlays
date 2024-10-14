import { defineStore } from 'pinia'
import { ref } from 'vue'

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
	const preferences = ref<Preferences>(JSON.parse(localStorage.getItem(PREFERENCES_STORAGE_KEY) || 'null') || {
		global: {
			backgroundColor: '#ff00ff',
			textColor: '#000000'
		},
		progress: {
			hideLocked: false
		}
	})

	function setPreferences(newValue: Preferences) {
		preferences.value = newValue
		localStorage.setItem(PREFERENCES_STORAGE_KEY, JSON.stringify(newValue))
	}

	return {
		preferences,
		setPreferences
	}
})

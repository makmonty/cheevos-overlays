import { useSettingsStore } from "@/stores/settings"
import { useGetUserSummary } from "./cheevosApi"
import { ref } from "vue"
import { computed } from "vue"

export const useLogin = ({
	onLogin
}: {
	onLogin?: () => void
}) => {
	const {setUsername, setWebApiKey, setProfile} = useSettingsStore()
	const {
		run: fetchProfile,
		data: profile,
		error: profileError,
		isLoading: profileIsLoading,
		isError: profileIsError
	} = useGetUserSummary()
	const validationErrors = ref<string[]>([])

	const isError = computed(() => validationErrors.value.length || profileIsError.value)
	const errors = computed(() => [
		...validationErrors.value,
		...(profileError.value ? [profileError.value] : [])
	])

	const submit = async (username: string, webApiKey: string) => {
		validationErrors.value = []
		if (!username) {
			validationErrors.value.push('Username is required')
		}
		if (!webApiKey) {
			validationErrors.value.push('Web API key is required')
		}

		if (validationErrors.value.length) {
			return
		}

		setUsername(username)
		setWebApiKey(webApiKey)
		await fetchProfile(username)

		if (isError.value) {
			return
		}
		setProfile(profile.value)

		onLogin?.()
	}

	return {
		userProfile: profile,
		isLoading: profileIsLoading,
		isError,
		errors,
		submit
	}
}

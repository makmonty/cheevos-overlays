import { ref, computed } from "vue"
import { useAuthStore } from "@/stores/auth"
import { storeToRefs } from "pinia"

export const useLogin = ({
	onLogin
}: {
	onLogin?: () => void
}) => {
  const auth = useAuthStore()
	const {profile, isLoading, isSuccess, error: authError} = storeToRefs(auth)
  const {login, setProfile, setCredentials} = auth

	const validationErrors = ref<string[]>([])

	const isError = computed(() => validationErrors.value.length || authError.value)
	const errors = computed(() => [
		...validationErrors.value,
		...(authError.value ? [authError.value] : [])
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

    setCredentials(username, webApiKey)
    await login()

		if (isError.value) {
			return
		}
		setProfile(profile.value)

		onLogin?.()
	}

	return {
		userProfile: profile,
		isLoading,
    isSuccess,
		isError,
		errors,
		submit
	}
}

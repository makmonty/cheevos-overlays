import { useSettingsStore } from "@/stores/settings"
import { useGetUserProfile } from "./cheevosApi"

export const useLogin = ({
	onLogin
}: {
	onLogin?: () => void
}) => {
	const {setUsername, setWebApiKey, setProfile} = useSettingsStore()
	const {run, data: userProfile, isLoading, isError} = useGetUserProfile()

	const submit = async (username: string, webApiKey: string) => {
		setUsername(username)
		setWebApiKey(webApiKey)
		await run(username)

		if (isError.value) {
			return
		}
		setProfile(userProfile.value)

		onLogin?.()
	}

	return {
		userProfile,
		isLoading,
		isError,
		submit
	}
}

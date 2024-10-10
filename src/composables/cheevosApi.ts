import {ref} from 'vue'
import { type GameProgress, type Game, type UserProfile } from './types'
import { useSettingsStore } from '@/stores/settings'

export const cheevosBaseUrl = 'https://retroachievements.org'
export const cheevosMediaBaseUrl = 'https://media.retroachievements.org'

const paramsToQueryString = (params: Record<string, string>): string => {
	return Object.entries(params).reduce<string[]>((prev, [key, value]) => [
		...prev,
		`${key}=${value}`
	], []).join('&')
}

export const useCheevosAuth = () => {
	const settings = useSettingsStore()

	return {
		username: settings.username, webApiKey: settings.webApiKey
	}
}

export const useCheevosGet = <DataT>() => {
	const auth = useCheevosAuth()
	const data = ref<DataT | null>(null)
	const isLoading = ref(false)
	const isSuccess = ref(false)
	const isError = ref(false)

	const run = async (action: string, params: Record<string, string> = {}) => {
		try {
			isLoading.value = true
			const query = paramsToQueryString({
				...params,
				y: auth.webApiKey,
				u: auth.username,
				z: auth.username,
			})
			const response = await fetch(`${cheevosBaseUrl}/API/API_${action}.php?${query}`)
			data.value = await response.json()
			isError.value = false
		} catch (e) {
			console.log(e)
			isSuccess.value = false
			isError.value = true
		} finally {
			isLoading.value = false
		}

		return data.value
	}

	return {
		data,
		isLoading,
		isError,
		isSuccess,
		run
	}
}

export const useGetUserProfile = () => {
	const result = useCheevosGet<UserProfile>()
	const {run: baseRun} = result
	const run = () => {
		return baseRun('GetUserProfile')
	}

	return {
		...result,
		run
	}
}

export const useGetGame = () => {
	const result = useCheevosGet<Game>()
	const {run: baseRun} = result
	const run = (gameId: string) => {
		return baseRun('GetGame', {i: gameId})
	}

	return {
		...result,
		run
	}
}

export const useGetGameInfoAndUserProgress = () => {
	const result = useCheevosGet<GameProgress>()
	const {run: baseRun} = result
	const run = (gameId: string) => {
		return baseRun('GetGameInfoAndUserProgress', {g: gameId})
	}

	return {
		...result,
		run
	}
}

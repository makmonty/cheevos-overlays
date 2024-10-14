export const paramsToQueryString = (params: Record<string, string>): string => {
	return Object.entries(params).reduce<string[]>((prev, [key, value]) => [
		...prev,
		`${key}=${value}`
	], []).join('&')
}

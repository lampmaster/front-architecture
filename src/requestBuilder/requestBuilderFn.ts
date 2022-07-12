export function requestBuilderFn(urlOrParams: string | RequestInit, params?: RequestInit) {
	if (typeof urlOrParams === 'string') {
		fetch(urlOrParams, params)
	}

	const baseParams = params

	return (urlOrParams: string | RequestInit, params?: RequestInit) => {
		return requestBuilderFn(urlOrParams, {...baseParams, ...params})
	}
}

const postRequest = requestBuilderFn({method: 'POST'})
postRequest({headers: {'X-Custom-Header': 'ProcessThisImmediately'}})('www.example.com')
postRequest({headers: {'Content-Type': 'application/json'}})('www.example.com')

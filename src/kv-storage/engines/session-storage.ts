import type { KVStorageEngine } from "./interface";

export default class SessionStorageEngine implements KVStorageEngine{
	get(key: string): ReturnType<KVStorageEngine['get']> {
		return sessionStorage.getItem(key)
	}

	set(key: string, value: string): ReturnType<KVStorageEngine['set']> {
		return sessionStorage.setItem(key, value)
	}

	remove(key: string): ReturnType<KVStorageEngine['remove']> {
		return sessionStorage.removeItem(key)
	}
}
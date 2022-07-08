import DefaultEngine from './engines'

import type { KVStorageEngine, StorageOptions, SerializableValue } from './interface';

export default class KVFacrtory {
	readonly namespace: string
	readonly #engine: KVStorageEngine

	constructor(namespace, opt?: StorageOptions) {
		this.namespace = namespace
		this.#engine = opt?.engine ?? new DefaultEngine()
	}

	async get<T extends SerializableValue>(name: string) {
		const rawData = await this.#engine.get(this.#getKey(name))
		return JSON.parse(rawData ?? 'null')
	}

	async set(name: string, value: SerializableValue): Promise<void> {
		const
			key = this.#getKey(name),
			data = JSON.stringify(value)

		await this.#engine.set(key, data)
	}

	async remove(name: string, value: SerializableValue): Promise<void> {
		await this.#engine.remove(this.#getKey(name))
	}

	#getKey(key: string) {
		return `[[${this.namespace}]]-${key}`
	}
}
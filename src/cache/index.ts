interface AbstractCache<V, K> {
	get(key: K): V | undefined
	set(key: K, value): void
	remove(key: K): void
	clear(): void
}

export class SimpleCache<V, K = string> implements AbstractCache<V, K> {
	protected store: Map<K, V> = new Map()

	get(key: K) {
		return this.store.get(key)
	}

	set(key: K, value: V) {
		this.store.set(key, value)
	}
	remove(key: K) {
		this.store.delete(key)
	}

	clear() {
		this.store.clear()
	}
}

interface LRUCacheOptions {
	size: number
}

export class LRUCache <V, K = string> implements AbstractCache<V, K> {
	protected queue: Map<K, V> = new Map()
	protected size: number

	constructor({size}: LRUCacheOptions) {
		this.size = size
	}

	get(key: K) {
		if (this.queue.has(key)) {
			const value = this.queue.get(key)

			this.queue.delete(key)
			this.set(key, value)

			return value
		}

		return undefined
	}

	set(key: K, value: V) {
		if (this.queue.has(key)) {
			this.queue.delete(key)
		}

		if (this.queue.size >= this.size) {
			const lastKey = this.queue.keys().next().value
			this.remove(lastKey)
		}

		this.queue.set(key, value)
	}

	remove(key: K) {
		this.queue.delete(key)
	}

	clear() {
		this.queue.clear()
	}
}

export class NeverCache<V, K = string> implements AbstractCache<V, K> {
	protected store: Map<K, V> = new Map()

	get(key: K) {
		return undefined
	}

	set(key: K, value: V) {

	}

	remove(key: K) {

	}

	clear() {

	}
}

function ttlDecorator<T extends AbstractCache<any, any>>(ttl: number, cache: T): T {
	const {
		set: origSet,
		get: origGet,
		remove: origRemove,
		clear: origClear,
	} = cache

	const timers = new Map<unknown, number>()

	Object.assign(cache, {
		set(key: unknown, value: unknown) {
			if (timers.has(key)) {
				clearTimeout(timers.get(key))
			}

			origSet.call(this, key, value)
			timers.set(key, setTimeout(this.remove.bind(this, key), ttl))
		},

		remove(key: unknown) {
			if (timers.has(key)) {
				clearTimeout(timers.get(key))
				timers.delete(key)
			}

			origRemove.call(this, key)
		},

		clear() {
			for (const id of timers.values()) {
				clearTimeout(id)
			}

			timers.clear()
			origClear.call(this )
		}
	})

	return cache
}

const lru = new LRUCache({size: 10})
ttlDecorator(1000, lru)
interface AbstractObserver {
	on(event: string, handler: Function): Function;
	once(event: string, handler: Function): Function;
	off(event?: string, handler?: Function): void;
}

interface AbstractStreamObserver {
	stream(event: string): AsyncIterableIterator<unknown>
}

interface AbstractEventEmitter {
	emit(event: string, payload: unknown): void
}

class EventEmitter implements AbstractObserver, AbstractStreamObserver, AbstractEventEmitter {
	// Could be several handlers for one event
	protected listeners: Map<string, Set<Function>> = new Map()

	on(event: string, handler: Function) {
		const set = this.getEventSetter(event)
		set.add(handler)
		return handler
	}

	once(event: string, handler: Function) {
		const set = this.getEventSetter(event)
		set.add(handlerWrapper)

		function handlerWrapper(payload: unknown) {
			try {
				handler(payload)
			} finally {
				set.delete(handler)
			}
		}

		return handlerWrapper
	}

	off(event?: string, handler?: Function) {
		if (event == null) {
			this.listeners.clear()
			return
		}

		if (handler == null) {
			this.getEventSetter(event).clear()
			return;
		}

		this.getEventSetter(event).delete(handler)
	}

	async *stream(event: string): AsyncIterableIterator<unknown> {
		while (true) {
			yield await new Promise((resolve) => {
				this.once(event, resolve)
			})
		}
	}

	emit(event: string, payload: unknown) {
		const set = this.getEventSetter(event)
		set.forEach(handler => {
			try {
				handler(payload)
			} catch(e) {
				throw new Error(`emit error ${e}`)
			}
		})

	}

	protected getEventSetter(event) {
		let set = this.listeners.get(event)

		if (set == null) {
			set = new Set()
			this.listeners.set(event, set)
		}

		return set
	}
}
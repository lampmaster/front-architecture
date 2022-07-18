class ProxyAsync {
	setTimeout(handler, delay?: number) {
		// do something
		return setTimeout(handler, delay)
	}

	clearTimeout(timerId) {
		// do something
		clearTimeout(timerId)
	}

	promise() {
		// do something
	}

	// ...
}

class SomeComponent {
	async = new ProxyAsync()

	timeoutTimer?: number

	doSomething() {
		this.timeoutTimer = this.async.setTimeout(() => {}, 100)
	}

	onUnmount() {
		this.async.clearTimeout(this.timeoutTimer)
	}
}
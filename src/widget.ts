class EventEmitter {
	on(event: string, cb: Function) {

	}

	once(event: string, cb: Function) {

	}

	off(event?: string, cb?: Function) {

	}

	emit(event: string, data: any) {

	}
}

interface Visitor {
	new(component: Widget, params?: Record<string, unknown>): void
}

class Widget extends EventEmitter{
	constructor(visitors: [Visitor: Visitor, params: Record<string, unknown>][]) {
		super();

		for (const [Visitor, params] of visitors) {
			new Visitor(this, params)
		}
	}

	render() {

	}

	mount() {

	}
}

class Analitycs {
	constructor(component: Widget, events: Record<string, Function>) {
		for (const [key, handler] of Object.entries(events)) {
			component.on(key, handler)
		}
	}
}

class Button extends Widget {

}

class Form extends Widget {

}

const btn = new Button([[Analitycs, {click: () => console.log('send ')}]])

btn.on('sfa', () => {})
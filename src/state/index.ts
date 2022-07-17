interface LogItem {
	description: Record<string, unknown>;
	undo: () => LogItem;
}

@singleton
class State {
	protected log: LogItem[] = []

	push(item: LogItem): number {
		this.log.push({
			description: item.description,
			undo: () => {
				const i = item.undo()
				this.log.push(i)
				return i
			}
		})

		return this.log.length
	}
}

const instanceCache = new Map()

function singleton(Constructor: {new(...args: any[]): any}) {
	if (instanceCache.has(Constructor)) {
		return instanceCache.get(Constructor)
	}

	const instance = new Constructor()
	instanceCache.set(Constructor, instance)

	return instance
}

abstract class Widget {
	readonly Root!: Element
	protected root: this['Root']
	state: State = new State()

	constructor(node: Element) {
		this.root = node
	}
}

const registeredWidgets = new Map()

abstract class AbstractTextWidget extends Widget {
	override readonly Root!: HTMLInputElement | HTMLTextAreaElement

	constructor(node: HTMLInputElement | HTMLTextAreaElement) {
		super(node);

		let value = node.value
		let currentValue = value

		node.addEventListener('input', () => {
			this.state.push({
				description: {
					value: {
						value: node.value,
						oldValue: value
					}
				},

				undo() {
					const oldValue = node.value
					node.value = currentValue

					return {
						description: {
							value: {
								value,
								oldValue,
							}
						},
						undo: this.undo()
					}
				}
			})

			value = node.value
		})
	}
}

@widget('input')
class InputWidget extends AbstractTextWidget {
	override readonly Root!: HTMLInputElement
}

@widget('textarea')
class TextareaWidget extends AbstractTextWidget {
	override readonly Root!: HTMLTextAreaElement
}

function widget(tagName): ClassDecorator {
	return (constructor) => {
		registeredWidgets.set(tagName, constructor)
	}
}

const widgetCache = new WeakMap()

function initWidget(node: Element) {
	if (widgetCache.has(node)) {
		return widgetCache.get(node)
	}

	const Widget = registeredWidgets.get(node.tagName.toLowerCase())

	if (Widget == null) {
		throw new Error('error')
	}

	const widget = new Widget(node)
	widgetCache.set(node, widget)
	return widget
}


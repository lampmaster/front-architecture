export class RequestBuilder {
	static readonly configuration: RequestInit = {}

	static method(method: string): typeof RequestBuilder {
		const { configuration } = this

		return this.extend({method})
	}

	static header(name: string, value: string): typeof RequestBuilder {
		const { configuration } = this

		const headers = new Headers(configuration.headers ?? [])
		headers.append(name, value)

		return this.extend({headers})
	}

	protected static extend(configuration: RequestInit): typeof RequestBuilder {
		const baseConfiguration = this.configuration

		return class RequestBuilder extends this {
			static override readonly configuration: RequestInit = {
				...baseConfiguration,
				...configuration
			}
		}
	}

	static fetch(url: string, params?: RequestInit): Promise<Response> {
		return fetch(url, {...this.configuration, ...params})
	}
}

RequestBuilder
	.method('POST')
	.header('Content-Type', 'application/json')
	.header('X-Custom-Header', 'ProcessThisImmediately')
	.fetch('www.example.com')



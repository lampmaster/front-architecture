interface LogEngine {
	filter(namespace: string, params: Record<string, unknown>): boolean;
	log(namespace: string, params: Record<string, unknown>): void;
}

class Logger {
	engines: LogEngine[] = [];

	constructor(engines: LogEngine[]) {
		this.engines = engines
	}

	addEngine(logEngine: LogEngine) {
		this.engines.push(logEngine)
	}

	log(namespace: string, params: Record<string, unknown> = {}) {
		this.engines.forEach((engine) => {
			if (engine.filter(namespace, params)) {
				engine.log(namespace, params)
			}
		})
	}
}

const logger = new Logger([
	{
		filter: (namespace) => namespace.startsWith('warn'),
		log: console.log
	},
	// {
	// 	filter: (namespace) => namespace.startsWith('error'),
	// 	log: sendToSentry
	// }
	// ...
])

logger.log('warn:msg')
logger.log('error:msg')
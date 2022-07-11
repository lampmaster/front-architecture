
class Widget {
	root: Root

	constructor(root: Root) {
		this.root = root
	}

	render() {

	}

	mount() {

	}
}

abstract class ILogin {
	isLogin(): boolean {

	}
	ligin(): Promise<void> {

	}

	static login(): Promise<void>
}

abstract class IAccess {
	isLogin(): boolean
}

class Root extends Widget implements ILogin {
	isLogin(): boolean {
		//
	}
}

class Button extends Widget {
	mounted() {
		if (this.root.isLogin()) {
			//
		}
	}
}




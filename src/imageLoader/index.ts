interface ImageLoaderOptions {
	src: string;
	alt?: string;
	loadingSrc?: string;
	errorSrc?: string;
}

abstract class ImageLoader {
	node: Element
	params: ImageLoaderOptions

	constructor(node: Element, opts: ImageLoaderOptions) {
		this.params = opts
		this.node = node
	}

	abstract render(): void
}

class IMGLoader extends ImageLoader {
	render(): void {

	}
}

class CSSLoader extends ImageLoader {
	render(): void {

	}
}
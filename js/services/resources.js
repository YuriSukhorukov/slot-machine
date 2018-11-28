export default class Resources {
	constructor (patch) {
		this._patch = patch;
		this._sprites = [];
	}

	load () {
		this._sprites = [1,2,3];
		return new Promise((resolve, reject) => {
			if(this._sprites.length > 0)
				resolve();
			else
				reject();
		})
	}

	get sprites() {
		return this._sprites;
	}
}
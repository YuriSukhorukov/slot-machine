export default class Resources {
	constructor (patch) {
		this._patch = patch;
	}

	load () {
		console.log(`loading from ${this._patch}`);
	}
}
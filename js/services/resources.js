export default class Resources {
	constructor (patch) {
		this._patch = patch;
		this._storage = [];
	}

	load () {
		console.log(`loading from ${this._patch}`);
		this._storage = [1,2,3];
	}

	get storage() {
		return this._storage;
	}
}
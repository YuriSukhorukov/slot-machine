export default class Symbol {
	constructor (type, width, height, sprite) {
		this._type = type;
		this._width = width;
		this._height = height;
		this._sprite = sprite;
	}

	get type(){
		return this._type;
	}
}
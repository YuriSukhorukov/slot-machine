export default class Symbol {
	constructor (type, view) {
		this._x = 0;
		this._y = 0;
		this.type = type;
		this.view = view;
	}

	get x(){
		return this._x;
	}
	get y(){
		return this._y;
	}
	set x(v){
		this._x = v;
		this.updatePosition();
	}
	set y(v){
		this._y = v;
		this.updatePosition();
	}

	updatePosition(){
		this.view.position.set(this._x, this._y)
	}
}
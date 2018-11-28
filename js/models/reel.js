export default class Reel {
	constructor(symbols){
		this._x = 0;
		this._y = 0;
		this.symbols = symbols;
		this.container = new PIXI.Container();
		this.symbols.forEach((symbol, index)=>{
			symbol.x = 0;
			symbol.y = 100 * index;
			this.container.addChild(symbol.view);
		})
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
		this.container.x = this._x;
		this.container.y = this._y;
	}
}
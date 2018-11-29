export default class Reel {
	constructor(symbols){
		this._x = 0;
		this._y = 0;
		this.symbols = symbols;
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
		for(let i = 0; i < this.symbols.length; i++){
			this.symbols[i].x = this.x;
			this.symbols[i].y = i * 100 + this.y;
		}
	}
	twist(){
		for(let i = 0; i < this.symbols.length; i++){
			this.symbols[i].x = this.x;
			this.symbols[i].y += 10;
		}

		for(let i = 0; i < this.symbols.length; i++){
			if(this.symbols[i].y > 700){
				this.symbols[i].y = -100;
			}
		}
	}
}
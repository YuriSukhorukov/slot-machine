export default class Reel {
	constructor(symbols){
		this.symbols = symbols;
		this.speed = 0;
		this.MAX_SPEED = 12;
		this.MIN_SPEED = 7;
		
		this._x = 0;
		this._y = 0;
		this._events = {onStopTwist: {}}
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
			this.symbols[i].y = i * 100;
		}
	}
	positionAlign(){
		this.symbols.sort((s1, s2)=>{
			return s1.y < s2.y ? -1 : 1;
		})
		for(let i = 0; i < this.symbols.length; i++){
			this.symbols[i].y = 100 * i;
		}
	}
	lerp(start_x, end_x, percent){
	     return (start_x + percent*(end_x - start_x));
	}
	start(){
		this.speed = Math.random() * (this.MAX_SPEED - this.MIN_SPEED) + this.MIN_SPEED;
	}
	stop(){
		this.positionAlign();
		this.dispatchEvent('onStopTwist');
	}
	twist(){
		for(let i = 0; i < this.symbols.length; i++){
			if(this.symbols[i].y >= 800){
				this.symbols[i].y = -100;
			}
		}
		for(let i = 0; i < this.symbols.length; i++){
			this.symbols[i].y += this.speed;
		}
	}

	addEventListener(event, eventHandler){
		if(this._events[event] !== undefined)
			this._events[event] = eventHandler; 
		else
			console.warn(`Event '${event}' not defined.`);
	}

	dispatchEvent(event){
		if(this._events[event] !== undefined)
			this._events[event]();
		else
			console.warn(`Event handler for '${event}' not defined.`);
	}
}
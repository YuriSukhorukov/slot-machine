export default class Reel {
	constructor(symbols){
		this.symbols = symbols;
		this.speed = 0;
		this.stopDeelay = 0;
		
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
	start(speed, stopDeelay){
		this.speed = speed;
		this.stopDeelay = stopDeelay;
	}
	stop(){
		return new Promise((resolve, reject)=>{
			setTimeout(()=>{
				this.speed = 0;
				this.positionAlign();
				this.dispatchEvent('onStopTwist');
				resolve();
			}, this.stopDeelay)
		})
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

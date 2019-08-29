export default class Reel {
	constructor(symbols){
		this.symbols = symbols;
		this.speed = 0;
		this.stopDeelay = 0;
		this.deepBounce = 0;
		
		this.stoped = false;

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
			this.symbols[i].alignedPosY = 100 * i;
		}
	}
	positionSetAlign(){
		for(let i = 0; i < this.symbols.length; i++){
			this.symbols[i].y = this.symbols[i].alignedPosY-35;
		}
	}
	start(speed, stopDeelay, deepBounce){
		this.speed = speed;
		this.stopDeelay = stopDeelay;
		this.deepBounce = deepBounce;
		this.stoped = false;
	}
	stop(){
		this.stoped = true;
		return new Promise((resolve, reject)=>{
			setTimeout(()=>{
				this.positionAlign();
				this.positionSetAlign();
				let bounceAnimationId = setInterval(()=>{
					for(let i = 0; i < this.symbols.length; i++){
						if (this.symbols[i].y > this.symbols[i].alignedPosY) {
							this.speed *= -0.75;
							break;
						} else if (this.symbols[i].y < this.symbols[i].alignedPosY) {
							this.speed *= -0.75;
							break;
						}
					}
					if (Math.abs(this.speed) < 0.5) {
						for(let i = 0; i < this.symbols.length; i++){
							this.symbols[i].y = this.symbols[i].alignedPosY;
						}
						this.speed = 0;
						clearInterval(bounceAnimationId);
						resolve();
						this.dispatchEvent('onStopTwist');
					}
				}, 80)
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

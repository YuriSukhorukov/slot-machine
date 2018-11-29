export default class Slot {
	constructor(reels){
		this.REEL_SPEED = 12;
		
		this.reels = reels;

		this._reelsStopedAmount = 0;
		this._events = {onStopTwist:{}};

		for(let i = 0; i < this.reels.length; i++){
			this.reels[i].addEventListener('onStopTwist', ()=>{
				this.onReelStopTwistEventHandler();
			});
			this.reels[i].speed = i / this.REEL_SPEED + i + this.REEL_SPEED;
		}
	}

	twist(){
		for(let i = 0; i < this.reels.length; i++){
			this.reels[i].twist();
		}
	}
	stop(){
		for(let i = 0; i < this.reels.length; i++){
			this.reels[i].stop();
		}
	}

	onReelStopTwistEventHandler(){
		this._reelsStopedAmount += 1;
		if(this._reelsStopedAmount == this.reels.length){
			this.dispatchEvent('onStopTwist');
			this._reelsStopedAmount = 0;
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
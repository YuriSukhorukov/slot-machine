export default class Slot {
	constructor(reels){
		this.MIN_SPEED = 8;
		this.MAX_SPEED = 8;
		this.SPIN_TIME = 3000;
		this.REEL_STOP_DEELAY = 500;

		this.reels = reels;

		this._spinLoopID = '';
		this._reelsStopedAmount = 0;

		for(let i = 0; i < this.reels.length; i++){
			this.reels[i].addEventListener('onStopTwist', ()=>{
				this.onReelStopTwistEventHandler();
			});
		}

		this.btnSpin = document.createElement("BUTTON");
		var t = document.createTextNode("SPIN");
		this.btnSpin.appendChild(t);
		document.body.appendChild(this.btnSpin);

		this.btnSpin.addEventListener('click', ()=>{
			this.spin();			
		})
	}

	spin(){
		this.btnSpin.disabled = true;

		for(let i = 0; i < this.reels.length; i++){
			var speed = this.getTwistSpeed();
			this.reels[i].start(speed, this.REEL_STOP_DEELAY);
		}
		
		this._spinLoopID = setInterval(()=>{
			this.twist();
		}, 10);

		setTimeout(()=>{
			this.stop(0);
		}, this.SPIN_TIME)
	}

	getTwistSpeed(){
		return Math.random() * (this.MAX_SPEED - this.MIN_SPEED) + this.MIN_SPEED;
	}

	twist(){
		for(let i = 0; i < this.reels.length; i++){
			this.reels[i].twist();
		}
	}
	stop(i){
		if(i < this.reels.length){
			this.reels[i].stop().then(()=>{
				this.stop(i + 1);
			});
		}else {
			clearInterval(this._spinLoopID);
			this.btnSpin.disabled = false;
		}
	}

	onReelStopTwistEventHandler(){
		this._reelsStopedAmount += 1;
		if(this._reelsStopedAmount == this.reels.length){
			clearInterval(this._spinLoopID);
			this.btnSpin.disabled = false;
			this._reelsStopedAmount = 0;
		}
	}
}

export default class Slot {
	constructor(reels){
		this.reels = reels;

		this._spinLoopID = '';
		this._reelsStopedAmount = 0;
		this._events = {onStopTwist:{}};

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
			this.reels[i].start();
		}
		
		this._spinLoopID = setInterval(()=>{
			this.twist();
		}, 10);

		setTimeout(()=>{
			this.stop();
			this.btnSpin.disabled = false;
			clearInterval(this._spinLoopID);
		}, 2000)
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
			clearInterval(this._spinLoopID);
			this.btnSpin.disabled = false;
			this._reelsStopedAmount = 0;
		}
	}
}
export default class Slot {
	constructor(reels, panel){
		this.MIN_SPEED = 8;
		this.MAX_SPEED = 8;
		this.SPIN_TIME = 3000;
		this.REEL_STOP_DEELAY = 100;
		this.DEEP_BOUNCE = 50;

		this.reels = reels;
		this.panel = panel;

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
			this.reels[i].start(speed, this.REEL_STOP_DEELAY, this.DEEP_BOUNCE);
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
		} else if (this.reels.every(reel => {reel.stoped})) {
			clearInterval(this._spinLoopID);
			this.btnSpin.disabled = false;
		}
	}

	onReelStopTwistEventHandler(){
		this._reelsStopedAmount += 1;
		if(this._reelsStopedAmount == this.reels.length){
			clearInterval(this._spinLoopID);
			let profit = this.randomInteger(100, 1000);
			let max_profit = this.panel.profit + profit;
			let interationsCount = this.panel.totalTime / this.panel.speedProfit;
			let step = max_profit / interationsCount;
			step = Math.round(step);
			let addProfitTimeoutID = setInterval(()=>{
				console.log(`${this.panel.profit}: ${max_profit}`);
				if (max_profit == this.panel.profit) {
					clearInterval(addProfitTimeoutID);
					this.btnSpin.disabled = false;
					this._reelsStopedAmount = 0;
				} else {
					if (this.panel.profit + step <= max_profit) {
						this.panel.profit += step;
					} else {
						this.panel.profit = max_profit;
					}
					this.panel.profitText.text = this.panel.profit;
				}
			}, this.panel.speedProfit);
		}
	}

	randomInteger(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  }
}

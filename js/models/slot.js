export default class Slot {
	constructor(reels){
		this.reels = reels;
		console.log(this.reels);
	}
	twist(){
		for(let i = 0; i < this.reels.length; i++){
			this.reels[i].y += 1;
			console.log(this.reels[i].symbols[1].y)
		}
	}
}
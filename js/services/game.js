import Symbol from './../models/symbol.js'
import Reel from './../models/reel.js'
import Slot from './../models/slot.js'

export default class Game {
	constructor(app){
		this.app = app;

		this.sprites;
		this.audio;
		this.slot;

		this.loopID = '';
		this.time = 0;
	}
	initResources(resources) {
		return new Promise((resolve, reject)=>{
			this.sprites = resources.sprites;
			this.audio = resources.audio;
			resolve();
		})
	}
	initObjects(){

		let reels = [];
		const REELS_AMOUNT = 5;

		for(let i = 0; i < REELS_AMOUNT; i++){

			let symbols = [];
			symbols.push(new Symbol('A', new PIXI.Sprite(this.sprites["./../assets/img/symbol_a.png"])))
			symbols.push(new Symbol('7', new PIXI.Sprite(this.sprites["./../assets/img/symbol_7.png"])))
			symbols.push(new Symbol('10', new PIXI.Sprite(this.sprites["./../assets/img/symbol_10.png"])))
			symbols.push(new Symbol('8', new PIXI.Sprite(this.sprites["./../assets/img/symbol_8.png"])))
			symbols.push(new Symbol('9', new PIXI.Sprite(this.sprites["./../assets/img/symbol_9.png"])))
			symbols.push(new Symbol('O', new PIXI.Sprite(this.sprites["./../assets/img/symbol_o.png"])))
			symbols.push(new Symbol('I', new PIXI.Sprite(this.sprites["./../assets/img/symbol_i.png"])))
			symbols.push(new Symbol('K', new PIXI.Sprite(this.sprites["./../assets/img/symbol_k.png"])))
			symbols.push(new Symbol('J', new PIXI.Sprite(this.sprites["./../assets/img/symbol_j.png"])))

			for(let i = 0; i < symbols.length; i++) {
				this.app.stage.addChild(symbols[i].view);
			}

			reels[i] = new Reel(symbols);
			reels[i].x = 100 * i;
			reels[i].y = 0;
		}

		this.slot = new Slot(reels);

		return new Promise((resolve, reject)=>{
			console.log('objects initialized', this.slot)
			resolve();
		})
	}
	start(){
		console.log('game started')
		setInterval(()=>{this.loop()}, 5);
	}
	stop(){
		clearInterval(this.loopID)
	}
	loop(){
		this.slot.twist();
	}
}
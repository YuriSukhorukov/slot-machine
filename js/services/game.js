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
			symbols.push(new Symbol('A', new PIXI.Sprite(this.sprites["./../assets/img/symbol_u.png"])))
			symbols.push(new Symbol('J', new PIXI.Sprite(this.sprites["./../assets/img/symbol_u.png"])))
			symbols.push(new Symbol('K', new PIXI.Sprite(this.sprites["./../assets/img/symbol_u.png"])))
			symbols.push(new Symbol('Q', new PIXI.Sprite(this.sprites["./../assets/img/symbol_u.png"])))
			symbols.push(new Symbol('7', new PIXI.Sprite(this.sprites["./../assets/img/symbol_u.png"])))
			symbols.push(new Symbol('8', new PIXI.Sprite(this.sprites["./../assets/img/symbol_u.png"])))
			symbols.push(new Symbol('9', new PIXI.Sprite(this.sprites["./../assets/img/symbol_u.png"])))
			symbols.push(new Symbol('10', new PIXI.Sprite(this.sprites["./../assets/img/symbol_u.png"])))

			for(let i = 0; i < symbols.length; i++) {
				this.app.stage.addChild(symbols[i].view);
			}

			reels[i] = new Reel(symbols);
			reels[i].x = 100 * i;
			console.log(reels[i].x, reels[i].y)
			this.app.stage.addChild(reels[i].container);
		}

		this.slot = new Slot(reels);

		return new Promise((resolve, reject)=>{
			console.log('objects initialized', this.slot)
			resolve();
		})
	}
	start(){
		console.log('game started')
		setInterval(()=>{this.loop()}, 25);
	}
	stop(){
		clearInterval(this.loopID)
	}
	loop(){
		this.slot.twist();
	}
}
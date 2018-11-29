import Symbol from './../models/symbol.js'
import Reel from './../models/reel.js'
import Slot from './../models/slot.js'

export default class Game {
	constructor(app){
		this.app = app;
		this.sprites;
		this.audio;
		this.slot;
		this.spinLoopID = '';
		this.time = 0;
	}
	initResources(resources) {
		return new Promise((resolve, reject)=>{
			this.sprites = resources.sprites;
			// Заглушка для примера
			this.audio = resources.audio;
			resolve();
		})
	}
	initObjects(){
		let reels = [];
		const REELS_AMOUNT = 5;

		for(let i = 0; i < REELS_AMOUNT; i++){
			let symbols = [];
			let sprites = Object.values(this.sprites);

			for(let i = 0; i < sprites.length; i++){
				let randomIndex = Math.floor(Math.random() * sprites.length)
				symbols.push(new Symbol('key', new PIXI.Sprite(sprites[randomIndex])))
			}

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
	}
}
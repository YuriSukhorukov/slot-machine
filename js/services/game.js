import Symbol from './../models/symbol.js'
import Reel from './../models/reel.js'
import Slot from './../models/slot.js'
import Panel from '../models/panel.js';

export default class Game {
	constructor(app){
		this.app = app;
		this.sprites;
		this.audio;
		this.slot;
		this.panel;
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

		this.panel = new Panel();
		this.slot = new Slot(reels, this.panel);

		this.app.stage.addChild(this.panel.view);
		this.app.stage.addChild(this.panel.profitText);
		// this.app.stage.addChild(this.panel.balanceText);

		// this.panel.setBalance(10000);
		this.panel.setProfit(1000);

		return new Promise((resolve, reject)=>{
			console.log('objects initialized', this.slot)
			resolve();
		})
	}
	start(){
		console.log('game started')
	}
}

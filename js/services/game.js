import Symbol from './../models/symbol.js'
import Reel from './../models/reel.js'
import Slot from './../models/slot.js'

export default class Game {
	constructor(app){
		this.app = app;

		this.sprites;
		this.audio;
		this.slot;
	}
	initResources(resources) {
		return new Promise((resolve, reject)=>{
			this.sprites = resources.sprites;
			this.audio = resources.audio;
			resolve();
		})
	}
	initObjects(){
		let symbols = [];
		for(let i = 0; i < this.sprites.length; i++){
			symbols[i] = new Symbol('coffee_cup', this.sprites[i]);
		}

		let reels = [];
		const REELS_AMOUNT = 3;
		for(let i = 0; i < REELS_AMOUNT; i++){
			reels[i] = new Reel(symbols);
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
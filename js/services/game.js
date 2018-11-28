import Slot from './../models/slot.js'

export default class Game {
	initResources(resources) {
		return new Promise((resolve, reject)=>{
			console.log(resources.sprites)
			console.log(resources.audio)
			console.log('game initialized')
			resolve();
		})
	}
	initObjects(){
		this._slot = new Slot();
		console.log(this._slot);

		return new Promise((resolve, reject)=>{
			resolve();
		})
	}
	start(){
		console.log('game started')
	}
}
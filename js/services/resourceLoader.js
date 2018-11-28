import Resources from './../models/resources.js'

export default class ResourceLoader {
	constructor(){
		this.resources = new Resources();
	}
	load(config){
		return new Promise((resolve, reject)=>{
			this.loadSprites(config)
			.then((_sprites) => {
				this.resources.sprites = _sprites;
				return this.loadAudio(config);
			})
			.then((_audio)=>{
				this.resources.audio = _audio;
				resolve(this.resources);
			})
		})
	}
	loadSprites(config){
		let _sprites = {};
		return new Promise((resolve, reject)=>{
			PIXI.loader.add(config.sprites).load(()=>{
				Object.keys(PIXI.loader.resources).forEach((key)=>{
					if(PIXI.loader.resources[key].texture !== undefined){
						_sprites[key] = new PIXI.Sprite(PIXI.loader.resources[key].texture);
					}
				})
				resolve(_sprites);
			});
		})
	}
	loadAudio(config){
		let _audio = [4,5,6];
		return new Promise((resolve, reject)=>{
			resolve(_audio);
		})
	}
}
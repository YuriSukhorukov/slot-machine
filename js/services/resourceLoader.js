import Resources from './../models/resources.js'

export default class ResourceLoader {
	constructor(){
		this.resources = new Resources();
	}
	load(config){
		this.resources.sprites = [1,2,3];
		this.resources.audio = [4,5,6];
		console.log(`load resources from: ${config.sprites.patch}`);
		console.log(`load resources from: ${config.audio.patch}`);
		return new Promise((resolve, reject)=>{
			resolve(this.resources);
		})
	}
}
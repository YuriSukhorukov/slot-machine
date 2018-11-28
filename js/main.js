import config from './config.js'
import ResourceLoader from './services/resourceLoader.js'
import Symbol from './models/symbol.js'



let resourceLoader = new ResourceLoader();

resourceLoader.load(config.sprites.patch).then(sprites => createSymbols(sprites)).catch(()=>{})


function createSymbols(sprites){
	let symbols = [];
	symbols.push(new Symbol('cofee', 100, 100, sprites[0]));
	console.log(symbols);
}


const app = new PIXI.Application({width: 256, height: 256});
document.body.appendChild(app.view);
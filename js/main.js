import config from './config.js'
import Game from './services/game.js'
import ResourceLoader from './services/resourceLoader.js'

const app = new PIXI.Application({width: 256, height: 256});
document.body.appendChild(app.view);

let game = new Game(app);
let resourceLoader = new ResourceLoader();

resourceLoader.load(config)
.then((resources)=>{
	console.log('resources loaded');
	return game.initResources(resources);
})
.then(()=>{
	console.log('game resources initialized');
	return game.initObjects();
})
.then(()=>{
	console.log('game objects initialized');
	game.start();
})
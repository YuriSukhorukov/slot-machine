import config from './config.js'
import Game from './services/game.js'
import ResourceLoader from './services/resourceLoader.js'

let game = new Game();
let resourceLoader = new ResourceLoader();


resourceLoader.load(config)
.then((resources)=>{
	game.initResources(resources);
})
.then(()=>{
	game.initObjects();
})
.then(()=>{
	game.start();
})


const app = new PIXI.Application({width: 256, height: 256});
document.body.appendChild(app.view);
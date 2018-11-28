import config from './config.js'
import ResourceLoader from './services/resourceLoader.js'


let sprites = []

let resourceLoader = new ResourceLoader();

resourceLoader.load(config.sprites.patch).then(spr => sprites = spr).catch(()=>{})


const app = new PIXI.Application({width: 256, height: 256});
document.body.appendChild(app.view);
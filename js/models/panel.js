export default class Panel {
	constructor () {
    this.balance = 10000;
    this.profit = 0;
    this.speedProfit = 50;
    this.stepProfit = 5;
    this.totalTime = 20000;

    this.view = new PIXI.Graphics();
    this.view.beginFill(0x66CCFF);
    this.view.lineStyle(4, 0xFF3300, 1);
    this.view.drawRect(300, 300, 500, 100);
    this.view.x = -300;
    this.view.y = 0;
    this.view.endFill();

    let profitStyle = new PIXI.TextStyle({
      fontFamily: "Arial",
      fontSize: 42,
      fill: "white",
      stroke: '#ff3300',
      strokeThickness: 4,
      dropShadow: true,
      dropShadowColor: "#000000",
      dropShadowBlur: 4,
      dropShadowAngle: Math.PI / 6,
      dropShadowDistance: 6,
      wordWrap: true, 
      wordWrapWidth: 500, 
      align: 'center'
    });

    this.profitText = new PIXI.Text("0", profitStyle);
    this.profitText.position.set(250, 350);
    this.profitText.anchor.set(0.5);
	}

	get x(){
		return this._x;
	}
	get y(){
		return this._y;
	}
	set x(v){
		this._x = v;
		this.updatePosition();
	}
	set y(v){
		this._y = v;
		this.updatePosition();
  }

  setProfit(value) {
    this.profit = value;
    this.profitText.text = this.profit;
  }
  
	lerp(end_x, percent)
	{
	  return (this.x + percent*(end_x - this.x));
  }
}
export default class Panel {
	constructor () {
    this.balance = 10000;
    this.profit = 0;

    this.view = new PIXI.Graphics();
    this.view.beginFill(0x66CCFF);
    this.view.lineStyle(4, 0xFF3300, 1);
    // rectangle.drawRect(x, y, width, height);
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

    // let balanceStyle = new PIXI.TextStyle({
    //   fontFamily: "Arial",
    //   fontSize: 28,
    //   fill: "white",
    //   stroke: '#ff3300',
    //   strokeThickness: 4,
    //   dropShadow: true,
    //   dropShadowColor: "#000000",
    //   dropShadowBlur: 4,
    //   dropShadowAngle: Math.PI / 6,
    //   dropShadowDistance: 6,
    //   wordWrap: true, 
    //   wordWrapWidth: 500, 
    //   align: 'center'
    // });

    // this.balanceText = new PIXI.Text("10000", balanceStyle);
    // this.balanceText.position.set(250, 375);
    // this.balanceText.anchor.set(0.5);
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
  
  setBalance(value) {
  //   this.balance = value;
  //   this.balanceText.text = this.balance.toString();
  }

  setProfit(value) {
    this.profit = value;
    this.profitText.text = this.profit;
  }

	updatePosition(){
		// this.view.position.set(this._x, this._y)
	}
	lerp(end_x, percent)
	{
	  return (this.x + percent*(end_x - this.x));
	}
}
const GreyColor = 0xCAC8C8;
const WhiteColor = 0xFFFFFFF;

class Cell extends Phaser.Graphics{

	constructor(game, x, y, width, height, color= 0xFFFFFFF, lineColor = 0x000000) {
		super(game, 0, 0);
		this.beginFill(color);
		this.lineStyle(2, lineColor, 1);
    this.drawRect(x, y, width, height);
    this.checked = false;
    this.realPosition = {x, y};
	  this.lineColor = lineColor;
    this.color = color;
  }

  toggle() {
    this.checked = !this.checked;
    this.draw();
  }

  draw() {
    const newColor = this.checked ? GreyColor: WhiteColor;
    this.beginFill(newColor);
    this.lineStyle(2, this.lineColor, 1);
    this.drawRect(this.realPosition.x, this.realPosition.y, this.width, this.height);
  }

  isChecked() {
    return this.checked;
  }
}

export default Cell;
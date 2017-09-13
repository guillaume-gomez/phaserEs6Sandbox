class Bar extends Phaser.Sprite {

  constructor(game, x, y, color = '#ff0000') {
    const bmd = game.add.bitmapData(100, 20);
    // draw to the canvas context like normal
    bmd.ctx.beginPath();
    bmd.ctx.rect(0, 0, 100, 20);
    bmd.ctx.fillStyle = color;
    bmd.ctx.fill();
    super(game, x, y, bmd);
    this.body.immovable = true;
  }

}

export default Bar;
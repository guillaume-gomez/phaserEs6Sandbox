class Ball extends Phaser.Sprite {

  constructor(game, x, y, color = '#0000ff') {
    const bmd = game.add.bitmapData(50, 50);
    // draw to the canvas context like normal
    bmd.ctx.beginPath();
    bmd.ctx.arc(25, 25, 12.5, 0, 2 * Math.PI);
    bmd.ctx.fillStyle = color;
    bmd.ctx.fill();
    super(game, x, y, bmd);
  }

}

export default Ball;
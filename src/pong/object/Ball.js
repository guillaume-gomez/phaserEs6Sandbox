class Ball extends Phaser.Sprite {

  constructor(game, x, y, color = '#0000ff') {
    const bmd = game.add.bitmapData(50, 50);
    // draw to the canvas context like normal
    bmd.ctx.beginPath();
    bmd.ctx.arc(25, 25, 25 - 5, 0, 2 * Math.PI, false);
    bmd.ctx.fillStyle = 'green';
    bmd.ctx.fill();
    bmd.ctx.lineWidth = 5;
    bmd.ctx.strokeStyle = '#003300';
    bmd.ctx.stroke();
    super(game, x, y, bmd);
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.bounce.set(1);
  }

}

export default Ball;
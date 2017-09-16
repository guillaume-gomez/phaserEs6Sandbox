class Ball extends Phaser.Sprite {

  constructor(game, x, y, color = '#0000ff', velX, velY) {
    const bmd = game.add.bitmapData(50, 50);
    bmd.ctx.beginPath();
    bmd.ctx.arc(25, 25, 25 - 5, 0, 2 * Math.PI, false);
    bmd.ctx.fillStyle = 'green';
    bmd.ctx.fill();
    bmd.ctx.lineWidth = 5;
    bmd.ctx.strokeStyle = '#003300';
    bmd.ctx.stroke();
    super(game, x, y, bmd);
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.checkWorldBounds = true;
    this.body.collideWorldBounds = true;
    this.anchor.set(0.5, 0.5);
    this.body.velocity.setTo(velX, velY);
    this.body.bounce.set(1);
  }

}

export default Ball;
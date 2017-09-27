class Switch extends Phaser.Sprite {

  constructor(game, x, y) {
    const bmd = game.add.bitmapData(25, 25);
    bmd.ctx.beginPath();
    bmd.ctx.rect(0, 0, 25, 25);
    bmd.ctx.fillStyle = 'green';
    bmd.ctx.fill();
    super(game, x, y, bmd);
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.immovable = true;
  }

}

export default Switch;
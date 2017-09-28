const width = 25;

class Switch extends Phaser.Sprite {

  constructor(game, x, y) {
    const bmd = game.add.bitmapData(width, width);
    bmd.ctx.beginPath();
    bmd.ctx.rect(0, 0, width, width);
    bmd.ctx.fillStyle = 'red';
    bmd.ctx.fill();
    super(game, x, y, bmd);
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.immovable = true;
  }

}

export default Switch;
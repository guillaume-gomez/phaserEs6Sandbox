class Bar extends Phaser.Sprite {

  constructor(game, x, y, color = "green") {
    const bmd = game.add.bitmapData(110, 30);
    bmd.ctx.beginPath();
    bmd.ctx.lineWidth="5";
    bmd.ctx.strokeStyle="#003300";
    bmd.ctx.rect(5,5,100,20);
    bmd.ctx.stroke();
    bmd.ctx.fillStyle = color;
    bmd.ctx.fill();
    super(game, x, y, bmd);
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.body.immovable = true;
  }

}

export default Bar;
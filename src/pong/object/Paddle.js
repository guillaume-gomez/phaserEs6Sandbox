const Width = 100;
const Height = 20;
const LineWidth = 5;

class Paddle extends Phaser.Sprite {

  constructor(game, x, y, color = "green") {
    const bmd = game.add.bitmapData(Width + 2 * LineWidth, Height + 2 * LineWidth);
    bmd.ctx.beginPath();
    bmd.ctx.lineWidth = LineWidth;
    bmd.ctx.strokeStyle= "#FFFFFF";
    bmd.ctx.rect(LineWidth, LineWidth, Width, Height);
    bmd.ctx.stroke();
    bmd.ctx.fillStyle = color;
    bmd.ctx.fill();
    super(game, x, y, bmd);
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.anchor.set(0.5, 0.5);
    this.body.immovable = true;
  }

}

export default Paddle;
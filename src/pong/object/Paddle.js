const Width = 100;
const Height = 20;
const LineWidth = 5;

function createBmp(game, direction, color) {
    const bmd = direction === "horizontal" ?
        game.add.bitmapData(Width + 2 * LineWidth, Height + 2 * LineWidth) :
        game.add.bitmapData(Height + 2 * LineWidth, Width + 2 * LineWidth);
    bmd.ctx.beginPath();
    bmd.ctx.lineWidth = LineWidth;
    bmd.ctx.strokeStyle= "#FFFFFF";
    if (direction === "horizontal") {
        bmd.ctx.rect(LineWidth, LineWidth, Width, Height);
    } else {
        bmd.ctx.rect(LineWidth, LineWidth, Height, Width);
    }
    bmd.ctx.stroke();
    bmd.ctx.fillStyle = color;
    bmd.ctx.fill();
    return bmd;
}

class Paddle extends Phaser.Sprite {

  constructor(game, x, y, orientation = "horizontal", color = "green") {
    const bmd = createBmp(game, orientation, color);
    super(game, x, y, bmd);
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.anchor.set(0.5, 0.5);
    this.body.immovable = true;
  }
}

export default Paddle;
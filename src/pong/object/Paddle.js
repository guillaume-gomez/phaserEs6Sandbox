import { WidthPaddle, HeightPaddle } from "../constants";
const LineWidthPaddle = 5;

function createBmp(game, direction, color) {
    const bmd = direction === "horizontal" ?
        game.add.bitmapData(WidthPaddle + 2 * LineWidthPaddle, HeightPaddle + 2 * LineWidthPaddle) :
        game.add.bitmapData(HeightPaddle + 2 * LineWidthPaddle, WidthPaddle + 2 * LineWidthPaddle);
    bmd.ctx.beginPath();
    bmd.ctx.lineWidth = LineWidthPaddle;
    bmd.ctx.strokeStyle= "#FFFFFF";
    if (direction === "horizontal") {
        bmd.ctx.rect(LineWidthPaddle, LineWidthPaddle, WidthPaddle, HeightPaddle);
    } else {
        bmd.ctx.rect(LineWidthPaddle, LineWidthPaddle, HeightPaddle, WidthPaddle);
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
import { WidthPaddle, HeightPaddle } from "../constants";
const LineWidthPaddle = 5;

function createBmp(game, direction, color) {
    const bmd = direction === "horizontal" ?
        game.add.bitmapData(WidthPaddle, HeightPaddle) :
        game.add.bitmapData(HeightPaddle, WidthPaddle);
    bmd.ctx.beginPath();
    bmd.ctx.lineWidth = LineWidthPaddle;
    bmd.ctx.strokeStyle= "#FFFFFF";
    if (direction === "horizontal") {
        bmd.ctx.rect(LineWidthPaddle / 2, LineWidthPaddle / 2, WidthPaddle - LineWidthPaddle, HeightPaddle - LineWidthPaddle);
    } else {
        bmd.ctx.rect(LineWidthPaddle / 2, LineWidthPaddle / 2, HeightPaddle - LineWidthPaddle, WidthPaddle - LineWidthPaddle);
    }
    bmd.ctx.stroke();
    bmd.ctx.fillStyle = color;
    bmd.ctx.fill();
    return bmd;
}

class Paddle extends Phaser.Sprite {

  constructor(game, x, y, orientation = "horizontal", color = "#E0E0E0") {
    const bmd = createBmp(game, orientation, color);
    super(game, x, y, bmd);
    game.physics.enable(this, Phaser.Physics.ARCADE);
    this.anchor.set(0.5, 0.5);
    this.body.immovable = true;
  }
}

export default Paddle;
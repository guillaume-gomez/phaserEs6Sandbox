import {WallSize, Color} from './constants';

class Block extends Phaser.Sprite {

  constructor(game, x,y, name = "Block", color = Color, width = WallSize, height = WallSize) {
    let bmd = game.add.bitmapData(width, height);
    // draw to the canvas context like normal
    bmd.ctx.beginPath();
    bmd.ctx.rect(0, 0, width, height);
    bmd.ctx.fillStyle = color;
    bmd.ctx.fill();

    super(game,x,y, bmd);
    this.name = name;
    game.physics.arcade.enable(this);
    this.body.immovable = true;
  }
}

export default Block;
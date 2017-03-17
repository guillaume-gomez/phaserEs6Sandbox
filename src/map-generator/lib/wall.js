import {WallSize, WallColor} from './constants';

class Wall extends Phaser.Sprite {

  constructor(game, x,y, name = "Wall") {
    let bmd = game.add.bitmapData(WallSize,WallSize);
    // draw to the canvas context like normal
    bmd.ctx.beginPath();
    bmd.ctx.rect(0, 0, WallSize, WallSize);
    bmd.ctx.fillStyle = WallColor;
    bmd.ctx.fill();

    super(game,x,y, bmd);
    this.name = name;
    game.physics.arcade.enable(this);
    this.body.immovable = true;
  }
}

export default Wall;
const Color = "473B3B";

class Room extends Phaser.Sprite {

  constructor(game, x,y, width, height) {
    let bmd = game.add.bitmapData(width,height);
    // draw to the canvas context like normal
    bmd.ctx.beginPath();
    bmd.ctx.rect(0,0,width,height);
    bmd.ctx.fillStyle = Color;
    bmd.ctx.fill();

    super(game,x,y, bmd);
  }

}

export default Room;
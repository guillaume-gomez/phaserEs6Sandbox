const Color ='#ff00ff';

class Room extends Phaser.Sprite {

  constructor(game, width, height) {
    let bmd = game.add.bitmapData(width,height);
    // draw to the canvas context like normal
    bmd.ctx.beginPath();
    bmd.ctx.rect(0,0,width,height);
    bmd.ctx.fillStyle = '#ff0000';
    bmd.ctx.fill();

    super(game,width,height, bmd);
  }

}

export default Room;
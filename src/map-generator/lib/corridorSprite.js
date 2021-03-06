import {Color} from "./constants.js";

class CorridorSprite extends Phaser.Sprite {

  constructor(game, x,y, width, height, color = Color) {
    let bmd = game.add.bitmapData(width,height);
    // draw to the canvas context like normal
    bmd.ctx.beginPath();
    bmd.ctx.rect(0,0,width,height);
    bmd.ctx.fillStyle = color;
    bmd.ctx.fill();

    super(game,x,y, bmd);
    this.center = { x: x + (width/2), y: y+ (height/2)};
    //add constant
    this.name = "CorridorSprite";
  }

  overlapRoom(room) {
      if (this.x + this.width < room.x) return false; // a is left of b
      if (this.x > room.x + room.width) return false; // a is right of b
      if (this.y + this.height < room.y) return false; // a is above b
      if (this.y > room.y + room.height) return false; // a is below b
      return true; // boxes overlap
  }
}

export default CorridorSprite;
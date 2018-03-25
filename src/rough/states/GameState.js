class GameState extends Phaser.State {

  create() {
    /*rc.rectangle(140, 10, 100, 100, {
      fill: 'rgba(255,0,0,0.2)',
      fillStyle: 'solid',
      roughness: 2
    });
    rc.rectangle(10, 130, 100, 100, {
      fill: 'red',
      stroke: 'blue',
      hachureAngle: 60,
      hachureGap: 10,
      fillWeight: 5,
      strokeWidth: 5
    });*/
    // create a new bitmap data object
    var bmd = this.game.add.bitmapData(128,128);
    // draw to the canvas context like normal
    bmd.ctx.beginPath();
    bmd.ctx.rect(0,0,128,128);
    bmd.ctx.fillStyle = '#ff0000';
    bmd.ctx.fill();

    // use the bitmap data as the texture for the sprite
    var sprite = this.game.add.sprite(200, 200, bmd);
    const rc = rough.canvas(this.game.canvas, bmd.context);
    rc.rectangle(10, 10, 50, 50);
  }

  preload() {
    this.game.canvas.id = 'canvas';
  }

  update() {
  }
}

export default GameState;

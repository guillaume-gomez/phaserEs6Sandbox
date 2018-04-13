class RoughSpriteGenerator
{
  constructor(game) {
    this.game = game;
  }

  getRectangle(bmd, width, height, config) {
    let rc = rough.canvas(bmd.canvas);
    rc.rectangle(0, 0, width, height, config);
  }

  getCircle(bmd, radius, config) {
    let rc = rough.canvas(bmd.canvas);
    rc.circle(radius/2, radius/2, radius, config);
  }

  getLine(bmd, dist, config) {
    this.getRectangle(bmd, dist, 2, config);
  }

  getCircleSprite(x, y, radius, config = {}) {
    const defaultConfig = {
      fill: "rgb(10,150,10)",
      fillWeight: 5 // thicker lines for hachure
    };
    const configs = Object.assign({}, defaultConfig, config);
    const realRadius = radius + (config.fillWeight|| 0);

    let bmd = this.game.add.bitmapData(realRadius, realRadius);
    this.getCircle(bmd, radius, configs);
    return new Phaser.Sprite(this.game, x, y, bmd);
  }

  getRectangleSprite(x, y, width, height, config = {}) {
    let bmd = this.game.add.bitmapData(width, height);
    const defaultConfig = {
        fill: 'orange',
        stroke: 'black',
        hachureAngle: 60,
        hachureGap: 10,
        fillWeight: 5,
        strokeWidth: 5
      };
    const configs = Object.assign({}, defaultConfig, config);
    this.getRectangle(bmd, width, height, configs);
    return new Phaser.Sprite(this.game, x, y, bmd);
  }

  getLineSprite(x, y, x1, y1, x2, y2, config = {}) {
    const dist = Math.sqrt( ((x2 - x1) * (x2 - x1)) + ((y2 - y1) * (y2 - y1)) );
    let bmd = this.game.add.bitmapData(dist, 2);
    this.getLine(bmd, dist, config);
    const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
    let sprite = new Phaser.Sprite(this.game, x, y, bmd);
    sprite.angle =- angle;
    return sprite;
  }
}
export default RoughSpriteGenerator;
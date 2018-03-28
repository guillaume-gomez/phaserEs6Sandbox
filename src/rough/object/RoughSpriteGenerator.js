class RoughSpriteGenerator
{
  constructor(game) {
    this.game = game;
  }

  getRectangle(bmd, width, height, config) {
    let rc = rough.canvas(bmd.canvas);
    console.log(config)
    rc.rectangle(0, 0, width, height, config);
  }

  getCircle(bmd, radius, config) {
    let rc = rough.canvas(bmd.canvas);
    rc.circle(radius/2, radius/2, radius, config);
  }

  getCircleSprite(x, y, radius, config = {}) {
    const defaultConfig = {
      fill: "rgb(10,150,10)",
      fillWeight: 3 // thicker lines for hachure
    };
    const configs = Object.assign({}, defaultConfig, config);
    const realRadius = radius + (config.fillWeight|| 0);

    let bmd = this.game.add.bitmapData(realRadius, realRadius);
    this.getCircle(bmd, radius, configs);
    return this.game.add.sprite(x, y, bmd);
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
    return this.game.add.sprite(x, y, bmd);
  }
}
export default RoughSpriteGenerator;
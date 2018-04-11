class RoughSpriteGenerator
{
  constructor(game) {
    this.game = game;
  }

  getRectangle(bmd, width, height, config, x = 0, y = 0) {
    let rc = rough.canvas(bmd.canvas);
    rc.rectangle(x, y, width, height, config);
  }

  getCircle(bmd, center, radius, config) {
    let rc = rough.canvas(bmd.canvas);
    rc.circle(center.x, center.y, radius * 2, config);
  }

  getCircleSprite(x, y, radius, config = {}) {
    const defaultConfig = {
      fill: "rgb(10,150,10)",
      fillWeight: 5 // thicker lines for hachure
    };
    const configs = Object.assign({}, defaultConfig, config);
    const realRadius = radius + (config.fillWeight|| 0);
    let bmd = this.game.add.bitmapData(realRadius * 2, realRadius * 2);
    this.getCircle(bmd, {x: realRadius, y: realRadius}, radius, configs);
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

  getAnimatedRectangle(x,y, width, height, config, nbImages) {
    let bmd = this.game.add.bitmapData(width * nbImages, height);
    const defaultConfig = {
      fill: 'orange',
      stroke: 'black',
      hachureAngle: 60,
      hachureGap: 10,
      fillWeight: 5,
      strokeWidth: 5
    };
    const configs = Object.assign({}, defaultConfig, config);
    for(let i = 0; i < nbImages; i++) {
      this.getRectangle(bmd, width, height, configs, (i * width), 0);
    }
    const key = `${x}_${y}_${width}_${height}`;
    this.game.cache.addSpriteSheet(key, null, bmd.canvas, width, height);

    let sprite = new Phaser.Sprite(this.game, x, y, key);
    const walk = sprite.animations.add('sketch');
    walk.enableUpdate = true;
    sprite.animations.play('sketch', 10, true);
    return sprite;
  }
}
export default RoughSpriteGenerator;
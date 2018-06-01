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

  getLine(bmd, dist, config) {
    this.getRectangle(bmd, dist, 2, config);
  }

  getPolygon(bmd, data, config) {
    let rc = rough.canvas(bmd.canvas);
    rc.path(data, config);
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
        fill: 'black',
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
    for(let i = 0; i < nbImages; i++) {
      this.getRectangle(bmd, width, height, config, (i * width), 0);
    }
    const key = `${x}_${y}_${width}_${height}`;
    this.game.cache.addSpriteSheet(key, null, bmd.canvas, width, height);

    let sprite = new Phaser.Sprite(this.game, x, y, key);
    const walk = sprite.animations.add('sketch');
    walk.enableUpdate = true;
    sprite.animations.play('sketch', 10, true);
    return sprite;
  }

  getLineSprite(x, y, x1, y1, x2, y2, config = {}) {
    const dist = this.lengthFromPoints(x1, y1, x2, y2);
    let bmd = this.game.add.bitmapData(dist, 2);
    this.getLine(bmd, dist, config);
    const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
    let sprite = new Phaser.Sprite(this.game, x, y, bmd);
    sprite.angle =- angle;
    return sprite;
  }

  getPolygonSprite(x,y, data, width, height, config) {
    let bmd = this.game.add.bitmapData(width, height);
    this.getPolygon(bmd, data, config);
    return new Phaser.Sprite(this.game, x, y, bmd);
  }

  lengthFromPoints(x1, y1, x2, y2) {
     return Math.sqrt( ((x2 - x1) * (x2 - x1)) + ((y2 - y1) * (y2 - y1)) );
  }

}
export default RoughSpriteGenerator;
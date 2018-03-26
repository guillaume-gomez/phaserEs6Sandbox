class RoughSpriteGenerator
{
  constructor(game, width, height) {
    this.bmd = game.add.bitmapData(width, height);
    this.rough = rough.canvas(this.bmd.canvas);
    this.bmd.ctx.beginPath();
    this.bmd.ctx.rect(0, 0, width, height);
    this.bmd.ctx.fillStyle = '#ffff00';
    this.bmd.ctx.fill();
    this.width = width;
    this.height = height;
  }

  getRectangle(x, y, width, height, config) {
    const defaultConfig = {
        fill: 'red',
        stroke: 'blue',
        hachureAngle: 60,
        hachureGap: 10,
        fillWeight: 5,
        strokeWidth: 5
      };
    this.rough.rectangle(x, y, width, height, Object.assign({}, defaultConfig, config))
  }

  getRectangleSprite(game, x, y, config) {
    this.getRectangle(x, y, this.width, this.height, config);
    return game.add.sprite(x, y, this.bmd);
  }
}
export default RoughSpriteGenerator;
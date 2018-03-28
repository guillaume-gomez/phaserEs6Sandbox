class RoughSpriteGenerator
{
  constructor(game) {
    this.game = game;
  }

  getRectangle(x, y, width, height, config) {
    const defaultConfig = {
        fill: 'orange',
        stroke: 'black',
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
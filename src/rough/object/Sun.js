class Sun extends Phaser.Group {

constructor(game, roughSpriteGenerator, x, y, radius) {
    super(game);
    const core = roughSpriteGenerator.getCircleSprite(x + radius/2 , y + radius/2, radius / 2, {fill: "rgb(255,255,102)"});
    //const line = roughSpriteGenerator.getLineSprite()
    this.add(core);
  }
}

export default Sun;
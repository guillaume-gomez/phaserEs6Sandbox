class Sun extends Phaser.Group {

constructor(game, roughSpriteGenerator, x, y, radius) {
    super(game);
    const core = roughSpriteGenerator.getCircleSprite(x + radius , y + radius, radius , {fill: "rgb(255,255,102)"});
    const line = roughSpriteGenerator.getLineSprite(x + radius / 2, y + 150, 0, 0, radius/2, 0);
    const line2 = roughSpriteGenerator.getLineSprite(x + 2 * radius, y + 150, 0, 0, radius/2, 0);
    const line3 = roughSpriteGenerator.getLineSprite(x + 150, y + radius, 0, 0, 0, radius/2);
    const line4 = roughSpriteGenerator.getLineSprite(x + 150, y + 2* radius + 50, 0, 0, 0, radius/2);
    this.add(core);
    this.add(line);
    this.add(line2);
    this.add(line3);
    this.add(line4);
  }
}

export default Sun;
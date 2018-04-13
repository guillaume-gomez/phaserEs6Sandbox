class Sun extends Phaser.Group {

constructor(game, roughSpriteGenerator, x, y, radius) {
    super(game);
    const offset = 5;
    const core = roughSpriteGenerator.getCircleSprite(x + radius , y + radius, radius , {fill: "rgb(255,255,102)"});
    const line = roughSpriteGenerator.getLineSprite(x + radius / 2, y + radius + radius/2, 0, 0, radius/2- offset, 0);
    const line2 = roughSpriteGenerator.getLineSprite(x + 2 * radius + offset, y + radius + radius/2, 0, 0, radius/2 - offset, 0);
    const line3 = roughSpriteGenerator.getLineSprite(x + radius + radius/2, y + radius - offset, 0, 0, 0, radius/2 - offset);
    const line4 = roughSpriteGenerator.getLineSprite(x + radius + radius/2, y + 2 * radius + radius/2, 0, 0, 0, radius/2 - offset);

    const line5 = roughSpriteGenerator.getLineSprite(x + 2 * radius, y + radius, 0, 0, radius/2 - offset, radius/2 - offset);
    const line6 = roughSpriteGenerator.getLineSprite(x + radius/2, y + radius/2, 0, 0, radius/2 - offset, -radius/2 + offset);

    const line7 = roughSpriteGenerator.getLineSprite(x + 2 * radius, y + 2 * radius, 0, 0, radius/2 - offset, -radius/2 + offset);
    const line8 = roughSpriteGenerator.getLineSprite(x + radius/2, y + 2 * radius + radius/2, 0, 0, radius/2 - offset, radius/2 - offset);


    this.add(core);
    this.add(line);
    this.add(line2);
    this.add(line3);
    this.add(line4);
    this.add(line5);
    this.add(line6);
    this.add(line7);
    this.add(line8);
  }
}

export default Sun;
class Sun extends Phaser.Group {

constructor(game, roughSpriteGenerator, x, y, radius) {
    super(game);
    const offset = 5;
    const offset2 = offset + 2;
    const core = roughSpriteGenerator.getCircleSprite(x + radius/2 , y + radius/2, radius/2 , {fill: "rgb(255,255,102)"});
    const line = roughSpriteGenerator.getLineSprite(x, y + radius, 0, 0, radius/2- offset, 0);
    const line2 = roughSpriteGenerator.getLineSprite(x + 1.5 * radius + offset, y + radius, 0, 0, radius/2 - offset, 0);
    const line3 = roughSpriteGenerator.getLineSprite(x + radius, y + radius/2 - offset, 0, 0, 0, radius/2 - offset);
    const line4 = roughSpriteGenerator.getLineSprite(x + radius, y + 2 * radius, 0, 0, 0, radius/2 - offset);

    const line5 = roughSpriteGenerator.getLineSprite(x + 1.5 * radius, y + radius/2, 0, 0, radius/2 - offset2, radius/2 - offset2);
    const line6 = roughSpriteGenerator.getLineSprite(x + offset2, y + offset2, 0, 0, radius/2 - offset2, -radius/2 + offset2);
    const line7 = roughSpriteGenerator.getLineSprite(x + 1.5 * radius, y + 1.5  * radius, 0, 0, radius/2 - offset2, -radius/2 + offset2);
    const line8 = roughSpriteGenerator.getLineSprite(x + offset2, y + 2 * radius - offset2, 0, 0, radius/2 - offset2 , radius/2 - offset2);


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
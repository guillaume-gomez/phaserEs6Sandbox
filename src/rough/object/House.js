class House extends Phaser.Group {

constructor(game, roughSpriteGenerator, x, y, width, height) {
    super(game);
    const roofHeight = height * 0.20;
    const basementHeight = height * 0.80;
    // basement
    const basement = roughSpriteGenerator.getRectangleSprite(x, y + roofHeight, width, basementHeight);
    //roof
    const line = roughSpriteGenerator.getLineSprite(x, y + roofHeight, 0, 0, width/2, width/2);
    const line2 = roughSpriteGenerator.getLineSprite(x + width, y + roofHeight, 0, 0, -width/2, width/2);

    // door
    const doorHeight = height * 0.3;
    const doorWidth = width * 0.15;
    const door =  roughSpriteGenerator.getRectangleSprite(x + width/2 - doorWidth/2, y + height - doorHeight, doorWidth, doorHeight);

    this.add(basement);
    this.add(door);
    this.add(line);
    this.add(line2);
//    console.log(this.height);
//    console.log(this.width);
  }
}

export default House;
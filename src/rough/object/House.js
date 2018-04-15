class House extends Phaser.Group {

constructor(game, roughSpriteGenerator, x, y, width, height) {
    super(game);
    const roofHeight = height * 0.35;
    const baseHeight = height * 0.65;

    // base
    const base = roughSpriteGenerator.getRectangleSprite(x, y + roofHeight, width, baseHeight, {fill: "pink", fillStyle:"solid"});
    //roof
    const line = roughSpriteGenerator.getLineSprite(x, y + roofHeight, 0, 0, width/2, roofHeight, {fill: "red"});
    const line2 = roughSpriteGenerator.getLineSprite(x + width, y + roofHeight, 0, 0, -width/2, roofHeight);

    // door
    const doorHeight = height * 0.3;
    const doorWidth = width * 0.15;
    const door = roughSpriteGenerator.getRectangleSprite(x + width/2 - doorWidth/2, y + height - doorHeight, doorWidth, doorHeight, { fill: "red", fillStyle: "solid"});

    // windows
    const offsetWindow = 15;
    const houseWindow = roughSpriteGenerator.getRectangleSprite(x + offsetWindow, y + height/2, 30, 25, { fill: "white", fillStyle: "solid"});
    const houseWindow2 = roughSpriteGenerator.getRectangleSprite(x + width - offsetWindow - 30, y + height/2, 30, 25, { fill: "white", fillStyle: "solid"});


    this.add(base);
    this.add(door);
    this.add(line);
    this.add(line2);
    this.add(houseWindow);
    this.add(houseWindow2);
  }
}

export default House;
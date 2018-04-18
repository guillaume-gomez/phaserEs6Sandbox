class Tree extends Phaser.Group {

constructor(game, roughSpriteGenerator, x, y, width, height) {
    super(game);
  //    <rect x="40" y="90" width="50" height="110" fill="blue" />
  // <circle cx="45" cy="50" r="30"  fill="red" />
  // <circle cx="80" cy="50" r="30" fill="red" />
  // <circle cx="90" cy="80" r="30"  fill="red" />
  // <circle cx="50" cy="80" r="30" fill="red" />
  // <circle cx="70" cy="90" r="30" fill="red" />
    // leaf
    const circle  = roughSpriteGenerator.getCircleSprite(x + 45 - 40, y + 50, 30, {fill: "pink", fillStyle:"solid"});
    const circle2 = roughSpriteGenerator.getCircleSprite(x + 80 - 40, y + 50, 30, {fill: "pink", fillStyle:"solid"});
    const circle3 = roughSpriteGenerator.getCircleSprite(x + 90 - 40, y + 80, 30, {fill: "pink", fillStyle:"solid"});
    const circle4 = roughSpriteGenerator.getCircleSprite(x + 50 - 40 , y + 80, 30, {fill: "pink", fillStyle:"solid"});
    const circle5 = roughSpriteGenerator.getCircleSprite(x + 70 - 40, y + 90, 30, {fill: "pink", fillStyle:"solid"});
    //trunk
    const trunk = roughSpriteGenerator.getRectangleSprite(x + 30, y + 90, 50, 110, {fill: "red"});

    this.add(trunk);
    this.add(circle);
    this.add(circle2);
    this.add(circle3);
    this.add(circle4);
    this.add(circle5);
  }
}

export default Tree;
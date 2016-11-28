class Box extends Phaser.Sprite {

  constructor(game, x, y, key, frame) {
    super(game, x, y, key, frame);
    game.physics.p2.enable(this);
    const boxMaterial = game.physics.p2.createMaterial('worldMaterial');
    this.body.mass = 6;
    this.body.setMaterial(boxMaterial);

  }
}

export default Box;
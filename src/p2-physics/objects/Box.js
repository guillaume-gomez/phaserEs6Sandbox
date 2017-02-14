class Box extends Phaser.Sprite {

  constructor(game, x, y, key, frame, material) {
    super(game, x, y, key, frame);
    game.physics.p2.enable(this);
    //const boxMaterial = game.physics.p2.createMaterial('worldMaterial');
    this.body.mass = 100;
    this.body.setMaterial(material);

  }
}

export default Box;
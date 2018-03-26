import RoughSpriteGenerator from 'object/RoughSpriteGenerator';

class GameState extends Phaser.State {

  create() {
    this.game.stage.backgroundColor = "#4488AA";
    const rsg = new RoughSpriteGenerator(this.game, 128, 128)
    this.sprite = rsg.getRectangleSprite(this.game, 0, 0);
  }

  preload() {
  }

  update() {
    //this.sprite.x += 0.01;
  }
}

export default GameState;

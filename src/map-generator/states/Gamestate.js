const PATH = "res/map-generator";
import Character from 'object/Character';
import Dungeon from 'object/dungeon';

class GameState extends Phaser.State {

  create() {
    this.game.stage.backgroundColor = "#4488AA";
    this.character = new Character(this.game, 50, 200, 'Character', 0);
    this.dungeon = new Dungeon(this.game);
    this.game.add.existing(this.character);
    this.game.camera.follow(this.character);
  }

  update() {
  }

  preload() {
    this.game.load.image('Character', PATH + '/character.png');
  }
}

export default GameState;

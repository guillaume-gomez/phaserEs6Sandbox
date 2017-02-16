const PATH = "res/map-generator";
import Character from 'object/Character';
import Dungeon from 'object/dungeon';

import {isInside} from "object/utils";

class GameState extends Phaser.State {

  create() {
    this.game.stage.backgroundColor = "#4488AA";
    this.game.world.setBounds(0, 0, 2000, 2000);
    this.character = new Character(this.game, 50, 200, 'Character', 0);
    this.dungeon = new Dungeon(this.game);
    const roomPosition = this.dungeon.getInitialRoom().center;
    this.character.position.setTo(roomPosition.x,roomPosition.y);
    this.game.add.existing(this.character);
    this.game.camera.follow(this.character);
  }

  update() {
    if(!this.dungeon.collide(this.character)) {
      this.character.x = this.character.oldPosition.x
      this.character.y = this.character.oldPosition.y
    }
    this.character.oldPosition = {x: this.character.position.x, y: this.character.position.y};
  }

  preload() {
    this.game.load.image('Character', PATH + '/character.png');
    this.game.load.image('Wall', PATH + '/wall.png');
  }
}

export default GameState;

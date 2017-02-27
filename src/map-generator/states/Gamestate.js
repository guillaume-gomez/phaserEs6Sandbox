const PATH = "res/map-generator";
import Character from 'object/character';
import Dungeon from 'object/dungeon';

import { WorldWitdth, WorldHeight } from "object/constants";
import {isInside} from "object/utils";

class GameState extends Phaser.State {

  create() {
    this.game.stage.backgroundColor = "#4488AA";
    this.game.world.setBounds(0, 0, WorldWitdth, WorldHeight);
    this.character = new Character(this.game, 50, 200, 'Character', 0);
    this.dungeon = new Dungeon(this.game);
    const roomPosition = this.dungeon.getInitialRoom().borders().center;
    this.character.position.setTo(roomPosition.x,roomPosition.y);
    this.game.add.existing(this.character);
    this.game.camera.follow(this.character);
  }

  update() {
    this.game.physics.arcade.collide(this.character, this.dungeon.walls());
  }

  preload() {
    this.game.load.image('Character', PATH + '/character.png');
    this.game.load.image('Wall', PATH + '/wall.png');
  }
}

export default GameState;

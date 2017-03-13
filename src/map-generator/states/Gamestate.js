const PATH = "res/map-generator";
import Hero from 'object/character';
import Dungeon from 'object/dungeon';
import Room from 'object/room';
import RoomWithCarpet from 'object/roomWithCarpet';
import RoomWithColoredCorners from "object/roomWithColoredCorners";

import { WorldWitdth, WorldHeight } from "object/constants";
import { Character, Wall, Carpet, Corner } from "object/keyUtils";
import {isInside} from "object/utils";

class GameState extends Phaser.State {

  create() {
    this.game.stage.backgroundColor = "#4488AA";
    this.game.world.setBounds(0, 0, WorldWitdth, WorldHeight);
    this.character = new Hero(this.game, 50, 200, Character, 0);
    this.dungeon = new Dungeon(this.game, this.game.world, [Room, RoomWithCarpet, RoomWithColoredCorners]);
    const roomPosition = this.dungeon.getInitialRoom().borders().center;
    this.character.position.setTo(roomPosition.x,roomPosition.y);
    this.game.add.existing(this.character);
    this.game.camera.follow(this.character);
  }

  update() {
    this.game.physics.arcade.collide(this.character, this.dungeon.walls());
  }

  preload() {
    this.game.load.image(Character, PATH + '/character.png');
    this.game.load.image(Wall, PATH + '/wall.png');
    this.game.load.image(Carpet, PATH + '/carpet.png');
    this.game.load.image(Corner, PATH + '/corner.png');
  }
}

export default GameState;

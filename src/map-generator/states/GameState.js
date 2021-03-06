const PATH = "res/map-generator";
import Hero from 'object/character';
import Maze from 'lib/maze';
import Room from 'lib/room';
import RoomWithCarpet from 'object/roomWithCarpet';
import RoomWithColoredCorners from "object/roomWithColoredCorners";

import { WorldWitdth, WorldHeight } from "constants/constants";
import { Character, Carpet, Corner } from "constants/keyUtils";

class GameState extends Phaser.State {

  constructor() {
    super();
    this.useJsonData = false;
    this.JSONData = null;
    this.nbRooms = null;
  }

  init(data) {
    if (data !== undefined) {
      if(data.JSONData) {
        this.useJsonData = true;
        this.JSONData = JSONData;
      }
      if(data.nbRooms) {
        this.nbRooms = data.nbRooms;
      }
    }
  }

  create() {
    this.game.time.advancedTiming = true;
    this.game.stage.backgroundColor = "#4488AA";
    this.game.world.setBounds(0, 0, WorldWitdth, WorldHeight);
    this.character = new Hero(this.game, 50, 200, Character, 0);
    this.maze = new Maze(this.game, this.game.world, WorldWitdth, WorldHeight, this.nbRooms, [Room, RoomWithCarpet, RoomWithColoredCorners]);
    this.maze.generate(game, this.JSONData);
    const roomPosition = this.maze.getInitialRoom().borders().center;
    this.character.position.setTo(roomPosition.x,roomPosition.y);
    this.game.add.existing(this.character);
    this.game.camera.follow(this.character);

    this.game.mazeCreated.dispatch();
  }

  update() {
    this.game.physics.arcade.collide(this.character, this.maze.walls());
  }

  preload() {
    this.game.load.image(Character, PATH + '/character.png');
    this.game.load.image(Carpet, PATH + '/carpet.png');
    this.game.load.image(Corner, PATH + '/corner.png');
  }

  render() {
    this.game.debug.text(this.game.time.fps, 2, 14, "#00ff00");
  }
}

export default GameState;

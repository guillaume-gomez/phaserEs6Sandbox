import Room from './room';
import Corridor from './corridor';
import {isInside, modGrid} from "./utils";
import {WallSize} from './constants';

const CorridorHeight = 64 - WallSize;
const CorridorWidth = 64 - WallSize;
const MaxRoom = 10;
const MinRoomSize = 2 * WallSize * 2;
const MaxRoomSize = 6 * WallSize * 2;

const MapWidth = 3000;
const MapHeight = 1000;

class Dungeon extends Phaser.Group {

  constructor(game, parent, name, addToStage, enableBody, physicsBodyType) {
    super(game, parent, name, false, true, Phaser.Physics.ARCADE);
    for(let i = 0; i < MaxRoom; i++) {
      const width = modGrid(WallSize, MinRoomSize + Math.random() * (MaxRoomSize - MinRoomSize + 1));
      const height = modGrid(WallSize, MinRoomSize + Math.random() * (MaxRoomSize - MinRoomSize + 1));
      const x = modGrid(WallSize, Math.random() * (MapWidth - width - 1) + 1);
      const y = modGrid(WallSize, Math.random() * (MapHeight - height - 1) + 1);

      let newRoom = new Room(game, game.world, x, y, width, height);
      let failed = false;
      this.children.some(child => {
         failed = newRoom.overlapRoom(child);
         if(failed) {
          //exit le loop
          return true;
         }
      });
      if (!failed) {
        // local function to carve out new room
        this.createRoom(newRoom);
        if(this.rooms().length > 1) {
          const prevRoom = this.findLastRoom(newRoom);
          const rng = Math.random() * 2;
          if(rng >= 1) {
            this.horizontalCorridor(game, prevRoom, newRoom);
            this.verticalCorridor(game, prevRoom, newRoom, false);
          } else {
            this.verticalCorridor(game, prevRoom, newRoom);
            this.horizontalCorridor(game, prevRoom, newRoom, false);
          }
        }
      }
    }
    this.removeUselessWalls(game);
  }

  rooms(newRoom = null) {
    return this.children.filter(child => {
      return child.name === "room" && child != newRoom;
    });
  }

  findLastRoom(newRoom) {
    const rooms = this.rooms(newRoom);
    return rooms[rooms.length - 1];
  }

  createRoom(room) {
    this.add(room);
  }

  horizontalCorridor(game, prevRoom, newRoom, first = true) {
    const x1 = Math.min(prevRoom.borders().center.x, newRoom.borders().center.x);
    const x2 = Math.max(prevRoom.borders().center.x, newRoom.borders().center.x);
    const y = first ? prevRoom.borders().center.y : newRoom.borders().center.y;
    const width = x2 - x1;
    const corridor = new Corridor(game, game.world, x1, y - CorridorHeight/2, width, CorridorHeight, "horizontal");
    this.add(corridor);
  }

  verticalCorridor(game, prevRoom, newRoom, first = true) {
    const y1 = Math.min(prevRoom.borders().center.y, newRoom.borders().center.y);
    const y2 = Math.max(prevRoom.borders().center.y, newRoom.borders().center.y);
    const x = first ? prevRoom.borders().center.x : newRoom.borders().center.x;
    const height = y2 - y1;
    const corridor = new Corridor(game, game.world, x - CorridorWidth/2, y1, CorridorWidth, height, "vertical");
    this.add(corridor);
  }

  getInitialRoom() {
    return this.rooms()[0];
  }

  collide(character) {
    let collide = false;
    this.children.forEach(child => {
      if(child.name === "corridor") {
        if(isInside(character, child.corridorSprite())) {
          collide = true;
        }
      } else {
        if(isInside(character, child)) {
          collide = true;
        }
      }
    });
    return collide;
  }

  walls() {
    const arrayMultipleDim = this.children.map(child => child.walls());
    return [].concat.apply([], arrayMultipleDim);
  }

  corridors() {
    return this.children.filter(child => child.name === "corridor");
  }

  corridorSprites() {
    return this.corridors().map(child => child.corridorSprite());
  }

  removeUselessWalls(game) {
    const destroyFunction = (wall, other) => {
      wall.kill();
    }

    this.walls().forEach(wall => {
      game.physics.arcade.collide(wall, this.corridorSprites(), destroyFunction);
      game.physics.arcade.collide(wall, this.rooms(), destroyFunction);
      //game.physics.arcade.collide(wall, this.walls(), destroyFunction);
    });
  }


}

export default Dungeon;
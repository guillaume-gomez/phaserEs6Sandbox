import Room from './room';
import Corridor from './corridor';
import {isInside, modGrid} from "./utils";
import {WallSize, WorldWitdth, WorldHeight } from './constants';

const CorridorHeight = 4 * WallSize;
const CorridorWidth = 4 * WallSize;
const MaxRoom = 10;
const MinRoomSize = 5 * WallSize;
const MaxRoomSize = 5 * WallSize;

class Dungeon extends Phaser.Group {

  constructor(game, parent, name, addToStage, enableBody, physicsBodyType) {
    super(game, parent, name, false, true, Phaser.Physics.ARCADE);
    for(let i = 0; i < MaxRoom; i++) {
      //FIX ME  the computation does not work well
      // TODO OFFSET WALLSIZE
      const width = modGrid(WallSize, MinRoomSize + Math.random() * (MaxRoomSize - MinRoomSize + 1));
      const height = modGrid(WallSize, MinRoomSize + Math.random() * (MaxRoomSize - MinRoomSize + 1));
      const x = modGrid(WallSize, Math.random() * (WorldWitdth - width - 1) + 1);
      const y = modGrid(WallSize, Math.random() * (WorldHeight - height - 1) + 1);

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
    this.exportDebug();
    this.removeUselessWalls(game);
  }


  import(game, rooms, corridors) {
    rooms.forEach(room => {
      const newRoom = new Room(game, game.world, room.x, room.y, room.w, room.h);
      this.createRoom(newRoom);
    });
    corridors.forEach(corridor => {
      const newCorridor = new Corridor(game, game.world, corridor.x, corridor.y, corridor.w, corridor.h, corridor.direction);
      this.add(newCorridor);
    });
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

  roomsSprites() {
    return this.rooms().map(child => child.roomSprite());
  }

  removeUselessWalls(game) {
    const destroyFunction = (wall, other) => {
      wall.kill();
    }

    this.rooms().forEach(room => {
      game.physics.arcade.collide(room.walls(), this.corridorSprites(), destroyFunction);
    });

    this.corridors().forEach(corridor => {
      game.physics.arcade.collide(corridor.walls(), this.roomsSprites(), destroyFunction);
    });

     this.corridors().forEach(corridor => {
        this.corridors().forEach(corridor2 => {
          if(corridor !== corridor2) {
            game.physics.arcade.collide(corridor.walls(), corridor2.corridorSprite(), destroyFunction);
          }
        });
     });
  }

  exportDebug() {
    const roomArray = this.rooms().map(m => {return {x: m.roomSprite().x, y: m.roomSprite().y, w: m.width, h: m.height};});
    const corridorArray = this.corridors().map(m => {return {x: m.corridorSprite().x, y: m.corridorSprite().y, w: m.width, h: m.height, direction: m.direction};});
    console.log(JSON.stringify(roomArray));
    console.log(JSON.stringify(corridorArray));
  }


}

export default Dungeon;
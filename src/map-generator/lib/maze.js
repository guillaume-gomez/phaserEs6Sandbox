import Corridor from './corridor';
import {isInside, modGrid} from "./utils";
import {WallSize, Horizontal, Vertical, RoomName, CorridorName } from './constants';

const CorridorHeight = 4 * WallSize;
const CorridorWidth = 4 * WallSize;
const MaxRoom = 10;
//each room shoud have the same size
const MinRoomSize = 6;
const MaxRoomSize = 6;

class Maze extends Phaser.Group {

  constructor(game, parent, worldWitdth, worldHeight, arrayOfRoom) {
    super(game, parent, "maze", false, true, Phaser.Physics.ARCADE);
    this.worldWitdth = worldWitdth;
    this.worldHeight = worldHeight;
    this.arrayOfRoom = arrayOfRoom;
  }

  rooms(newRoom = null) {
    return this.children.filter(child => {
      return child.name === RoomName && child != newRoom;
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
    const corridor = new Corridor(game, game.world, x1, y - CorridorHeight/2, width, CorridorHeight, Horizontal);
    this.add(corridor);
  }

  verticalCorridor(game, prevRoom, newRoom, first = true) {
    const y1 = Math.min(prevRoom.borders().center.y, newRoom.borders().center.y);
    const y2 = Math.max(prevRoom.borders().center.y, newRoom.borders().center.y);
    const x = first ? prevRoom.borders().center.x : newRoom.borders().center.x;
    const height = y2 - y1;
    const corridor = new Corridor(game, game.world, x - CorridorWidth/2, y1, CorridorWidth, height, Vertical);
    this.add(corridor);
  }

  getInitialRoom() {
    return this.rooms()[0];
  }

  collide(character) {
    let collide = false;
    this.children.forEach(child => {
      if(child.name === CorridorName) {
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
    return this.children.filter(child => child.name === CorridorName);
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

  addAdditionalSprite(game) {
    this.rooms().forEach(room => {
      room.addAdditionalSprite(game);
    });
  }

  sortDepth() {
    const compare = (a,b) => {
      if(a.name === RoomName && b.name === RoomName || a.name === CorridorName &&  b.name === CorridorName) {
        return 0;
      }
      else if (a.name === RoomName && b.name == CorridorName) {
        return 1;
      }
      else if (a.name === CorridorName && b.name == RoomName) {
        return -1;
      }
    };
    this.children.sort(compare);
  }

  exportJSON() {
    const roomArray = this.rooms().map(m => {return {x: m.roomSprite().x, y: m.roomSprite().y, w: m.originalWidth, h: m.originalHeight, klassName: m.constructor.name};});
    const corridorArray = this.corridors().map(m => {return {x: m.corridorSprite().x, y: m.corridorSprite().y, w: m.originalWidth, h: m.originalHeight, direction: m.direction};});
    return JSON.stringify({rooms: roomArray, corridors: corridorArray});
  }

  generate(game, JSONData = null) {
    const strategyFn = JSONData === null ? this.randomGeneration.bind(this) : this.importFromJson(JSONData).bind(this);
    this.generateLevel(game, strategyFn);
  }

  generateLevel(game, generationFunction) {
    generationFunction(game);
    console.log(this.exportJSON());
    this.removeUselessWalls(game);
    this.sortDepth();
    this.addAdditionalSprite(game);
  }

  randomGeneration(game) {
    for(let i = 0; i < MaxRoom; i++) {
      //FIX ME  the computation does not work well
      // TODO OFFSET WALLSIZE
      const width = Math.trunc((MinRoomSize + Math.random() * (MaxRoomSize - MinRoomSize))) * WallSize;
      const height = Math.trunc((MinRoomSize + Math.random() * (MaxRoomSize - MinRoomSize))) * WallSize;
      console.log(width, height)
      //console.log(height)
      const x = modGrid(WallSize, Math.random() * (this.worldWitdth - width - 1) + 1);
      const y = modGrid(WallSize, Math.random() * (this.worldHeight - height - 1) + 1);

      const indexChosen = Math.trunc(Math.random() * this.arrayOfRoom.length);
      let newRoom = Reflect.construct(this.arrayOfRoom[indexChosen],[game, game.world, x, y, width, height]);
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
  }

  importFromJson(JSONData) {
    return (game) => {
      var data = JSON.parse(JSONData);
      this.import( game,
                   data.rooms,
                   data.corridors
                );
    }
  }

  import(game, rooms, corridors) {
    const findTypeOfRoom = (arrayOfRoom, roomName) => {
      const roomSelected = arrayOfRoom.find(room => {
        return room.name === roomName;
      });
      if (!roomSelected) {
        console.error(`"${roomName}" is unknonwn amoung theses classes: [${arrayOfRoom.map((t) => { return t.name;})} ]`);
        return arrayOfRoom[0];
      }
      return roomSelected;
    };

    rooms.forEach(room => {
      const newRoom = Reflect.construct(findTypeOfRoom(this.arrayOfRoom, room.klassName),[game, game.world, room.x, room.y, room.w, room.h]);
      this.createRoom(newRoom);
    });
    corridors.forEach(corridor => {
      const newCorridor = new Corridor(game, game.world, corridor.x, corridor.y, corridor.w, corridor.h, corridor.direction);
      this.add(newCorridor);
    });
  }

}

export default Maze;

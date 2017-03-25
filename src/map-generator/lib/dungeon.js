import Corridor from './corridor';
import {isInside, modGrid} from "./utils";
import {WallSize, Horizontal, Vertical } from './constants';

const CorridorHeight = 4 * WallSize;
const CorridorWidth = 4 * WallSize;
const MaxRoom = 3;
//each room shoud have the same size
const MinRoomSize = 5 * WallSize;
const MaxRoomSize = 5 * WallSize;

class Dungeon extends Phaser.Group {

  constructor(game, parent, worldWitdth, worldHeight, arrayOfRoom) {
    super(game, parent, "dungeon", false, true, Phaser.Physics.ARCADE);
    this.worldWitdth = worldWitdth;
    this.worldHeight = worldHeight;
    this.arrayOfRoom = arrayOfRoom;
  }

  generate(game, JSONData = null) {
    const strategyFn = JSONData === null ? this.randomGeneration.bind(this) : this.importFromJson(JSONData).bind(this);
    this.generateLevel(game, strategyFn);
  }

  generateLevel(game, generationFunction) {
    generationFunction(game);
    this.exportDebug();
    this.removeUselessWalls(game);
    this.sortDepth();
    this.addAdditionalSprite(game);
  }

  randomGeneration(game) {
    for(let i = 0; i < MaxRoom; i++) {
      //FIX ME  the computation does not work well
      // TODO OFFSET WALLSIZE
      const width = modGrid(WallSize, MinRoomSize + Math.random() * (MaxRoomSize - MinRoomSize));
      const height = modGrid(WallSize, MinRoomSize + Math.random() * (MaxRoomSize - MinRoomSize));
      //console.log(width)
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
    rooms.forEach(room => {
      const newRoom = Reflect.construct(this.arrayOfRoom[0],[game, game.world, room.x, room.y, room.w, room.h]);
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

  addAdditionalSprite(game) {
    this.rooms().forEach(room => {
      room.addAdditionalSprite(game);
    });
  }


  sortDepth() {
    const compare = (a,b) => {
      if(a.name === "room" && b.name === "room" || a.name === "corridor" &&  b.name === "corridor") {
        return 0;
      }
      else if (a.name === "room" && b.name == "corridor") {
        return 1;
      }
      else if (a.name === "corridor" && b.name == "room") {
        return -1;
      }
    };
    this.children.sort(compare);
  }

  exportDebug() {
    const roomArray = this.rooms().map(m => {return {x: m.roomSprite().x, y: m.roomSprite().y, w: m.width, h: m.height};});
    const corridorArray = this.corridors().map(m => {return {x: m.corridorSprite().x, y: m.corridorSprite().y, w: m.width, h: m.height, direction: m.direction};});
    console.log(JSON.stringify({rooms: roomArray, corridors: corridorArray}));
  }


}

export default Dungeon;
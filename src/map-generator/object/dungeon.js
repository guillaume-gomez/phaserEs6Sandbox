import Room from './Room';
import Corridor from './Corridor';
import {isInside} from "./utils";

const CorridorHeight = 50;
const CorridorWidth = 50;
const MaxRoom = 10;
const MinRoomSize = 150;
const MaxRoomSize = 100;

const MapWidth = 1500;
const MapHeight = 800;

class Dungeon extends Phaser.Group {

  constructor(game, parent, name, addToStage, enableBody, physicsBodyType) {
    super(game, parent, name, false, true, Phaser.Physics.ARCADE);
    for(let i = 0; i < MaxRoom; i++) {
      const width = MinRoomSize + Math.random() * (MaxRoomSize - MinRoomSize + 1);
      const height = MinRoomSize + Math.random() * (MaxRoomSize - MinRoomSize + 1);
      const x = Math.random() * (MapWidth - width - 1) + 1;
      const y = Math.random() * (MapHeight - height - 1) + 1;

      let newRoom = new Room(game, x, y, width, height);
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
        const newCenter = newRoom.center;
        if(this.rooms().length > 1) {
          const prevRoom = this.findLastRoom(newRoom);
          const prevCenter = prevRoom.center;
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
    const x1 = Math.min(prevRoom.center.x, newRoom.center.x);
    const x2 = Math.max(prevRoom.center.x, newRoom.center.x);
    const y = first ? prevRoom.center.y : newRoom.center.y;
    const width = x2 - x1;
    const corridor = new Corridor(game, game.world, x1, y - CorridorHeight/2, width, CorridorHeight, "horizontal");
    this.add(corridor);
  }

  verticalCorridor(game, prevRoom, newRoom, first = true) {
    const y1 = Math.min(prevRoom.center.y, newRoom.center.y);
    const y2 = Math.max(prevRoom.center.y, newRoom.center.y);
    const x = first ? prevRoom.center.x : newRoom.center.x;
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
        if(isInside(character, child.children[0])) {
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


}

export default Dungeon;
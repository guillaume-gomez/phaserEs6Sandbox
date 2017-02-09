import Room from './Room';
import Corridor from './Corridor';

const CorridorHeight = 50;
const MaxRoom = 2;
const MinRoomSize = 100;
const MaxRoomSize = 100;

const MapWidth = 500;
const MapHeight = 500;

class Dungeon extends Phaser.Group {

  constructor(game, parent, name, addToStage, enableBody, physicsBodyType) {
    super(game, parent, name, addToStage, enableBody, physicsBodyType);

    for(let i = 0; i < MaxRoom; i++) {
      const width = MinRoomSize + Math.random() * (MaxRoomSize - MinRoomSize + 1);
      const height = MinRoomSize + Math.random() * (MaxRoomSize - MinRoomSize + 1);
      const x = Math.random() * (MapWidth - width - 1) + 1;
      const y = Math.random() * (MapHeight - height - 1) + 1;

      let newRoom = new Room(game, x, y, width, height);
      let failed = false;
      this.children.some(child => {
         failed = false//newRoom.overlapRoom(child);
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
          const prevCenter = this.findLastRoom(newRoom).center;
          const rng = Math.random() * 2;
          if(rng >= 1) {
            this.horizontalCorridor(game,prevCenter.x, newCenter.x, prevCenter.y);
            this.verticalCorridor(game, prevCenter.y, newCenter.y, newCenter.x);
          } else {
            this.verticalCorridor(game, prevCenter.y, newCenter.y, prevCenter.x);
            this.horizontalCorridor(game,prevCenter.x, newCenter.x, newCenter.y);
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

  horizontalCorridor(game, x1, x2, y) {
    const width = Math.max(Math.abs(x2-x1), 10);
    const originX = Math.min(x1,x2)
    console.log(width)
    console.log(x1)
    const corridor = new Corridor(game, originX, y, width, CorridorHeight);
    this.add(corridor);
  }

  verticalCorridor(game, y1, y2, x) {
    const height = Math.max(Math.abs(y2 - y1), 10);
    const originY = Math.min(y1,y2)
    const corridor = new Corridor(game, x, originY, CorridorHeight, height);
    this.add(corridor);
  }


}

export default Dungeon;
import Room from './Room';
import Corridor from './Corridor';

const CorridorHeight = 50;
const MaxRoom = 10;
const MinRoomSize = 50;
const MaxRoomSize = 200;

const MapWidth = 500;
const MapHeight = 800;

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
         failed = newRoom.overlapRoom(child);
         if(failed) {
          //exit le loop
          return true;
         }
      });
      if (!failed) {
        // local function to carve out new room
        this.createRoom(newRoom);
      }
    }
  }

  createRoom(room) {
    this.add(room);
  }

  horizontalCorridor(game, x1, x2, y) {
    const corridor = new Corridor(game, x1, y, (x2 - x1), CorridorHeight);
    this.add(corridor);
  }

  VerticalCorridor(game, y1, y2, x) {
    const corridor = new Corridor(game, x, y1, CorridorHeight, (y2 - y1));
    this.add(corridor);
  }


}

export default Dungeon;
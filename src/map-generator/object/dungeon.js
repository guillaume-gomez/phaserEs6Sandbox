import Room from './Room';

const MaxRoom = 10;
const MinRoomSize = 10;
const MaxRoomSize = 100;

const MapWidth = 500;
const MapHeight = 800;

class Dungeon extends Phaser.Group {

  constructor(game, parent, name, addToStage, enableBody, physicsBodyTypet) {
    super(game, parent, name, addToStage, enableBody, physicsBodyType);

    for(let i = 0; i < MaxRoom; i++) {
      const width = MinRoomSize + Math.random() * (MaxRoomSize - MinRoomSize + 1);
      const height = MinRoomSize + Math.random() * (MaxRoomSize - MinRoomSize + 1);
      const x = Math.random() * (MapWidth - width - 1) + 1;
      const y = Math.random() * (MapHeight - height - 1) + 1;

      let newRoom = new Room(x, y, width, height);
      let failed = false;
    }
  }

  createRoom(room) {

  }

}

export default Dungeon;
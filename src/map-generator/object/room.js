import {WallSize} from './constants';
import RoomSprite from './roomSprite';

const types = ["nothing", "carpet"];

class Room extends Phaser.Group {

  constructor(game, parent, x, y, width, height, typeOfRoom = "nothing") {
    super(game, parent, "room", true, true, Phaser.Physics.ARCADE);
    if(!types.includes(typeOfRoom)) {
      console.error(`In room class : ${typeOfRoom} does exist among ${types}`);
      return  null;
    }
    this.typeOfRoom = typeOfRoom;
    this.createRoom(game, x, y, width, height);
  }

  createRoom(game, x, y, width, height) {
    const room = new RoomSprite(game, x, y, width, height);
    this.add(room);
    for(let i = x; i < x + width + WallSize; i += WallSize) {
      const upWall = this.addWall(game, i, y - WallSize);
      const downWall = this.addWall(game, i, y + height);
      this.add(upWall);
      this.add(downWall);
    }
    for(let j = y; j < y + height; j += WallSize) {
      const leftWall = this.addWall(game, x - WallSize, j);
      const rightWall = this.addWall(game, x + width, j);
      this.add(leftWall);
      this.add(rightWall);
    }
  }

  addWall(game, x, y) {
    let wall = game.add.sprite(x, y, 'Wall');
    wall.name = "RoomWall";
    //wall.alpha = 0.2;
    game.physics.enable(wall, Phaser.Physics.ARCADE);
    wall.body.immovable = true;
    return wall;
  }

  addAdditionalSprite() {
    if(this.typeOfRoom === "carpet") {
      //20 is the size of carpet, must be a constant
      this.add.sprite(x + width/2 - 20, y - height /2 - 20, 'Carpet');
    }
    //for instance nothing to do for others case
  }

  borders() {
    return this.roomSprite();
  }

  walls() {
    return this.children.filter(child => child.name === "RoomWall");
  }

  roomSprite() {
    return this.children.find(child => child.name === "RoomSprite");
  }

  overlapRoom(room) {
    this.roomSprite().overlapRoom(room);
  }

}

export default Room;
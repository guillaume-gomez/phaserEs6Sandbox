import { WallSize, RoomName } from './constants';
import RoomSprite from './roomSprite';
import Wall from './wall';

const WallName = "RoomWall";
const SpriteName = "RoomSprite";

class Room extends Phaser.Group {

  constructor(game, parent, x, y, width, height) {
    super(game, parent, RoomName, true, true, Phaser.Physics.ARCADE);
    this.createRoom(game, x, y, width, height);
    this.originalX = x;
    this.originalY = y;
    //width and height less the walls size
    this.originalWidth = width;
    this.originalHeight = height;
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
    let wall = new Wall(game, x, y, WallName);
    //wall.alpha = 0.2;
    return wall;
  }

  addAdditionalSprite(game) {
    // NOTHING TO DO HERE
  }

  borders() {
    return this.roomSprite();
  }

  walls() {
    return this.children.filter(child => child.name === WallName);
  }

  roomSprite() {
    return this.children.find(child => child.name === SpriteName);
  }

  overlapRoom(room) {
    this.roomSprite().overlapRoom(room);
  }

}

export default Room;
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
    for(let i = x - WallSize; i < x + width + WallSize; i += WallSize) {
      this.addWall(game, i, y - WallSize);
      this.addWall(game, i, y + height);
    }
    for(let j = y; j < y + height; j += WallSize) {
      this.addWall(game, x - WallSize, j);
      this.addWall(game, x + width, j);
    }
  }

  addWall(game, x, y) {
    let wall = new Wall(game, x, y, WallName);
    //wall.alpha = 0.1;
    this.add(wall);
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
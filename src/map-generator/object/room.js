import RoomSprite from './RoomSprite';

class Room extends Phaser.Group {

  constructor(game, parent, x,y, width, height) {
    super(game, parent, "room", true, true, Phaser.Physics.ARCADE);
    this.createRoom(game, x, y, width, height);
  }

  createRoom(game, x, y, width, height) {
    const room = new RoomSprite(game, x, y, width, height);
    this.add(room);
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
    console.log(this.roomSprite())
    this.roomSprite().overlapRoom(room);
  }

}

export default Room;
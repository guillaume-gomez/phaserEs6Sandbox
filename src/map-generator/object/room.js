const WallSize = 16;
import RoomSprite from './roomSprite';

class Room extends Phaser.Group {

  constructor(game, parent, x, y, width, height) {
    super(game, parent, "room", true, true, Phaser.Physics.ARCADE);
    this.createRoom(game, x, y, width, height);
  }

  createRoom(game, x, y, width, height) {
    for(let i = x - WallSize; i < x + width + WallSize; i += WallSize) {
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
    const room = new RoomSprite(game, x, y, width, height);
    this.add(room);
  }

  addWall(game, x, y) {
    let wall = game.add.sprite(x, y, 'Wall');
    wall.name = "RoomWall";
    game.physics.enable(wall, Phaser.Physics.ARCADE);
    wall.body.immovable = true;
    return wall;
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
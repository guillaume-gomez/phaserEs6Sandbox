import {WallSize} from './constants';
import RoomSprite from './roomSprite';

class Room extends Phaser.Group {

  constructor(game, parent, x, y, width, height) {
    super(game, parent, "room", true, true, Phaser.Physics.ARCADE);
    this.createRoom(game, x, y, width, height);
  }

  createRoom(game, x, y, width, height) {
    const room = new RoomSprite(game, x, y, width, height);
    this.add(room);
    for(let i = x; i < x + width; i += WallSize) {
      const upWall = this.addWall(game, i, y);
      const downWall = this.addWall(game, i, y + height - WallSize);
      this.add(upWall);
      this.add(downWall);
    }
    for(let j = y; j < y + height; j += WallSize) {
      const leftWall = this.addWall(game, x, j);
      const rightWall = this.addWall(game, x + width - WallSize, j);
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
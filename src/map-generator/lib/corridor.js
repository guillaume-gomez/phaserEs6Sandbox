import CorridorSprite from './corridorSprite';
import {WallSize, Vertical, Horizontal, Directions, CorridorName} from './constants';
import Wall from "./wall";

const WallName = "ColissionWall";
const SpriteName = "CorridorSprite";

class Corridor extends Phaser.Group {

  constructor(game, parent, x, y, width, height, direction) {
    super(game, parent, CorridorName, true, true, Phaser.Physics.ARCADE);
    if(!Directions.includes(direction)) {
      console.error(`Corridor:constructor : ${direction} is a not a value possible [${Directions}]`);
    }
    this.direction = direction;
    //width and height less the walls size
    this.originalWidth = width;
    this.originalHeight = height;
    this.addWalls(game, x, y, width, height);
  }

  addWalls(game, x,y, width, height) {
    if(this.direction === Vertical) {
      this.addVerticalWall(game, x, y, width, height);
    } else {
      this.addHorizontalWall(game, x, y, width, height);
    }
  }

  addVerticalWall(game, x, y, width, height) {
    const corridorSprite = new CorridorSprite(game, x, y, width, height);
    for(let i = y; i < y + height; i += WallSize) {
      const leftWall = this.addWall(game, x - WallSize, i);
      const rightWall = this.addWall(game, x + width, i);
      this.add(leftWall);
      this.add(rightWall);
    }
    for(let j = x - WallSize; j < x + width + WallSize; j += WallSize ) {
      const topWall = this.addWall(game, j, y - WallSize);
      const bottomWall = this.addWall(game, j, y + height);
      this.add(topWall);
      this.add(bottomWall);
    }
    this.add(corridorSprite);
  }

  addHorizontalWall(game, x, y, width, height) {
    const corridorSprite = new CorridorSprite(game, x, y, width, height);
    for(let i = x; i < x + width; i += WallSize) {
      const upWall = this.addWall(game, i, y - WallSize);
      const bottomWall = this.addWall(game, i, y + height);
      this.add(upWall);
      this.add(bottomWall);
    }
    for(let j = y - WallSize; j < y + height + WallSize; j += WallSize) {
      const leftWall = this.addWall(game, x - WallSize, j);
      const rightWall = this.addWall(game, x + width, j);
      this.add(leftWall);
      this.add(rightWall);
    }
    this.add(corridorSprite);
}

  addWall(game, x, y) {
    let wall = new Wall(game, x, y, WallName);
    //wall.alpha = 0.8
    return wall;
  }

  corridorSprite() {
    const corridorSprite = this.children.find(child => child.name === SpriteName);
    if(!corridorSprite) {
      //to avoid undefined attribute
      return {x: -1, y: -1, width:-1, height:-1};
    }
    return corridorSprite;
  }

  walls() {
    return this.children.filter(child => child.name === WallName);
  }


}

export default Corridor;
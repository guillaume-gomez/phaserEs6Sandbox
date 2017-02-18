import CorridorSprite from './CorridorSprite';
const Directions = ["vertical", "horizontal"];

class Corridor extends Phaser.Group {

  constructor(game, parent, x, y, width, height, direction) {
    super(game, parent, "corridor", true, true, Phaser.Physics.ARCADE);
    if(!Directions.includes(direction)) {
      console.error(`Corridor:constructor : ${direction} is a not a value possible [${Directions}]`);
    }
    this.addWalls(game, x, y, width, height, direction);
  }

  addWalls(game, x,y, width, height, direction) {
    if(direction === "vertical") {
      this.addVerticalWall(game, x, y, width, height);
    } else {
      this.addHorizontalWall(game, x, y, width, height);
    }
  }

  addVerticalWall(game, x, y, width, height) {
    const corridorSprite = new CorridorSprite(game, x, y, width, height);
    this.add(corridorSprite);
  }

  addHorizontalWall(game, x, y, width, height) {
    const corridorSprite = new CorridorSprite(game, x, y, width, height);
    this.add(corridorSprite);
  }

  overlapRoom(room) {
      if (this.x + this.width < room.x) return false; // a is left of b
      if (this.x > room.x + room.width) return false; // a is right of b
      if (this.y + this.height < room.y) return false; // a is above b
      if (this.y > room.y + room.height) return false; // a is below b
      return true; // boxes overlap
  }
}

export default Corridor;
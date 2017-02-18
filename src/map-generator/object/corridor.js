import CorridorSprite from './CorridorSprite';
const Directions = ["vertical", "horizontal"];
const WallSize = 16;

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
     for(let i = y; i < y + height; i += WallSize) {
      const upWall = game.add.sprite(x - WallSize, i, 'Wall');
      const bottomWall = game.add.sprite(x + width, i, 'Wall');
      this.add(upWall);
      this.add(bottomWall);
    }
    this.add(corridorSprite);
  }

  addHorizontalWall(game, x, y, width, height) {
    const corridorSprite = new CorridorSprite(game, x, y, width, height);
    for(let i = x; i < x + width; i += WallSize) {
      const upWall = game.add.sprite(i, y - WallSize, 'Wall');
      const bottomWall = game.add.sprite(i, y + height, 'Wall');
      this.add(upWall);
      this.add(bottomWall);
    }
    this.add(corridorSprite);
  }


  getCorridorSprite() {
    const corridorSprite = this.children.find(child => {return child.name === "corridorSprite"; });
    if(!corridorSprite) {
      //to avoid undefined attribute
      return {x: -1, y: -1, width:-1, height:-1};
    }
    return corridorSprite;
  }
}

export default Corridor;
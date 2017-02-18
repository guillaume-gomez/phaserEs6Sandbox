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
      let leftWall = this.addWall(game, x - WallSize, i);
      let rightWall = this.addWall(game, x + width, i);
      this.add(leftWall);
      this.add(rightWall);
    }
    this.add(corridorSprite);
  }

  addHorizontalWall(game, x, y, width, height) {
    const corridorSprite = new CorridorSprite(game, x, y, width, height);
    for(let i = x; i < x + width; i += WallSize) {
      let upWall = this.addWall(game, i, y - WallSize);
      let bottomWall = this.addWall(game, i, y + height);
      this.add(upWall);
      this.add(bottomWall);
    }
    this.add(corridorSprite);
  }

  addWall(game, x, y) {
    let wall = game.add.sprite(x, y, 'Wall');
    wall.name = "colissionWall";
    game.physics.enable(wall, Phaser.Physics.ARCADE);
    wall.body.immovable = true;
    return wall;
  }

  //remove useless return in anonymous function
  getCorridorSprite() {
    const corridorSprite = this.children.find(child => {return child.name === "corridorSprite"; });
    if(!corridorSprite) {
      //to avoid undefined attribute
      return {x: -1, y: -1, width:-1, height:-1};
    }
    return corridorSprite;
  }

  walls() {
    return this.children.filter(child => {return child.name == "colissionWall"; });
  }


}

export default Corridor;
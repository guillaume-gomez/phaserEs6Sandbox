const Color = "#473B3B";
const Directions = ["vertical", "horizontal"];

class Corridor extends Phaser.Group {

  constructor() {
  }

  addWalls() {
    if(direction === "vertical") {
      
    } else {

    }
  }

  addVerticalWall() {
    
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
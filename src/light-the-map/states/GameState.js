import VisibilityPolygon from '../external/visibility_polygon_dev';

class GameState extends Phaser.State {

  constructor() {
    super();
    this.obstaclesCanvas = null;
    this.lightCanvas = null;
    this.numBoxes = 5;
    this.polygons = [];
    this.moveIndex = null;
  }

  create() {
    // listener to mouse movement
    this.moveIndex = this.game.input.addMoveCallback(this.move, this);
    // the canvas where we will show the obstaclesCanvas
    this.obstaclesCanvas = this.game.add.graphics(0,0);
    // line style of obstacle canvas
    this.obstaclesCanvas.lineStyle(4, 0xffffff, 1);
    // the canvas where we will display the scene
    this.lightCanvas = this.game.add.graphics(0,0);
    // placing some ramdom boxes
    for(let i = 0; i < this.numBoxes; i++){
      this.randomBox();
    }
    // placing the perimeter box
    this.polygons.push(
      [[- 1, - 1],
      [this.game.width + 1, -1],
      [this.game.width + 1, this.game.height + 1],
      [- 1, this.game.height + 1]]
    );
  }

  update() {
  }

  move() {
    // when the mouse is moved, we determine the new visibility polygon
    const visibility = this.createLightPolygon(this.game.input.worldX, this.game.input.worldY);
      // then we draw it
    this.lightCanvas.clear();
    this.lightCanvas.lineStyle(2, 0xff8800, 1);
    this.lightCanvas.beginFill(0xffff00);
    this.lightCanvas.moveTo(visibility[0][0], visibility[0][1]);
    for(let i = 1; i <= visibility.length; i++){
      this.lightCanvas.lineTo(visibility[i % visibility.length][0], visibility[i % visibility.length][1]);
    }
    this.lightCanvas.endFill();
  }

  randomBox() {
    do {
      // drawing boxes with random width, height and upper corner coordinates
      var width = this.game.rnd.between(50, 150);
      var height = this.game.rnd.between(50, 150);
      var startX = this.game.rnd.between(10, this.game.width - 160);
      var startY = this.game.rnd.between(10, this.game.height - 160);
    } while(this.boxesIntersect(startX, startY, width, height))
    // drawing the boxes
    this.obstaclesCanvas.drawRect(startX, startY, width, height);
    // pushing the newly created box into polygons array
    this.polygons.push(
      [[startX, startY],
      [startX + width, startY],
      [startX + width, startY + height],
      [startX, startY + height]]
    );
  }

  // this is just a function to prevent boxes to insersect or the library won't work
  boxesIntersect(x,y,w,h) {
    for(let i = 0; i < this.polygons.length; i++){
      if(x < this.polygons[i][1][0] && x + w > this.polygons[i][0][0] && y < this.polygons[i][3][1] && y + h > this.polygons[i][0][1]){
        return true;
      }
    }
    return false;
  }

  // and this is how the library generates the visibility polygon starting
  // from an array of polygons and a source point
  createLightPolygon(x,y){
    let segments = VisibilityPolygon.convertToSegments(this.polygons);
    segments = VisibilityPolygon.breakIntersections(segments);
    const position = [x, y];
    if (VisibilityPolygon.inPolygon(position, this.polygons[this.polygons.length - 1])) {
      return VisibilityPolygon.compute(position, segments);
    }
    return null;
  }

}

export default GameState;

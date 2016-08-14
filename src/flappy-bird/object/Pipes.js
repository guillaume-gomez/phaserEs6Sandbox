class Pipes {

  constructor(game) {
    this.pipes = game.add.group();
    this.pipes.enableBody = true;
    this.pipes.createMultiple(40, 'pipe');

    this.pipesEndTop = game.add.group();
    this.pipesEndTop.enableBody = true;
    this.pipesEndTop.createMultiple(4, 'pipeEndTop');

    this.pipesEndBottom = game.add.group();
    this.pipesEndBottom.enableBody = true;
    this.pipesEndBottom.createMultiple(4, 'pipeEndBottom');

    this.pipesToCheckForScore = new Array();
    this.pipesToCheckForAdd = new Array();
  }

  update(game, ground, scoreManager) {
    if(this.pipesToCheckForAdd.length != 0 && this.pipesToCheckForAdd[0].x + this.pipesToCheckForAdd[0].width / 2 < game.world.width / 2) {
      this.pipesToCheckForAdd.splice(0, 1);
      this.addGroupPipes(game, ground);
      scoreManager.updateScore();
    }
  }

  addGroupPipes(game, ground) {
    const nbPiecesOfPipes = 12;
    const hole = Math.round(Math.random() * (nbPiecesOfPipes - 7)) + 3;

    for (var i = 0; i <= nbPiecesOfPipes; i++)
      if (i > hole + 1 || i < hole - 1) {
        this.addPieceOfPipe(game.world.width, game.world.height - ground.height - i * game.world.height / nbPiecesOfPipes, i, hole);
      }
  }

  getFirstAvailable(collection) {
    let available = collection.getFirstDead();
     if(!available) {
      available = collection.children.find(item =>{
        return item.x < 0;
      });
    }
    return available;
  }

  addPieceOfPipe(x, y, i, hole, nbPipe) {
    if(i == hole + 2 || i == hole - 2) {
      const yDiff = 15;
      let pipeEnd;
      let yPipe;

      if(i == hole + 2) {
        pipeEnd = this.getFirstAvailable(this.pipesEndTop);
        yPipe = y + yDiff;
      } else {
        pipeEnd = this.getFirstAvailable(this.pipesEndBottom);
        yPipe = y - yDiff;
      }
      pipeEnd.reset(x - 4, yPipe);
      pipeEnd.body.velocity.x = -250;
      pipeEnd.outOfBoundsKill = true;
      pipeEnd.body.immovable = true;
    }

    let pipe = this.getFirstAvailable(this.pipes);
    pipe.reset(x, y);
    pipe.body.velocity.x = -250;
    pipe.outOfBoundsKill = true;
    pipe.body.immovable = true;

    if(i == 0) {
      this.pipesToCheckForScore.push(pipe);
      this.pipesToCheckForAdd.push(pipe);
    }
  }

}

export default Pipes;
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

  destroyElement() {
    this.pipes.forEach(pipe=> {
      if(pipe.inCamera) {
        pipe.alive = false;
      }
    });

    this.pipesEndBottom.forEach(pipe=> {
      if(pipe.inCamera) {
        pipe.alive = false;
      }
    });

    this.pipesEndTop.forEach(pipe=> {
      if(pipe.inCamera) {
        pipe.alive = false;
      }
    });
  }

  update(game, ground) {
    // Quand le premier tuyau se trouve au milieu du terrain
    if(this.pipesToCheckForAdd.length != 0 && this.pipesToCheckForAdd[0].x + this.pipesToCheckForAdd[0].width / 2 < game.world.width / 2) {
      this.pipesToCheckForAdd.splice(0, 1);
      // On ajoute un nouveau tuyau
      this.addGroupPipes(game, ground);
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
    // Si le trou est juste avant ou juste après, on place les pipeEnd
    if(i == hole + 2 || i == hole - 2) {
      const yDiff = 15;
      let pipeEnd;
      let yPipe;

      if(i == hole + 2) {
        // On prend le premier élément "mort" du groupe pipesEndTop
        pipeEnd = this.getFirstAvailable(this.pipesEndTop);
        yPipe = y + yDiff;
      } else {
        // On prend le premier élément "mort" du groupe pipesEndBottom
        pipeEnd = this.getFirstAvailable(this.pipesEndBottom);
        yPipe = y - yDiff;
      }
      // On change la position du bout de tuyau
      pipeEnd.reset(x - 4, yPipe);
      // On change la vitesse pour qu'il se déplace en même temps que le sol
      pipeEnd.body.velocity.x = -250;
      // On supprime ce bout de tuyau s'il sort du terrain
      pipeEnd.outOfBoundsKill = true;
      pipeEnd.body.immovable = true;
    }

    // On prend le premier élément "mort" du groupe pipes
    let pipe = this.getFirstAvailable(this.pipes);
    // On change la position du bout de tuyau
    pipe.reset(x, y);
    // On change la vitesse pour qu'il se déplace en même temps que le sol
    pipe.body.velocity.x = -250;
    // On supprime ce bout de tuyau s'il sort du terrain
    pipe.outOfBoundsKill = true;
    pipe.body.immovable = true;

    // si on se trouve sur le premier morceau de tuyau du groupe
    if(i == 0) {
      // On enregistre le tuyau pour connaître la position de ce dernier et savoir quand augmenter le score
      this.pipesToCheckForScore.push(pipe);
      // Idem pour savoir quand ajouter un nouveau groupe de tuyau
      this.pipesToCheckForAdd.push(pipe);
    }
  }

}

export default Pipes;
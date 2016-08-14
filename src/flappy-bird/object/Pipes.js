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

  addGroupPipes(game, ground) {
    const nbPiecesOfPipes = 12;
    const hole = Math.round(Math.random() * (nbPiecesOfPipes - 7)) + 3;

    for (var i = 0; i <= nbPiecesOfPipes; i++)
      if (i > hole + 1 || i < hole - 1) {
        this.addPieceOfPipe(game.world.width, game.world.height - ground.height - i * game.world.height / nbPiecesOfPipes, i, hole);
      }
  }

  addPieceOfPipe(x, y, i, hole, nbPipe) {
    // Si le trou est juste avant ou juste après, on place les pipeEnd
    if(i == hole + 2 || i == hole - 2) {
      const yDiff = 15;
      let pipeEnd;
      let yPipe;

      if(i == hole + 2) {
        // On prend le premier élément "mort" du groupe pipesEndTop
        pipeEnd = this.pipesEndTop.getFirstDead();
        yPipe = y + yDiff;
      } else {
        // On prend le premier élément "mort" du groupe pipesEndBottom
        pipeEnd = this.pipesEndBottom.getFirstDead();
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
    let pipe = this.pipes.getFirstDead();
    // On change la position du bout de tuyau
    if(!pipe) debugger
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
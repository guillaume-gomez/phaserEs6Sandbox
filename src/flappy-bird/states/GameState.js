class GameState extends Phaser.State {

  create() {
    this.background = this.game.add.sprite(0, 0, 'background');
    this.background.width = this.game.width;
    this.background.height = this.game.height;

    // // Création de l'oiseau en tant que sprite dans le jeu avec coordonnées x = 200px et y = 0
    // this.bird = this.game.add.sprite(200, 0, 'bird');
    // this.bird.width = this.bird.width / 6.5;
    // this.bird.height = this.bird.height / 6.5;
    // // On place l'oiseau au milieu, verticalement, de l'écran 
    // this.bird.y = this.game.height / 2 - this.bird.height / 2;
    // // On empêche le corps physique de rebondir lors d'une collision
    // this.bird.body.rebound = false;
    // // On place le point d'origine au centre de l'oiseau afin qu'on puisse lui affecter une rotation sur lui-même
    // this.bird.anchor.setTo(0.5, 0.5);
    // // Nous permettra de savoir si l'oiseau est dans un saut ou non
    // this.birdInJump = false;

  }

  preload() {
    this.game.stage.scale = Phaser.ScaleManager.SHOW_ALL;
    //this.game.stage.scale.setShowAll();
    window.addEventListener('resize', function () { 
        this.game.scale.refresh();
    });
    this.game.scale.refresh();

    this.game.load.atlasJSONHash('bird', 'res/bird.png', 'res/bird.json');
    // background
    this.game.load.image('background', 'res/background.png');
  }

  update() {

  }

}

export default GameState;
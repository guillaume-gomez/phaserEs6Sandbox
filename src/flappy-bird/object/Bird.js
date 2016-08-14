class Bird extends Phaser.Sprite {

  constructor(game, x, y, key, frame) {
    super(game, x, y, key, frame);
    this.width = this.width / 6.5;
    this.height = this.height / 6.5;
    this.y = game.height / 2 - this.height / 2;

    this.game = game;

    //Enable physics on the player
    game.physics.arcade.enable(this);
    //no rebound after colission
    this.body.bounce.x = this.body.bounce.y = 0;
    //rotation in the center
    this.anchor.setTo(0.5, 0.5);
    this.birdInJump = false;

    // this.body.setPolygon(
    //               39, 129,
    //               127, 42,
    //               188, 0,
    //               365, 0,
    //               425, 105,
    //               436, 176,
    //               463, 182,
    //               495, 219,
    //               430, 315,
    //               285, 345,
    //               152, 341,
    //               6, 228
    // );
    this.birdRotatePolygon = 0;

    // On ajoute l'animation qui va permettre à l'oiseau de flotter dans les airs
    this.tweenFlap = game.add.tween(this);
    this.tweenFlap.to({ y: this.y + 20}, 400, Phaser.Easing.Quadratic.InOut, true, 0, 10000000000, true);
    // On ajoute l'animation du battement des ailes, animation contenu dans le JSON
    this.animations.add('fly');
    // On fait démarrer l'animation, avec 8 images par seconde et répétée en boucle
    this.animations.play('fly', 8, true);
  }



  onStart() {
    // Gravité de l'oiseau
    this.body.gravity.y = 2000;
    // Premier saut
    this.body.velocity.y = -600;
    // On note que l'oiseau est dans l'action jump
    this.birdInJump = true;

    this.rotation = -Math.PI / 8;
    this.body.rotation = -Math.PI / 8;
    this.birdRotatePolygon = -Math.PI / 8;

    this.tweenFlap.stop();
    this.animations.stop('fly');
    this.animations.play('fly', 15, true);
  }

  jump() {
    if(this.y >= 0) {
      this.birdInJump = true;
      this.body.velocity.y = -600;

      if(this.tweenFall != null) {
        this.tweenFall.stop();
      }
      this.rotation = -Math.PI / 8;
      this.tweenJump = this.game.add.tween(this);
      this.tweenJump.to({rotation: -Math.PI / 8}, 70, Phaser.Easing.Quadratic.In, true, 0, 0, true);
      this.animations.play('fly');
      this.animations.frame = 0;
    }
  }

  update() {
    if(this.body.velocity.y > 0 && this.birdInJump) {
      this.birdInJump = false;

      if(this.tweenJump != null){
        this.tweenJump.stop();
      }
      this.tweenFall = this.game.add.tween(this);
      this.tweenFall.to({rotation: Math.PI / 2}, 300, Phaser.Easing.Quadratic.In, true, 200, 0, true);

      this.tweenFall.onStart.add(function() {
        this.animations.stop('fly');
        this.animations.frame = 1;
      }.bind(this));

      this.body.rotation = (this.rotation - this.birdRotatePolygon);
      this.birdRotatePolygon += this.rotation - this.birdRotatePolygon;
    }
  }
}

export default Bird;
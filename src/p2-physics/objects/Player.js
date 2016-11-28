class Player extends Phaser.Sprite {

  constructor(game, x, y, key, frame) {
    super(game, x, y, key, frame);
    this.facing = "left";
    this.jumpTimer = 0;
    
    this.animations.add('left', [0, 1, 2, 3], 10, true);
    this.animations.add('turn', [4], 20, true);
    this.animations.add('right', [5, 6, 7, 8], 10, true);

    game.physics.p2.enable(this);
    const spriteMaterial = game.physics.p2.createMaterial('spriteMaterial', this.body);
    this.body.fixedRotation = true;
    //this.body.setMaterial(characterMaterial);
  }

  handleMove(cursors, jumpButton, game) {
    if (cursors.left.isDown)
    {
        this.body.moveLeft(200);

        if (this.facing != 'left')
        {
            this.animations.play('left');
            this.facing = 'left';
        }
    }
    else if (cursors.right.isDown)
    {
        this.body.moveRight(200);

        if (this.facing != 'right')
        {
            this.animations.play('right');
            this.facing = 'right';
        }
    }
    else
    {
        this.body.velocity.x = 0;

        if (this.facing != 'idle')
        {
            this.animations.stop();

            if (this.facing == 'left')
            {
                this.frame = 0;
            }
            else
            {
                this.frame = 5;
            }

            this.facing = 'idle';
        }
    }
    
    if (jumpButton.isDown && game.time.now > this.jumpTimer && this.checkIfCanJump(game))
    {
      this.body.moveUp(300);
      this.jumpTimer = game.time.now + 750;
    }
  }


  checkIfCanJump(game) {
    const yAxis = p2.vec2.fromValues(0, 1);
    let result = false;

      for (var i = 0; i < game.physics.p2.world.narrowphase.contactEquations.length; i++)
      {
          const c = game.physics.p2.world.narrowphase.contactEquations[i];

          if (c.bodyA === this.body.data || c.bodyB === this.body.data)
          {
              let d = p2.vec2.dot(c.normalA, yAxis); // Normal dot Y-axis
              if (c.bodyA === this.body.data) d *= -1;
              if (d > 0.5) result = true;
          }
      }
      
      return result;

  }
}

export default Player;
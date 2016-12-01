class Rope extends Phaser.Sprite {

  constructor(game, x, y, key, length, xAnchor, yAnchor, frame) {
    super(game, x, y, key, frame);
    let lastRect;
    const heightBody = 20;        //  Height for the physics body - your image height is 8px
    const widthBody = 16;         //  This is the width for the physics body. If too small the rectangles will get scrambled together.
    const maxForce = 20000;   //  The force that holds the rectangles together.

    for (let i = 0; i <= length; i++)
    {
      const x = xAnchor;                    //  All rects are on the same x position
      const y = yAnchor + (i * heightBody);     //  Every new rect is positioned below the last
      let newRect = null;

      if (i % 2 === 0)
      {
        //  Add sprite (and switch frame every 2nd time)
        newRect = game.add.sprite(x, y, key, 1);
      }
      else
      {
        newRect = game.add.sprite(x, y, key, 0);
        lastRect.bringToTop();
      }

      //  Enable physicsbody
      game.physics.p2.enable(newRect, false);

      //  Set custom rectangle
      newRect.body.setRectangle(widthBody, heightBody);

      if (i === 0)
      {
        newRect.body.static = true;
      }
      else
      {
        //  Anchor the first one created
        newRect.body.velocity.x = 400;//  Give it a push :) just for fun
        newRect.body.mass = length / i;//  Reduce mass for evey rope element
      }
      //  After the first rectangle is created we can add the constraint
      if (lastRect)
      {
        game.physics.p2.createRevoluteConstraint(newRect, [0, -10], lastRect, [0, 10], maxForce);
      }
      lastRect = newRect;
    }
  }

}

export default Rope;
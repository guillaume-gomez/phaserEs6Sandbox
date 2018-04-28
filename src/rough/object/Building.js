class Building extends Phaser.Group {

  constructor(game, roughSpriteGenerator, x, y, width, height, config = {doorConfig: {}, windowConfig: {}, wallConfig: {}}) {
    super(game);
    // basement
    const defaultWallConfig = {
        fill: 'rgba(200,200,200,0.8)',
        fillStyle: 'solid'
    };
    const base = roughSpriteGenerator.getRectangleSprite(
        x,
        y,
        width,
        height,
        Object.assign({}, defaultWallConfig, config.wallConfig)
    );

    // door
    const doorHeight = height * 0.1;
    const doorWidth = width * 0.15;
    const defaultDoorConfig = {
        fill: 'rgba(0,0,0,0.8)',
        fillStyle: 'solid'
    };
    const door = roughSpriteGenerator.getRectangleSprite(
        x + width/2 - doorWidth/2,
        y + height - doorHeight,
        doorWidth,
        doorHeight,
        Object.assign({}, defaultDoorConfig, config.doorConfig)
    );
    this.add(base);
    this.add(door);

    //windows
    const windowWidth = 40;
    const windowHeight = 60;
    const spaces = 5;
    const nbFloors = Math.floor((height - doorHeight - 10) / (windowHeight + spaces));
    const nbWindowsByFloor = Math.floor((width - 10) / (windowWidth + spaces));

    const offsetHeight = (height - doorHeight - (nbFloors * (windowHeight + spaces)) + spaces) / 2;
    const offsetWidth = (width - (nbWindowsByFloor * (windowWidth + spaces)) + spaces) / 2;

    const defaultWindowConfig = {
        fill: 'rgba(182,211,223,1)',
        fillStyle: 'solid'
    };
    for(let i = 0; i < nbFloors; ++i) {
      for(let j = 0; j < nbWindowsByFloor; ++j) {
        const newWindow = roughSpriteGenerator.getRectangleSprite(
            x + offsetWidth + j * ( windowWidth + spaces),
            y + offsetHeight + i * (windowHeight + spaces),
            windowWidth,
            windowHeight,
            Object.assign({}, defaultWindowConfig, config.windowConfig)
        );
        this.add(newWindow);
      }
    }
  }
}

export default Building;
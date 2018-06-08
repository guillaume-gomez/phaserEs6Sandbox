(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _GameState = require('states/GameState');

var _GameState2 = _interopRequireDefault(_GameState);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var RoughExample = function (_Phaser$Game) {
  _inherits(RoughExample, _Phaser$Game);

  function RoughExample() {
    _classCallCheck(this, RoughExample);

    var _this = _possibleConstructorReturn(this, (RoughExample.__proto__ || Object.getPrototypeOf(RoughExample)).call(this, 800, 600, Phaser.AUTO, 'content', null));

    _this.state.add('GameState', _GameState2.default, false);
    _this.state.start('GameState');
    return _this;
  }

  return RoughExample;
}(Phaser.Game);

new RoughExample();

},{"states/GameState":6}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Building = function (_Phaser$Group) {
  _inherits(Building, _Phaser$Group);

  function Building(game, roughSpriteGenerator, x, y, width, height) {
    var config = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : { doorConfig: {}, windowConfig: {}, wallConfig: {} };
    var animated = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : false;

    _classCallCheck(this, Building);

    // basement
    var _this = _possibleConstructorReturn(this, (Building.__proto__ || Object.getPrototypeOf(Building)).call(this, game));

    var defaultWallConfig = {
      fill: 'rgba(200,200,200,0.8)',
      fillStyle: 'solid'
    };
    console.log(animated);
    var base = null;
    if (animated) {
      base = roughSpriteGenerator.getAnimatedRectangle(x, y, width, height, Object.assign({}, defaultWallConfig, config.wallConfig), 4);
    } else {
      base = roughSpriteGenerator.getRectangleSprite(x, y, width, height, Object.assign({}, defaultWallConfig, config.wallConfig));
    }
    // door
    var doorHeight = height * 0.1;
    var doorWidth = width * 0.15;
    var defaultDoorConfig = {
      fill: 'rgba(0,0,0,0.8)',
      fillStyle: 'solid'
    };
    var door = roughSpriteGenerator.getRectangleSprite(x + width / 2 - doorWidth / 2, y + height - doorHeight, doorWidth, doorHeight, Object.assign({}, defaultDoorConfig, config.doorConfig));
    _this.add(base);
    _this.add(door);

    //windows
    var windowWidth = 40;
    var windowHeight = 60;
    var spaces = 5;
    var nbFloors = Math.floor((height - doorHeight - 10) / (windowHeight + spaces));
    var nbWindowsByFloor = Math.floor((width - 10) / (windowWidth + spaces));

    var offsetHeight = (height - doorHeight - nbFloors * (windowHeight + spaces) + spaces) / 2;
    var offsetWidth = (width - nbWindowsByFloor * (windowWidth + spaces) + spaces) / 2;

    var defaultWindowConfig = {
      fill: 'rgba(182,211,223,1)',
      fillStyle: 'solid'
    };
    for (var i = 0; i < nbFloors; ++i) {
      for (var j = 0; j < nbWindowsByFloor; ++j) {
        var newWindow = null;
        if (animated) {
          newWindow = roughSpriteGenerator.getAnimatedRectangle(x + offsetWidth + j * (windowWidth + spaces), y + offsetHeight + i * (windowHeight + spaces), windowWidth, windowHeight, Object.assign({}, defaultWindowConfig, config.windowConfig), 4);
        } else {
          newWindow = roughSpriteGenerator.getRectangleSprite(x + offsetWidth + j * (windowWidth + spaces), y + offsetHeight + i * (windowHeight + spaces), windowWidth, windowHeight, Object.assign({}, defaultWindowConfig, config.windowConfig));
        }
        _this.add(newWindow);
      }
    }
    return _this;
  }

  return Building;
}(Phaser.Group);

exports.default = Building;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var House = function (_Phaser$Group) {
    _inherits(House, _Phaser$Group);

    function House(game, roughSpriteGenerator, x, y, width, height) {
        _classCallCheck(this, House);

        var _this = _possibleConstructorReturn(this, (House.__proto__ || Object.getPrototypeOf(House)).call(this, game));

        var roofHeight = height * 0.35;
        var baseHeight = height * 0.65;

        // base
        var base = roughSpriteGenerator.getRectangleSprite(x, y + roofHeight, width, baseHeight, { fill: "pink", fillStyle: "solid" });
        //roof
        var line = roughSpriteGenerator.getLineSprite(x, y + roofHeight, 0, 0, width / 2, roofHeight, { fill: "red" });
        var line2 = roughSpriteGenerator.getLineSprite(x + width, y + roofHeight, 0, 0, -width / 2, roofHeight);

        // door
        var doorHeight = height * 0.3;
        var doorWidth = width * 0.15;
        var door = roughSpriteGenerator.getRectangleSprite(x + width / 2 - doorWidth / 2, y + height - doorHeight, doorWidth, doorHeight, { fill: "red", fillStyle: "solid" });

        // windows
        var offsetWindow = 15;
        var houseWindow = roughSpriteGenerator.getRectangleSprite(x + offsetWindow, y + height / 2, 30, 25, { fill: "white", fillStyle: "solid" });
        var houseWindow2 = roughSpriteGenerator.getRectangleSprite(x + width - offsetWindow - 30, y + height / 2, 30, 25, { fill: "white", fillStyle: "solid" });

        _this.add(base);
        _this.add(door);
        _this.add(line);
        _this.add(line2);
        _this.add(houseWindow);
        _this.add(houseWindow2);
        return _this;
    }

    return House;
}(Phaser.Group);

exports.default = House;

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var RoughSpriteGenerator = function () {
  function RoughSpriteGenerator(game) {
    _classCallCheck(this, RoughSpriteGenerator);

    this.game = game;
  }

  _createClass(RoughSpriteGenerator, [{
    key: 'getRectangle',
    value: function getRectangle(bmd, width, height, config) {
      var x = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
      var y = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

      var rc = rough.canvas(bmd.canvas);
      rc.rectangle(x, y, width, height, config);
    }
  }, {
    key: 'getCircle',
    value: function getCircle(bmd, center, radius, config) {
      var rc = rough.canvas(bmd.canvas);
      rc.circle(center.x, center.y, radius * 2, config);
    }
  }, {
    key: 'getLine',
    value: function getLine(bmd, dist, config) {
      this.getRectangle(bmd, dist, 2, config);
    }
  }, {
    key: 'getPolygon',
    value: function getPolygon(bmd, data, config) {
      var rc = rough.canvas(bmd.canvas);
      rc.path(data, config);
    }
  }, {
    key: 'getCircleSprite',
    value: function getCircleSprite(x, y, radius) {
      var config = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

      var defaultConfig = {
        fill: "rgb(10,150,10)",
        fillWeight: 5 // thicker lines for hachure
      };
      var configs = Object.assign({}, defaultConfig, config);
      var realRadius = radius + (config.fillWeight || 0);
      var bmd = this.game.add.bitmapData(realRadius * 2, realRadius * 2);
      this.getCircle(bmd, { x: realRadius, y: realRadius }, radius, configs);
      return new Phaser.Sprite(this.game, x, y, bmd);
    }
  }, {
    key: 'getRectangleSprite',
    value: function getRectangleSprite(x, y, width, height) {
      var config = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

      var bmd = this.game.add.bitmapData(width, height);
      var defaultConfig = {
        fill: 'black',
        stroke: 'black',
        hachureAngle: 60,
        hachureGap: 10,
        fillWeight: 5,
        strokeWidth: 5
      };
      var configs = Object.assign({}, defaultConfig, config);
      this.getRectangle(bmd, width, height, configs);
      return new Phaser.Sprite(this.game, x, y, bmd);
    }
  }, {
    key: 'getAnimatedRectangle',
    value: function getAnimatedRectangle(x, y, width, height, config, nbImages) {
      var bmd = this.game.add.bitmapData(width * nbImages, height);
      for (var i = 0; i < nbImages; i++) {
        this.getRectangle(bmd, width, height, config, i * width, 0);
      }
      var key = x + '_' + y + '_' + width + '_' + height;
      this.game.cache.addSpriteSheet(key, null, bmd.canvas, width, height);

      var sprite = new Phaser.Sprite(this.game, x, y, key);
      var walk = sprite.animations.add('sketch');
      walk.enableUpdate = true;
      sprite.animations.play('sketch', 10, true);
      return sprite;
    }
  }, {
    key: 'getLineSprite',
    value: function getLineSprite(x, y, x1, y1, x2, y2) {
      var config = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : {};

      var dist = this.lengthFromPoints(x1, y1, x2, y2);
      var bmd = this.game.add.bitmapData(dist, 2);
      this.getLine(bmd, dist, config);
      var angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
      var sprite = new Phaser.Sprite(this.game, x, y, bmd);
      sprite.angle = -angle;
      return sprite;
    }
  }, {
    key: 'getPolygonSprite',
    value: function getPolygonSprite(x, y, data, width, height, config) {
      var bmd = this.game.add.bitmapData(width, height);
      this.getPolygon(bmd, data, config);
      return new Phaser.Sprite(this.game, x, y, bmd);
    }
  }, {
    key: 'lengthFromPoints',
    value: function lengthFromPoints(x1, y1, x2, y2) {
      return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
    }
  }]);

  return RoughSpriteGenerator;
}();

exports.default = RoughSpriteGenerator;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Sun = function (_Phaser$Group) {
    _inherits(Sun, _Phaser$Group);

    function Sun(game, roughSpriteGenerator, x, y, radius) {
        _classCallCheck(this, Sun);

        var _this = _possibleConstructorReturn(this, (Sun.__proto__ || Object.getPrototypeOf(Sun)).call(this, game));

        var offset = 5;
        var offset2 = offset + 2;
        var core = roughSpriteGenerator.getCircleSprite(x + radius / 2, y + radius / 2, radius / 2, { fill: "rgb(255,255,102)" });
        var line = roughSpriteGenerator.getLineSprite(x, y + radius, 0, 0, radius / 2 - offset, 0);
        var line2 = roughSpriteGenerator.getLineSprite(x + 1.5 * radius + offset, y + radius, 0, 0, radius / 2 - offset, 0);
        var line3 = roughSpriteGenerator.getLineSprite(x + radius, y + radius / 2 - offset, 0, 0, 0, radius / 2 - offset);
        var line4 = roughSpriteGenerator.getLineSprite(x + radius, y + 2 * radius, 0, 0, 0, radius / 2 - offset);

        var line5 = roughSpriteGenerator.getLineSprite(x + 1.5 * radius, y + radius / 2, 0, 0, radius / 2 - offset2, radius / 2 - offset2);
        var line6 = roughSpriteGenerator.getLineSprite(x + offset2, y + offset2, 0, 0, radius / 2 - offset2, -radius / 2 + offset2);
        var line7 = roughSpriteGenerator.getLineSprite(x + 1.5 * radius, y + 1.5 * radius, 0, 0, radius / 2 - offset2, -radius / 2 + offset2);
        var line8 = roughSpriteGenerator.getLineSprite(x + offset2, y + 2 * radius - offset2, 0, 0, radius / 2 - offset2, radius / 2 - offset2);

        _this.add(core);
        _this.add(line);
        _this.add(line2);
        _this.add(line3);
        _this.add(line4);
        _this.add(line5);
        _this.add(line6);
        _this.add(line7);
        _this.add(line8);
        return _this;
    }

    return Sun;
}(Phaser.Group);

exports.default = Sun;

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

var _RoughSpriteGenerator = require('object/RoughSpriteGenerator');

var _RoughSpriteGenerator2 = _interopRequireDefault(_RoughSpriteGenerator);

var _Sun = require('object/Sun');

var _Sun2 = _interopRequireDefault(_Sun);

var _House = require('object/House');

var _House2 = _interopRequireDefault(_House);

var _Building = require('object/Building');

var _Building2 = _interopRequireDefault(_Building);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }return obj;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var GameState = function (_Phaser$State) {
  _inherits(GameState, _Phaser$State);

  function GameState() {
    _classCallCheck(this, GameState);

    return _possibleConstructorReturn(this, (GameState.__proto__ || Object.getPrototypeOf(GameState)).apply(this, arguments));
  }

  _createClass(GameState, [{
    key: 'create',
    value: function create() {
      this.game.time.advancedTiming = true;
      this.game.stage.backgroundColor = "#a9f1f6";

      this.game.world.setBounds(0, 0, 1500, 600);

      this.game.physics.startSystem(Phaser.Physics.ARCADE);
      this.game.physics.arcade.gravity.y = 300;
      // rough sprite generator
      var rsg = new _RoughSpriteGenerator2.default(this.game);

      this.house = new _House2.default(this.game, rsg, 50, this.game.height - 32 - 100, 150, 100);
      this.game.add.existing(this.house);

      this.house2 = new _House2.default(this.game, rsg, this.game.width - 20, this.game.height - 32 - 150, 150, 150);
      this.game.add.existing(this.house2);

      this.building = new _Building2.default(this.game, rsg, 250, this.game.height - 32 - 400, 200, 400, { wallConfig: { fill: "rgba(226, 78, 46, 1.0)" } }, true);
      this.game.add.existing(this.building);

      this.building2 = new _Building2.default(this.game, rsg, 500, this.game.height - 32 - 300, 250, 300, { wallConfig: { fill: "rgba(204, 179, 151, 1.0)" } });
      this.game.add.existing(this.building2);

      this.building3 = new _Building2.default(this.game, rsg, this.game.world.bounds.width - 400, this.game.height - 32 - 500, 200, 500);
      this.game.add.existing(this.building3);

      this.sun = new _Sun2.default(this.game, rsg, 0, 0, 75);
      this.sun.fixedToCamera = true;
      this.game.add.existing(this.sun);

      this.cloud = rsg.getPolygonSprite(500, 30, 'M406.1 227.63c-8.23-103.65-144.71-137.8-200.49-49.05 -36.18-20.46-82.33 3.61-85.22 45.9C80.73 229.34 50 263.12 50 304.1c0 44.32 35.93 80.25 80.25 80.25h251.51c44.32 0 80.25-35.93 80.25-80.25C462 268.28 438.52 237.94 406.1 227.63z', 512, 512, { fill: 'white', strokeWidth: 3, fillWeight: 5 });
      this.cloud.scale.setTo(0.45, 0.45);
      // add my own attribute
      this.cloud.vel = -0.05;
      this.game.add.existing(this.cloud);

      this.cloud2 = rsg.getPolygonSprite(0, 50, 'M406.1 227.63c-8.23-103.65-144.71-137.8-200.49-49.05 -36.18-20.46-82.33 3.61-85.22 45.9C80.73 229.34 50 263.12 50 304.1c0 44.32 35.93 80.25 80.25 80.25h251.51c44.32 0 80.25-35.93 80.25-80.25C462 268.28 438.52 237.94 406.1 227.63z', 512, 512, { fill: 'white', strokeWidth: 3, fillWeight: 5 });
      this.cloud2.scale.setTo(0.5, 0.5);
      this.cloud2.vel = 0.08;
      this.game.add.existing(this.cloud2);

      this.cloud3 = rsg.getPolygonSprite(700, 10, 'M406.1 227.63c-8.23-103.65-144.71-137.8-200.49-49.05 -36.18-20.46-82.33 3.61-85.22 45.9C80.73 229.34 50 263.12 50 304.1c0 44.32 35.93 80.25 80.25 80.25h251.51c44.32 0 80.25-35.93 80.25-80.25C462 268.28 438.52 237.94 406.1 227.63z', 512, 512, { fill: 'white', strokeWidth: 3, fillWeight: 5 });
      this.cloud3.scale.setTo(0.35, 0.35);
      this.cloud3.vel = 0.1;
      this.game.add.existing(this.cloud3);

      this.group = this.game.add.group();
      for (var i = 0; i < 25; i++) {
        var rnd = Math.random();
        var x = this.getRandomInt(i * 50, (i + 1) * 50);
        var y = this.getRandomInt(350, 450);
        var config = {
          fill: this.getRandomColor(),
          fillWeight: this.getRandomInt(1, 5)
        };
        var sprite = null;
        if (rnd > 0.5) {
          var radius = this.getRandomInt(10, 25);
          sprite = rsg.getCircleSprite(x, y, radius, config);
          this.game.physics.enable(sprite, Phaser.Physics.ARCADE);
          var realRadius = radius + (config.fillWeight || 0);
          sprite.body.setCircle(realRadius);
        } else {
          var width = this.getRandomInt(20, 50);
          var height = this.getRandomInt(20, 50);
          sprite = rsg.getRectangleSprite(x, y, width, height, config);
          this.game.physics.enable(sprite, Phaser.Physics.ARCADE);
        }
        sprite.body.bounce.setTo(0.80, 0.80);
        sprite.body.collideWorldBounds = true;
        sprite.body.velocity.x = this.getRandomInt(-75, 75);
        this.group.add(sprite);
      }

      this.character = rsg.getAnimatedRectangle(100, 450, 50, 75, _defineProperty({
        fill: "#00B0FF",
        roughness: 1.5,
        strokeWidth: 10,
        hachureAngle: 90,
        hachureGap: 5,
        fillWeight: 5
      }, 'strokeWidth', 5), 4);
      this.game.physics.enable(this.character, Phaser.Physics.ARCADE);
      this.character.body.collideWorldBounds = true;
      this.game.add.existing(this.character);
      this.game.camera.follow(this.character);

      this.ground = rsg.getRectangleSprite(0, this.game.height - 32, this.game.world.bounds.width, 30, { fill: "#00A6A6", strokeWidth: 2 });
      this.game.physics.enable(this.ground, Phaser.Physics.ARCADE);
      this.ground.body.allowGravity = false;
      this.ground.body.immovable = true;
      this.game.add.existing(this.ground);

      this.cursors = this.game.input.keyboard.createCursorKeys();
      this.jumpButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    }
  }, {
    key: 'preload',
    value: function preload() {}
  }, {
    key: 'cloudManagement',
    value: function cloudManagement() {
      var _this2 = this;

      [this.cloud, this.cloud2, this.cloud3].forEach(function (cloud) {
        if (cloud.x + cloud.width > _this2.game.world.bounds.width) {
          cloud.x = 0;
        } else if (cloud.x + cloud.width < 0) {
          cloud.x = _this2.game.world.bounds.width - cloud.width;
        } else {
          cloud.x += cloud.vel;
        }
      });
    }
  }, {
    key: 'update',
    value: function update() {
      this.game.physics.arcade.collide(this.character, this.ground);
      this.game.physics.arcade.collide(this.group, this.ground);

      this.character.body.velocity.x = 0;
      if (this.cursors.left.isDown) {
        this.character.body.velocity.x = -150;
      } else if (this.cursors.right.isDown) {
        this.character.body.velocity.x = 150;
      }

      if (this.jumpButton.isDown && !this.character.body.touching.none) {
        this.character.body.velocity.y = -300;
      }

      this.cloudManagement();
    }
  }, {
    key: 'render',
    value: function render() {
      this.game.debug.text(this.game.time.fps, 2, 14, "#00ff00");
      //this.game.debug.spriteBounds(this.house)
    }
  }, {
    key: 'getRandomInt',
    value: function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  }, {
    key: 'getRandomColor',
    value: function getRandomColor() {
      var letters = '0123456789ABCDEF';
      var color = '#';
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }
  }]);

  return GameState;
}(Phaser.State);

exports.default = GameState;

},{"object/Building":2,"object/House":3,"object/RoughSpriteGenerator":4,"object/Sun":5}]},{},[1])
//# sourceMappingURL=rough.js.map

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

var P2Physics = function (_Phaser$Game) {
  _inherits(P2Physics, _Phaser$Game);

  function P2Physics() {
    _classCallCheck(this, P2Physics);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(P2Physics).call(this, 800, 600, Phaser.AUTO, 'content', null));

    _this.transparent = false;
    _this.state.add('GameState', _GameState2.default, false);
    _this.state.start('GameState');
    return _this;
  }

  return P2Physics;
}(Phaser.Game);

new P2Physics();

},{"states/GameState":5}],2:[function(require,module,exports){
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

var Box = function (_Phaser$Sprite) {
  _inherits(Box, _Phaser$Sprite);

  function Box(game, x, y, key, frame, material) {
    _classCallCheck(this, Box);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Box).call(this, game, x, y, key, frame));

    game.physics.p2.enable(_this);
    //const boxMaterial = game.physics.p2.createMaterial('worldMaterial');
    _this.body.mass = 100;
    _this.body.setMaterial(material);

    return _this;
  }

  return Box;
}(Phaser.Sprite);

exports.default = Box;

},{}],3:[function(require,module,exports){
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

var Player = function (_Phaser$Sprite) {
    _inherits(Player, _Phaser$Sprite);

    function Player(game, x, y, key, frame, material) {
        _classCallCheck(this, Player);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Player).call(this, game, x, y, key, frame));

        _this.facing = "left";
        _this.jumpTimer = 0;

        _this.animations.add('left', [0, 1, 2, 3], 10, true);
        _this.animations.add('turn', [4], 20, true);
        _this.animations.add('right', [5, 6, 7, 8], 10, true);

        game.physics.p2.enable(_this);
        _this.body.fixedRotation = true;
        _this.body.setMaterial(material);
        return _this;
    }

    _createClass(Player, [{
        key: 'handleMove',
        value: function handleMove(cursors, jumpButton, game) {
            if (cursors.left.isDown) {
                this.body.moveLeft(200);

                if (this.facing != 'left') {
                    this.animations.play('left');
                    this.facing = 'left';
                }
            } else if (cursors.right.isDown) {
                this.body.moveRight(200);

                if (this.facing != 'right') {
                    this.animations.play('right');
                    this.facing = 'right';
                }
            } else {
                this.body.velocity.x = 0;

                if (this.facing != 'idle') {
                    this.animations.stop();

                    if (this.facing == 'left') {
                        this.frame = 0;
                    } else {
                        this.frame = 5;
                    }

                    this.facing = 'idle';
                }
            }

            if ((jumpButton.isDown || cursors.up.isDown) && game.time.now > this.jumpTimer && this.checkIfCanJump(game)) {
                this.body.moveUp(300);
                this.jumpTimer = game.time.now + 750;
            }
        }
    }, {
        key: 'checkIfCanJump',
        value: function checkIfCanJump(game) {
            var yAxis = p2.vec2.fromValues(0, 1);
            var result = false;

            for (var i = 0; i < game.physics.p2.world.narrowphase.contactEquations.length; i++) {
                var c = game.physics.p2.world.narrowphase.contactEquations[i];

                if (c.bodyA === this.body.data || c.bodyB === this.body.data) {
                    var d = p2.vec2.dot(c.normalA, yAxis); // Normal dot Y-axis
                    if (c.bodyA === this.body.data) d *= -1;
                    if (d > 0.5) result = true;
                }
            }

            return result;
        }
    }]);

    return Player;
}(Phaser.Sprite);

exports.default = Player;

},{}],4:[function(require,module,exports){
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

var Rope = function (_Phaser$Group) {
  _inherits(Rope, _Phaser$Group);

  function Rope(game, xAnchor, yAnchor, key, length, frame) {
    _classCallCheck(this, Rope);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Rope).call(this, game, xAnchor, yAnchor, key, frame));

    var lastRect = void 0;
    var heightBody = 20; //  Height for the physics body - your image height is 8px
    var widthBody = 16; //  This is the width for the physics body. If too small the rectangles will get scrambled together.
    var maxForce = 20000; //  The force that holds the rectangles together.

    for (var i = 0; i <= length; i++) {
      var x = xAnchor; //  All rects are on the same x position
      var y = yAnchor + i * heightBody; //  Every new rect is positioned below the last
      var newRect = null;

      if (i % 2 === 0) {
        //  Add sprite (and switch frame every 2nd time)
        newRect = _this.create(x, y, key, 1);
      } else {
        newRect = _this.create(x, y, key, 0);
        lastRect.bringToTop();
      }

      //  Enable physicsbody
      game.physics.p2.enable(newRect, false);

      //  Set custom rectangle
      newRect.body.setRectangle(widthBody, heightBody);

      if (i === 0) {
        newRect.body.static = true;
      } else {
        //  Anchor the first one created
        newRect.body.velocity.x = 400; //  Give it a push :) just for fun
        newRect.body.mass = length / i; //  Reduce mass for evey rope element
      }
      //  After the first rectangle is created we can add the constraint
      if (lastRect) {
        game.physics.p2.createRevoluteConstraint(newRect, [0, -10], lastRect, [0, 10], maxForce);
      }
      lastRect = newRect;
    }
    return _this;
  }

  return Rope;
}(Phaser.Group);

exports.default = Rope;

},{}],5:[function(require,module,exports){
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

var _Player = require('objects/Player');

var _Player2 = _interopRequireDefault(_Player);

var _Box = require('objects/Box');

var _Box2 = _interopRequireDefault(_Box);

var _Rope = require('objects/Rope');

var _Rope2 = _interopRequireDefault(_Rope);

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

var PATH = "res/p2-physics/";

var GameState = function (_Phaser$State) {
  _inherits(GameState, _Phaser$State);

  function GameState() {
    _classCallCheck(this, GameState);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(GameState).apply(this, arguments));
  }

  _createClass(GameState, [{
    key: 'create',
    value: function create() {
      this.game.physics.startSystem(Phaser.Physics.P2JS);
      this.game.stage.backgroundColor = '#2d2d2d';

      var map = this.game.add.tilemap('map');

      map.addTilesetImage('ground_1x1');
      map.addTilesetImage('walls_1x2');
      map.addTilesetImage('tiles2');

      var layer = map.createLayer('Tile Layer 1');

      layer.resizeWorld();

      //  Set the tiles for collision.
      //  Do this BEFORE generating the p2 bodies below.
      map.setCollisionBetween(1, 12);

      //  Convert the tilemap layer into bodies. Only tiles that collide (see above) are created.
      //  This call returns an array of body objects which you can perform addition actions on if
      //  required. There is also a parameter to control optimising the map build.
      this.game.physics.p2.convertTilemap(map, layer);

      this.game.physics.p2.restitution = 0.5;
      this.game.physics.p2.gravity.y = 300;

      this.createMaterials();
      this.box = new _Box2.default(this.game, 500, 400 - 95, 'block', 0, this.boxMaterial);
      this.game.add.existing(this.box);

      this.box2 = new _Box2.default(this.game, 500, 400, 'block', 0, this.boxMaterial);
      this.game.add.existing(this.box2);

      this.rope = new _Rope2.default(this.game, 400, 32, 'chain', 10);
      this.game.add.existing(this.rope);

      this.player = new _Player2.default(this.game, 100, 200, 'dude', 0, this.spriteMaterial);
      this.game.add.existing(this.player);

      this.music = this.game.add.audio('sfx');
      this.music.allowMultiple = false;
      this.music.addMarker('charm', 0, 2.7);
      this.music.addMarker('curse', 4, 2.9);
      this.music.play('charm');

      //this.game.physics.p2.setWorldMaterial(this.worldMaterial, true, true, true, true);
      //other materials are defined in each objects

      this.game.camera.follow(this.player);

      this.cursors = this.game.input.keyboard.createCursorKeys();
      this.jumpButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

      this.player.body.onBeginContact.add(this.playerHit, this);
    }
  }, {
    key: 'playerHit',
    value: function playerHit(body, bodyB, shapeA, shapeB, equation) {
      if (body && body.sprite) {
        this.music.play('curse');
      }
    }
  }, {
    key: 'update',
    value: function update() {
      this.player.handleMove(this.cursors, this.jumpButton, this.game);
    }
  }, {
    key: 'preload',
    value: function preload() {
      this.game.load.tilemap('map', PATH + 'collision_test.json', null, Phaser.Tilemap.TILED_JSON);
      this.game.load.image('ground_1x1', PATH + 'ground_1x1.png');
      this.game.load.image('walls_1x2', PATH + 'walls_1x2.png');
      this.game.load.image('tiles2', PATH + 'tiles2.png');
      this.game.load.image('block', PATH + 'block.png');
      this.game.load.spritesheet('dude', PATH + 'dude.png', 32, 48);
      this.game.load.spritesheet('chain', PATH + 'chain.png', 16, 26);
      this.game.load.audio('sfx', [PATH + 'magical_horror_audiosprite.mp3', PATH + 'magical_horror_audiosprite.ogg']);
    }
  }, {
    key: 'render',
    value: function render() {
      //this.game.debug.spriteInfo(this.player, 32, 32);
      //this.bodyDebug = new Phaser.Physics.P2.BodyDebug(this.game, this.box);
    }
  }, {
    key: 'createMaterials',
    value: function createMaterials() {
      this.worldMaterial = this.game.physics.p2.createMaterial('worldMaterial');
      this.spriteMaterial = this.game.physics.p2.createMaterial('spriteMaterial');
      this.boxMaterial = this.game.physics.p2.createMaterial('worldMaterial');
    }
  }]);

  return GameState;
}(Phaser.State);

exports.default = GameState;

},{"objects/Box":2,"objects/Player":3,"objects/Rope":4}]},{},[1])
//# sourceMappingURL=p2-physics.js.map

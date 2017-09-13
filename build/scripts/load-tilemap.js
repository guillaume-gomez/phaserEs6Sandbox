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

var LoadTilemap = function (_Phaser$Game) {
  _inherits(LoadTilemap, _Phaser$Game);

  function LoadTilemap() {
    _classCallCheck(this, LoadTilemap);

    var _this = _possibleConstructorReturn(this, (LoadTilemap.__proto__ || Object.getPrototypeOf(LoadTilemap)).call(this, 800, 600, Phaser.AUTO, 'content', null));

    _this.transparent = true;
    _this.state.add('GameState', _GameState2.default, false);
    _this.state.start('GameState');
    return _this;
  }

  return LoadTilemap;
}(Phaser.Game);

new LoadTilemap();

},{"states/GameState":3}],2:[function(require,module,exports){
"use strict";

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

var OFFSET = 90;

var Car = function (_Phaser$Sprite) {
  _inherits(Car, _Phaser$Sprite);

  function Car(game, x, y, key, frame) {
    _classCallCheck(this, Car);

    var _this = _possibleConstructorReturn(this, (Car.__proto__ || Object.getPrototypeOf(Car)).call(this, game, x, y, key, frame));

    _this.game = game;

    _this.anchor.x = 0.5;
    _this.anchor.y = 0.5;

    _this.cursors = game.input.keyboard.createCursorKeys();
    _this.angle = OFFSET;
    return _this;
  }

  _createClass(Car, [{
    key: "update",
    value: function update() {
      this.body.velocity.x = 0;
      this.body.velocity.y = 0;
      this.body.angularVelocity = 0;

      if (this.cursors.left.isDown) {
        this.body.angularVelocity = -200;
      } else if (this.cursors.right.isDown) {
        this.body.angularVelocity = 200;
      }

      if (this.cursors.up.isDown) {
        this.body.velocity.copyFrom(this.game.physics.arcade.velocityFromAngle(this.angle - OFFSET, 300));
      }
    }
  }]);

  return Car;
}(Phaser.Sprite);

exports.default = Car;

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

var _Car = require('object/Car');

var _Car2 = _interopRequireDefault(_Car);

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

var PATH = "res/load-tilemap";

var GameState = function (_Phaser$State) {
  _inherits(GameState, _Phaser$State);

  function GameState() {
    _classCallCheck(this, GameState);

    return _possibleConstructorReturn(this, (GameState.__proto__ || Object.getPrototypeOf(GameState)).apply(this, arguments));
  }

  _createClass(GameState, [{
    key: 'create',
    value: function create() {
      this.map = this.game.add.tilemap('Map1');
      this.map.addTilesetImage('Desert', 'Tileset');
      this.layer = this.map.createLayer('Ground');
      this.layer.resizeWorld();
      this.map.setCollision(31, true, this.layer);
      this.car = new _Car2.default(this.game, 200, 200, 'car');
      this.game.add.existing(this.car);
      this.game.physics.enable(this.car);
      this.game.camera.follow(this.car);
    }
  }, {
    key: 'update',
    value: function update() {
      this.game.physics.arcade.collide(this.car, this.layer);
    }
  }, {
    key: 'preload',
    value: function preload() {
      this.game.load.tilemap('Map1', PATH + "/my-tilemap.json", null, Phaser.Tilemap.TILED_JSON);
      this.game.load.image('Tileset', PATH + "/tmw_desert_spacing.png");
      this.game.load.image('car', PATH + "/car.png");
    }
  }]);

  return GameState;
}(Phaser.State);

exports.default = GameState;

},{"object/Car":2}]},{},[1])
//# sourceMappingURL=load-tilemap.js.map

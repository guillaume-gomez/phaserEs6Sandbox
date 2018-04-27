(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
    }
  }return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
  };
}();

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

var Parallax = function (_Phaser$Game) {
  _inherits(Parallax, _Phaser$Game);

  function Parallax() {
    _classCallCheck(this, Parallax);

    var _this = _possibleConstructorReturn(this, (Parallax.__proto__ || Object.getPrototypeOf(Parallax)).call(this, 800, 600, Phaser.AUTO, 'content', null));

    _this.transparent = false;
    _this.state.add('GameState', _GameState2.default, false);
    _this.state.start('GameState');
    return _this;
  }

  _createClass(Parallax, [{
    key: 'weather',
    value: function weather() {
      return this.state.states.GameState.weather;
    }
  }]);

  return Parallax;
}(Phaser.Game);

window.game = new Parallax();

},{"states/GameState":4}],2:[function(require,module,exports){
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

var DayCycle = function () {
    function DayCycle(game, dayLength) {
        _classCallCheck(this, DayCycle);

        this.game = game;
        this.dayLength = dayLength;
        this.shading = false;
        this.sunSprite = false;
        this.moonSprite = false;
    }

    _createClass(DayCycle, [{
        key: "initSun",
        value: function initSun(sprite) {
            this.sunSprite = sprite;
            this.sunset(sprite);
        }
    }, {
        key: "initMoon",
        value: function initMoon(sprite) {
            this.moonSprite = sprite;
            this.moonrise(sprite);
        }
    }, {
        key: "initShading",
        value: function initShading(sprites) {
            this.shading = sprites;
        }
    }, {
        key: "sunrise",
        value: function sunrise(sprite) {
            var _this = this;

            sprite.position.x = this.game.width - this.game.width / 4;

            this.sunTween = this.game.add.tween(sprite).to({ y: -250 }, this.dayLength, null, true);
            this.sunTween.onComplete.add(this.sunset, this);

            if (this.shading) {
                this.shading.forEach(function (sprite) {
                    _this.tweenTint(sprite.sprite, sprite.from, sprite.to, _this.dayLength);
                });
            }
        }
    }, {
        key: "sunset",
        value: function sunset(sprite) {
            var _this2 = this;

            sprite.position.x = 50;

            this.sunTween = this.game.add.tween(sprite).to({ y: this.game.world.height }, this.dayLength, null, true);
            this.sunTween.onComplete.add(this.sunrise, this);

            if (this.shading) {
                this.shading.forEach(function (sprite) {
                    _this2.tweenTint(sprite.sprite, sprite.to, sprite.from, _this2.dayLength);
                });
            }
        }
    }, {
        key: "moonrise",
        value: function moonrise(sprite) {
            sprite.position.x = this.game.width - this.game.width / 4;

            this.moonTween = this.game.add.tween(sprite).to({ y: -350 }, this.dayLength, null, true);
            this.moonTween.onComplete.add(this.moonset, this);
        }
    }, {
        key: "moonset",
        value: function moonset(sprite) {
            sprite.position.x = 50;

            this.moonTween = this.game.add.tween(sprite).to({ y: this.game.world.height }, this.dayLength, null, true);
            this.moonTween.onComplete.add(this.moonrise, this);
        }
    }, {
        key: "tweenTint",
        value: function tweenTint(spriteToTween, startColor, endColor, duration) {

            var colorBlend = { step: 0 };

            this.game.add.tween(colorBlend).to({ step: 100 }, duration, Phaser.Easing.Default, false).onUpdateCallback(function () {
                spriteToTween.tint = Phaser.Color.interpolateColor(startColor, endColor, 100, colorBlend.step, 1);
            }).start();
        }
    }]);

    return DayCycle;
}();

exports.default = DayCycle;

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

var Weather = function () {
  function Weather(game) {
    _classCallCheck(this, Weather);

    this.game = game;
  }

  _createClass(Weather, [{
    key: 'addFog',
    value: function addFog() {
      var fog = this.game.add.bitmapData(this.game.width, this.game.height);

      fog.ctx.rect(0, 0, this.game.width, this.game.height);
      fog.ctx.fillStyle = '#b2ddc8';
      fog.ctx.fill();

      this.fogSprite = this.game.add.sprite(0, 0, fog);
      this.fogSprite.alpha = 0;
      this.game.add.tween(this.fogSprite).to({ alpha: 0.7 }, 6000, null, true);
    }
  }, {
    key: 'removeFog',
    value: function removeFog() {
      var _this = this;

      var fogTween = this.game.add.tween(this.fogSprite).to({ alpha: 0 }, 6000, null, true);
      fogTween.onComplete.add(function () {
        _this.fogSprite.destroy();
      }, this);
    }
  }, {
    key: 'addRain',
    value: function addRain() {
      var rainParticle = this.game.add.bitmapData(15, 50);

      rainParticle.ctx.rect(0, 0, 15, 50);
      rainParticle.ctx.fillStyle = '#9cc9de';
      rainParticle.ctx.fill();

      this.emitter = this.game.add.emitter(this.game.world.centerX, -300, 400);

      this.emitter.width = this.game.world.width;
      this.emitter.angle = 10;

      this.emitter.makeParticles(rainParticle);

      this.emitter.minParticleScale = 0.1;
      this.emitter.maxParticleScale = 0.3;

      this.emitter.setYSpeed(600, 1000);
      this.emitter.setXSpeed(-5, 5);

      this.emitter.minRotation = 0;
      this.emitter.maxRotation = 0;
      this.emitter.start(false, 1600, 5, 0);
    }
  }, {
    key: 'removeRain',
    value: function removeRain() {
      this.emitter.destroy();
    }
  }]);

  return Weather;
}();

exports.default = Weather;

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

var _DayCycle = require('objects/DayCycle');

var _DayCycle2 = _interopRequireDefault(_DayCycle);

var _Weather = require('objects/Weather');

var _Weather2 = _interopRequireDefault(_Weather);

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

var PATH = "res/parallax/";

var MountainsBackHeight = 894;
var MountainsMid1Height = 770;
var MountainsMid2Height = 482;

var Offset = 200;

var GameState = function (_Phaser$State) {
  _inherits(GameState, _Phaser$State);

  function GameState() {
    _classCallCheck(this, GameState);

    return _possibleConstructorReturn(this, (GameState.__proto__ || Object.getPrototypeOf(GameState)).apply(this, arguments));
  }

  _createClass(GameState, [{
    key: 'create',
    value: function create() {
      //Enable Arcade Physics
      this.game.physics.startSystem(Phaser.Physics.ARCADE);
      //Set the games background colour

      this.dayCycle = new _DayCycle2.default(this.game, 10000);

      var bgBitMap = this.game.add.bitmapData(this.game.width, this.game.height);
      bgBitMap.ctx.rect(0, 0, this.game.width, this.game.height);
      bgBitMap.ctx.fillStyle = '#b2ddc8';
      bgBitMap.ctx.fill();

      this.backgroundSprite = this.game.add.sprite(0, 0, bgBitMap);

      this.sunSprite = this.game.add.sprite(50, -250, 'sun');
      this.moonSprite = this.game.add.sprite(this.game.width - this.game.width / 4, this.game.height + 500, 'moon');

      //example of cache this.game.cache.getImage('mountains-back').height (the data is loaded in a parent state)
      this.mountainsBack = this.game.add.tileSprite(0, this.game.height - MountainsBackHeight + Offset, this.game.width, MountainsBackHeight, 'mountains-back');

      this.mountainsMid1 = this.game.add.tileSprite(0, this.game.height - MountainsMid1Height + Offset, this.game.width, MountainsMid1Height, 'mountains-mid1');

      this.mountainsMid2 = this.game.add.tileSprite(0, this.game.height - MountainsMid2Height + Offset, this.game.width, MountainsMid2Height, 'mountains-mid2');

      var backgroundSprites = [{ sprite: this.backgroundSprite, from: 0x1f2a27, to: 0xB2DDC8 }, { sprite: this.mountainsBack, from: 0x2f403b, to: 0x96CCBB }, { sprite: this.mountainsMid1, from: 0x283632, to: 0x8BBCAC }, { sprite: this.mountainsMid2, from: 0x202b28, to: 0x82AD9D }];

      this.dayCycle.initShading(backgroundSprites);
      this.dayCycle.initSun(this.sunSprite);
      this.dayCycle.initMoon(this.moonSprite);

      this.weather = new _Weather2.default(this.game);
    }
  }, {
    key: 'update',
    value: function update() {
      this.mountainsBack.tilePosition.x -= 0.05;
      this.mountainsMid1.tilePosition.x -= 0.3;
      this.mountainsMid2.tilePosition.x -= 0.75;
    }
  }, {
    key: 'preload',
    value: function preload() {
      this.game.load.image('mountains-back', PATH + 'mountains-back.png');
      this.game.load.image('mountains-mid1', PATH + 'mountains-mid1.png');
      this.game.load.image('mountains-mid2', PATH + 'mountains-mid2.png');
      this.game.load.image('sun', PATH + 'sun.png');
      this.game.load.image('moon', PATH + 'moon.png');
    }
  }]);

  return GameState;
}(Phaser.State);

exports.default = GameState;

},{"objects/DayCycle":2,"objects/Weather":3}]},{},[1])
//# sourceMappingURL=parallax.js.map

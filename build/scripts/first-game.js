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

var Game = function (_Phaser$Game) {
  _inherits(Game, _Phaser$Game);

  function Game() {
    _classCallCheck(this, Game);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Game).call(this, 450, 800, Phaser.AUTO, 'content', null));

    _this.score = 0;
    _this.state.add('GameState', _GameState2.default, false);
    _this.state.start('GameState');
    return _this;
  }

  _createClass(Game, [{
    key: 'gameOver',
    value: function gameOver() {
      this.score = 0;
      this.state.start('GameState');
    }
  }, {
    key: 'incrementScore',
    value: function incrementScore() {
      this.score += 1;
    }
  }]);

  return Game;
}(Phaser.Game);

new Game();

},{"states/GameState":5}],2:[function(require,module,exports){
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

var Player = function (_Phaser$Sprite) {
  _inherits(Player, _Phaser$Sprite);

  function Player(game, x, y, key, frame) {
    _classCallCheck(this, Player);

    //Set the players anchor point to be in the middle horizontally
    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Player).call(this, game, x, y, key, frame));

    _this.anchor.setTo(0.5, 1.0);

    //Enable physics on the player
    game.physics.arcade.enable(_this);

    //Make the player fall by applying gravity
    _this.body.gravity.y = 2000;

    //Make the player collide with the game boundaries
    _this.body.collideWorldBounds = true;

    //Make the player bounce a little
    _this.body.bounce.y = 0.1;
    return _this;
  }

  _createClass(Player, [{
    key: "handleMove",
    value: function handleMove(cursors) {
      //Make the sprite jump when the up key is pushed
      if (cursors.up.isDown && this.body.wasTouching.down) {
        this.body.velocity.y = -1400;
      }
      //Make the player go left
      if (cursors.left.isDown) {
        this.body.velocity.x += -30;
      }
      //Make the player go right
      if (cursors.right.isDown) {
        this.body.velocity.x += 30;
      }
    }
  }]);

  return Player;
}(Phaser.Sprite);

exports.default = Player;

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

var ScoreText = function (_Phaser$Text) {
  _inherits(ScoreText, _Phaser$Text);

  function ScoreText(game, x, y, text, style) {
    _classCallCheck(this, ScoreText);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ScoreText).call(this, game, x, y, text, style));

    _this.anchor.setTo(0.5, 0.5);
    _this.align = 'center';
    return _this;
  }

  _createClass(ScoreText, [{
    key: 'render',
    value: function render(score) {
      this.text = score;
    }
  }]);

  return ScoreText;
}(Phaser.Text);

exports.default = ScoreText;

},{}],4:[function(require,module,exports){
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

var Terrain = function () {
  function Terrain(game, platforms) {
    _classCallCheck(this, Terrain);

    this.game = game;
    this.platforms = platforms;
    //binding
    this.addPlatform = this.addPlatform.bind(this);
    this.initPlatforms = this.initPlatforms.bind(this);
  }

  _createClass(Terrain, [{
    key: "initPlatforms",
    value: function initPlatforms() {
      var bottom = this.game.world.height - this.game.tileHeight;
      var top = this.game.tileHeight;
      //Keep creating platforms until they reach (near) the top of the screen
      for (var y = bottom; y > top - this.game.tileHeight; y = y - this.game.spacing) {
        this.addPlatform(y);
      }
    }
  }, {
    key: "addTile",
    value: function addTile(x, y) {
      //Get a tile that is not currently on screen
      var tile = this.platforms.getFirstDead();

      //Reset it to the specified coordinates
      tile.reset(x, y);
      tile.body.velocity.y = 150;
      tile.body.immovable = true;

      //When the tile leaves the screen, kill it
      tile.checkWorldBounds = true;
      tile.outOfBoundsKill = true;
    }
  }, {
    key: "addPlatform",
    value: function addPlatform(y) {
      //If no y position is supplied, render it just outside of the screen
      if (typeof y == "undefined") {
        y = -this.game.tileHeight;
        //increase the score
        this.game.incrementScore();
      }
      //Work out how many tiles we need to fit across the whole screen
      var tilesNeeded = Math.ceil(this.game.world.width / this.game.tileWidth);

      //Add a hole randomly somewhere
      var hole = Math.floor(Math.random() * (tilesNeeded - 3)) + 1;

      //Keep creating tiles next to each other until we have an entire row
      //Don't add tiles where the random hole is
      for (var i = 0; i < tilesNeeded; i++) {
        if (i != hole && i != hole + 1) {
          this.addTile(i * this.game.tileWidth, y);
        }
      }
    }
  }]);

  return Terrain;
}();

exports.default = Terrain;

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

var _Terrain = require('objects/Terrain');

var _Terrain2 = _interopRequireDefault(_Terrain);

var _Player = require('objects/Player');

var _Player2 = _interopRequireDefault(_Player);

var _ScoreText = require('objects/ScoreText');

var _ScoreText2 = _interopRequireDefault(_ScoreText);

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

var GameState = function (_Phaser$State) {
  _inherits(GameState, _Phaser$State);

  function GameState() {
    _classCallCheck(this, GameState);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(GameState).apply(this, arguments));
  }

  _createClass(GameState, [{
    key: 'create',
    value: function create() {
      //Get the dimensions of the tile we are using
      this.game.tileWidth = this.game.cache.getImage('tile').width;
      this.game.tileHeight = this.game.cache.getImage('tile').height;
      //The spacing for the initial platforms
      this.game.spacing = 300;
      //Set the background colour to blue
      this.game.stage.backgroundColor = '479cde';

      //Enable the Arcade physics system
      this.game.physics.startSystem(Phaser.Physics.ARCADE);

      //add new player
      this.player = new _Player2.default(this.game, this.game.world.centerX, this.game.world.height - (this.spacing * 2 + 3 * this.tileHeight), 'player');
      this.game.add.existing(this.player);

      //Add a platforms group to hold all of our tiles, and create a bunch of them
      this.platforms = this.game.add.group();
      this.platforms.enableBody = true;
      this.platforms.createMultiple(250, 'tile');

      var terrain = new _Terrain2.default(this.game, this.platforms);
      //Create the inital on screen platforms
      terrain.initPlatforms();
      this.game.time.events.loop(2000, terrain.addPlatform, this);

      //Enable cursor keys so we can create some controls
      this.cursors = this.game.input.keyboard.createCursorKeys();
      var scoreFont = "100px Arial";
      this.scoreText = new _ScoreText2.default(this.game, this.game.world.centerX, 100, "0", { font: scoreFont, fill: "#fff" });
      this.game.add.existing(this.scoreText);
    }
  }, {
    key: 'preload',
    value: function preload() {
      this.game.load.image('tile', 'res/tile.png');
      this.game.load.image('player', 'res/player.png');
    }
  }, {
    key: 'update',
    value: function update() {
      //Make the sprite collide with the ground layer
      this.game.physics.arcade.collide(this.player, this.platforms);
      //Check if the player is touching the bottom
      //console.log(this.player.body.position)
      if (this.player.body.position.y >= this.game.world.height - this.player.body.height) {
        this.game.gameOver();
      }
      this.player.handleMove(this.cursors);
      this.scoreText.render(this.game.score);
    }
  }]);

  return GameState;
}(Phaser.State);

exports.default = GameState;

},{"objects/Player":2,"objects/ScoreText":3,"objects/Terrain":4}]},{},[1])
//# sourceMappingURL=first-game.js.map

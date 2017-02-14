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

var MapGenerator = function (_Phaser$Game) {
  _inherits(MapGenerator, _Phaser$Game);

  function MapGenerator() {
    _classCallCheck(this, MapGenerator);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MapGenerator).call(this, 800, 600, Phaser.AUTO, 'content', null));

    _this.transparent = true;
    _this.state.add('GameState', _GameState2.default, false);
    _this.state.start('GameState');
    return _this;
  }

  return MapGenerator;
}(Phaser.Game);

new MapGenerator();

},{"states/GameState":7}],2:[function(require,module,exports){
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

var Character = function (_Phaser$Sprite) {
    _inherits(Character, _Phaser$Sprite);

    function Character(game, x, y, key, frame) {
        _classCallCheck(this, Character);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Character).call(this, game, x, y, key, frame));

        game.physics.arcade.enable(_this);
        _this.scale.setTo(0.25, 0.25);
        //this.scale.setTo(0.5, 0.5);
        _this.cursors = game.input.keyboard.createCursorKeys();
        //this.body.gravity.y = 600;
        return _this;
    }

    _createClass(Character, [{
        key: "update",
        value: function update() {
            this.body.velocity.x = 0;
            this.body.velocity.y = 0;

            if (this.cursors.left.isDown) {
                this.body.velocity.x = -200;
            } else if (this.cursors.right.isDown) {
                this.body.velocity.x = 200;
            }

            if (this.cursors.up.isDown) {
                this.body.velocity.y = -200;
            } else if (this.cursors.down.isDown) {
                this.body.velocity.y = 200;
            }
        }
    }]);

    return Character;
}(Phaser.Sprite);

exports.default = Character;

},{}],3:[function(require,module,exports){
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

var Color = "#473B3B";
var Directions = ["vertical", "horizontal"];

var Corridor = function (_Phaser$Sprite) {
  _inherits(Corridor, _Phaser$Sprite);

  function Corridor(game, x, y, width, height) {
    var direction = arguments.length <= 5 || arguments[5] === undefined ? "vertical" : arguments[5];

    _classCallCheck(this, Corridor);

    var bmd = game.add.bitmapData(width, height);
    // draw to the canvas context like normal
    bmd.ctx.beginPath();
    bmd.ctx.rect(0, 0, width, height);
    bmd.ctx.fillStyle = Color;
    bmd.ctx.fill();

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Corridor).call(this, game, x, y, bmd));

    _this.center = { x: x + width / 2, y: y + height / 2 };
    _this.name = "corridor";
    return _this;
  }

  _createClass(Corridor, [{
    key: "overlapRoom",
    value: function overlapRoom(room) {
      if (this.x + this.width < room.x) return false; // a is left of b
      if (this.x > room.x + room.width) return false; // a is right of b
      if (this.y + this.height < room.y) return false; // a is above b
      if (this.y > room.y + room.height) return false; // a is below b
      return true; // boxes overlap
    }
  }]);

  return Corridor;
}(Phaser.Sprite);

exports.default = Corridor;

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

var Color = "#473B3B";

var Room = function (_Phaser$Sprite) {
  _inherits(Room, _Phaser$Sprite);

  function Room(game, x, y, width, height) {
    _classCallCheck(this, Room);

    var bmd = game.add.bitmapData(width, height);
    // draw to the canvas context like normal
    bmd.ctx.beginPath();
    bmd.ctx.rect(0, 0, width, height);
    bmd.ctx.fillStyle = Color;
    bmd.ctx.fill();

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Room).call(this, game, x, y, bmd));

    _this.center = { x: x + width / 2, y: y + height / 2 };
    _this.name = "room";
    return _this;
  }

  _createClass(Room, [{
    key: "overlapRoom",
    value: function overlapRoom(room) {
      if (this.x + this.width < room.x) return false; // a is left of b
      if (this.x > room.x + room.width) return false; // a is right of b
      if (this.y + this.height < room.y) return false; // a is above b
      if (this.y > room.y + room.height) return false; // a is below b
      return true; // boxes overlap
    }
  }]);

  return Room;
}(Phaser.Sprite);

exports.default = Room;

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

var _Room = require('./Room');

var _Room2 = _interopRequireDefault(_Room);

var _Corridor = require('./Corridor');

var _Corridor2 = _interopRequireDefault(_Corridor);

var _utils = require('./utils');

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

var CorridorHeight = 50;
var CorridorWidth = 50;
var MaxRoom = 10;
var MinRoomSize = 150;
var MaxRoomSize = 100;

var MapWidth = 1500;
var MapHeight = 800;

var Dungeon = function (_Phaser$Group) {
  _inherits(Dungeon, _Phaser$Group);

  function Dungeon(game, parent, name, addToStage, enableBody, physicsBodyType) {
    _classCallCheck(this, Dungeon);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Dungeon).call(this, game, parent, name, false, true, Phaser.Physics.ARCADE));

    var _loop = function _loop(i) {
      var width = MinRoomSize + Math.random() * (MaxRoomSize - MinRoomSize + 1);
      var height = MinRoomSize + Math.random() * (MaxRoomSize - MinRoomSize + 1);
      var x = Math.random() * (MapWidth - width - 1) + 1;
      var y = Math.random() * (MapHeight - height - 1) + 1;

      var newRoom = new _Room2.default(game, x, y, width, height);
      var failed = false;
      _this.children.some(function (child) {
        failed = newRoom.overlapRoom(child);
        if (failed) {
          //exit le loop
          return true;
        }
      });
      if (!failed) {
        // local function to carve out new room
        _this.createRoom(newRoom);
        var newCenter = newRoom.center;
        if (_this.rooms().length > 1) {
          var prevRoom = _this.findLastRoom(newRoom);
          var prevCenter = prevRoom.center;
          var rng = Math.random() * 2;
          if (rng >= 1) {
            _this.horizontalCorridor(game, prevRoom, newRoom);
            _this.verticalCorridor(game, prevRoom, newRoom, false);
          } else {
            _this.verticalCorridor(game, prevRoom, newRoom);
            _this.horizontalCorridor(game, prevRoom, newRoom, false);
          }
        }
      }
    };

    for (var i = 0; i < MaxRoom; i++) {
      _loop(i);
    }
    return _this;
  }

  _createClass(Dungeon, [{
    key: 'rooms',
    value: function rooms() {
      var newRoom = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

      return this.children.filter(function (child) {
        return child.name === "room" && child != newRoom;
      });
    }
  }, {
    key: 'findLastRoom',
    value: function findLastRoom(newRoom) {
      var rooms = this.rooms(newRoom);
      return rooms[rooms.length - 1];
    }
  }, {
    key: 'createRoom',
    value: function createRoom(room) {
      this.add(room);
    }
  }, {
    key: 'horizontalCorridor',
    value: function horizontalCorridor(game, prevRoom, newRoom) {
      var first = arguments.length <= 3 || arguments[3] === undefined ? true : arguments[3];

      var x1 = Math.min(prevRoom.center.x, newRoom.center.x);
      var x2 = Math.max(prevRoom.center.x, newRoom.center.x);
      var y = first ? prevRoom.center.y : newRoom.center.y;
      var width = x2 - x1;
      var corridor = new _Corridor2.default(game, x1, y - CorridorHeight / 2, width, CorridorHeight);
      this.add(corridor);
    }
  }, {
    key: 'verticalCorridor',
    value: function verticalCorridor(game, prevRoom, newRoom) {
      var first = arguments.length <= 3 || arguments[3] === undefined ? true : arguments[3];

      var y1 = Math.min(prevRoom.center.y, newRoom.center.y);
      var y2 = Math.max(prevRoom.center.y, newRoom.center.y);
      var x = first ? prevRoom.center.x : newRoom.center.x;
      var height = y2 - y1;
      var corridor = new _Corridor2.default(game, x - CorridorWidth / 2, y1, CorridorWidth, height);
      this.add(corridor);
    }
  }, {
    key: 'getInitialRoom',
    value: function getInitialRoom() {
      return this.rooms()[0];
    }
  }, {
    key: 'collide',
    value: function collide(character) {
      var collide = false;
      this.children.forEach(function (child) {
        if ((0, _utils.isInside)(character, child)) {
          collide = true;
        }
      });
      return collide;
    }
  }]);

  return Dungeon;
}(Phaser.Group);

exports.default = Dungeon;

},{"./Corridor":3,"./Room":4,"./utils":6}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isInside = isInside;
exports.overlap = overlap;
exports.overlapWithDifference = overlapWithDifference;
function isInside(compared, comparator) {
  var rectCompared = { x: compared.x, y: compared.y, x2: compared.x + compared.width, y2: compared.y + compared.height };
  var rectComparator = { x: comparator.x, y: comparator.y, x2: comparator.x + comparator.width, y2: comparator.y + comparator.height };

  return rectCompared.x > rectComparator.x && rectCompared.y > rectComparator.y && rectCompared.x2 < rectComparator.x2 && rectCompared.y2 < rectComparator.y2;
}

function overlap(box1, box2) {
  if (box1.x + box1.width < box2.x) return false; // a is left of b
  if (box1.x > box2.x + box2.width) return false; // a is right of b
  if (box1.y + box1.height < box2.y) return false; // a is above b
  if (box1.y > box2.y + box2.height) return false; // a is below b
  return true; // boxes overlap
}

function overlapWithDifference(box1, box2) {
  var output = {};
  output.x = Math.max(box1.x, box2.x);
  output.y = Math.max(box1.y, box2.y);
  output.width = Math.min(box1.right, box2.right) - output.x;
  output.height = Math.min(box1.bottom, box2.bottom) - output.y;
  return [overlap(box1, box2), output];
}

},{}],7:[function(require,module,exports){
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

var _Character = require('object/Character');

var _Character2 = _interopRequireDefault(_Character);

var _dungeon = require('object/dungeon');

var _dungeon2 = _interopRequireDefault(_dungeon);

var _utils = require('object/utils');

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

var PATH = "res/map-generator";

var GameState = function (_Phaser$State) {
  _inherits(GameState, _Phaser$State);

  function GameState() {
    _classCallCheck(this, GameState);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(GameState).apply(this, arguments));
  }

  _createClass(GameState, [{
    key: 'create',
    value: function create() {
      this.game.stage.backgroundColor = "#4488AA";
      this.game.world.setBounds(0, 0, 2000, 2000);
      this.character = new _Character2.default(this.game, 50, 200, 'Character', 0);
      this.dungeon = new _dungeon2.default(this.game);
      var roomPosition = this.dungeon.getInitialRoom().center;
      this.character.position.setTo(roomPosition.x, roomPosition.y);
      this.game.add.existing(this.character);
      this.game.camera.follow(this.character);
    }
  }, {
    key: 'update',
    value: function update() {
      if (!this.dungeon.collide(this.character)) {
        this.character.x = this.character.oldPosition.x;
        this.character.y = this.character.oldPosition.y;
      }
      this.character.oldPosition = { x: this.character.position.x, y: this.character.position.y };
    }
  }, {
    key: 'preload',
    value: function preload() {
      this.game.load.image('Character', PATH + '/character.png');
    }
  }]);

  return GameState;
}(Phaser.State);

exports.default = GameState;

},{"object/Character":2,"object/dungeon":5,"object/utils":6}]},{},[1])
//# sourceMappingURL=map-generator.js.map

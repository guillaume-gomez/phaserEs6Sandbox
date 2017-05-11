(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
/*
visibility_polygon.js version 1.9

This code is released into the public domain - attribution is appreciated but not required.
Made by Byron Knoll.

https://github.com/byronknoll/visibility-polygon-js
Demo: http://www.byronknoll.com/visibility.html

This library can be used to construct a visibility polygon for a set of line segments.

The time complexity of this implementation is O(N log N) (where N is the total number of line segments). This is the optimal time complexity for this problem.

The following functions should be useful:

1) VisibilityPolygon.compute(position, segments)
  Computes a visibility polygon. O(N log N) time complexity (where N is the number of line segments).
  Arguments:
    position - The location of the observer. If the observer is not completely surrounded by line segments, an outer bounding-box will be automatically created (so that the visibility polygon does not extend to infinity).
    segments - A list of line segments. Each line segment should be a list of two points. Each point should be a list of two coordinates. Line segments can not intersect each other. Overlapping vertices are OK, but it is not OK if a vertex is touching the middle of a line segment. Use the "breakIntersections" function to fix intersecting line segments.
  Returns: The visibility polygon (in clockwise vertex order).

2) VisibilityPolygon.computeViewport(position, segments, viewportMinCorner, viewportMaxCorner)
  Computes a visibility polygon within the given viewport. This can be faster than the "compute" function if there are many segments outside of the viewport.
  Arguments:
    position - The location of the observer. Must be within the viewport.
    segments - A list of line segments. Line segments can not intersect each other. It is OK if line segments intersect the viewport.
    viewportMinCorner - The minimum X and Y coordinates of the viewport.
    viewportMaxCorner - The maximum X and Y coordinates of the viewport.
  Returns: The visibility polygon within the viewport (in clockwise vertex order).

3) VisibilityPolygon.inPolygon(position, polygon)
  Calculates whether a point is within a polygon. O(N) time complexity (where N is the number of points in the polygon).
  Arguments:
    position - The point to check: a list of two coordinates.
    polygon - The polygon to check: a list of points. The polygon can be specified in either clockwise or counterclockwise vertex order.
  Returns: True if "position" is within the polygon.

4) VisibilityPolygon.convertToSegments(polygons)
  Converts the given polygons to list of line segments. O(N) time complexity (where N is the number of polygons).
  Arguments: a list of polygons (in either clockwise or counterclockwise vertex order). Each polygon should be a list of points. Each point should be a list of two coordinates.
  Returns: a list of line segments.

5) VisibilityPolygon.breakIntersections(segments)
  Breaks apart line segments so that none of them intersect. O(N^2) time complexity (where N is the number of line segments).
  Arguments: a list of line segments. Each line segment should be a list of two points. Each point should be a list of two coordinates.
  Returns: a list of line segments.

Example code:

var polygons = [];
polygons.push([[-1,-1],[501,-1],[501,501],[-1,501]]);
polygons.push([[250,100],[260,140],[240,140]]);
var segments = VisibilityPolygon.convertToSegments(polygons);
segments = VisibilityPolygon.breakIntersections(segments);
var position = [60, 60];
if (VisibilityPolygon.inPolygon(position, polygons[0])) {
  var visibility = VisibilityPolygon.compute(position, segments);
}
var viewportVisibility = VisibilityPolygon.computeViewport(position, segments, [50, 50], [450, 450]);

*/

function VisibilityPolygon() {};

VisibilityPolygon.compute = function (position, segments) {
	var bounded = [];
	var minX = position[0];
	var minY = position[1];
	var maxX = position[0];
	var maxY = position[1];
	for (var i = 0; i < segments.length; ++i) {
		for (var j = 0; j < 2; ++j) {
			minX = Math.min(minX, segments[i][j][0]);
			minY = Math.min(minY, segments[i][j][1]);
			maxX = Math.max(maxX, segments[i][j][0]);
			maxY = Math.max(maxY, segments[i][j][1]);
		}
		bounded.push([[segments[i][0][0], segments[i][0][1]], [segments[i][1][0], segments[i][1][1]]]);
	}
	--minX;
	--minY;
	++maxX;
	++maxY;
	bounded.push([[minX, minY], [maxX, minY]]);
	bounded.push([[maxX, minY], [maxX, maxY]]);
	bounded.push([[maxX, maxY], [minX, maxY]]);
	bounded.push([[minX, maxY], [minX, minY]]);
	var polygon = [];
	var sorted = VisibilityPolygon.sortPoints(position, bounded);
	var map = new Array(bounded.length);
	for (var _i = 0; _i < map.length; ++_i) {
		map[_i] = -1;
	}var heap = [];
	var start = [position[0] + 1, position[1]];
	for (var _i2 = 0; _i2 < bounded.length; ++_i2) {
		var a1 = VisibilityPolygon.angle(bounded[_i2][0], position);
		var a2 = VisibilityPolygon.angle(bounded[_i2][1], position);
		var active = false;
		if (a1 > -180 && a1 <= 0 && a2 <= 180 && a2 >= 0 && a2 - a1 > 180) active = true;
		if (a2 > -180 && a2 <= 0 && a1 <= 180 && a1 >= 0 && a1 - a2 > 180) active = true;
		if (active) {
			VisibilityPolygon.insert(_i2, heap, position, bounded, start, map);
		}
	}
	for (var _i3 = 0; _i3 < sorted.length;) {
		var extend = false;
		var shorten = false;
		var orig = _i3;
		var vertex = bounded[sorted[_i3][0]][sorted[_i3][1]];
		var old_segment = heap[0];
		do {
			if (map[sorted[_i3][0]] != -1) {
				if (sorted[_i3][0] == old_segment) {
					extend = true;
					vertex = bounded[sorted[_i3][0]][sorted[_i3][1]];
				}
				VisibilityPolygon.remove(map[sorted[_i3][0]], heap, position, bounded, vertex, map);
			} else {
				VisibilityPolygon.insert(sorted[_i3][0], heap, position, bounded, vertex, map);
				if (heap[0] != old_segment) {
					shorten = true;
				}
			}
			++_i3;
			if (_i3 == sorted.length) break;
		} while (sorted[_i3][2] < sorted[orig][2] + VisibilityPolygon.epsilon());

		if (extend) {
			polygon.push(vertex);
			var cur = VisibilityPolygon.intersectLines(bounded[heap[0]][0], bounded[heap[0]][1], position, vertex);
			if (!VisibilityPolygon.equal(cur, vertex)) polygon.push(cur);
		} else if (shorten) {
			polygon.push(VisibilityPolygon.intersectLines(bounded[old_segment][0], bounded[old_segment][1], position, vertex));
			polygon.push(VisibilityPolygon.intersectLines(bounded[heap[0]][0], bounded[heap[0]][1], position, vertex));
		}
	}
	return polygon;
};

VisibilityPolygon.computeViewport = function (position, segments, viewportMinCorner, viewportMaxCorner) {
	var brokenSegments = [];
	var viewport = [[viewportMinCorner[0], viewportMinCorner[1]], [viewportMaxCorner[0], viewportMinCorner[1]], [viewportMaxCorner[0], viewportMaxCorner[1]], [viewportMinCorner[0], viewportMaxCorner[1]]];
	for (var i = 0; i < segments.length; ++i) {
		if (segments[i][0][0] < viewportMinCorner[0] && segments[i][1][0] < viewportMinCorner[0]) continue;
		if (segments[i][0][1] < viewportMinCorner[1] && segments[i][1][1] < viewportMinCorner[1]) continue;
		if (segments[i][0][0] > viewportMaxCorner[0] && segments[i][1][0] > viewportMaxCorner[0]) continue;
		if (segments[i][0][1] > viewportMaxCorner[1] && segments[i][1][1] > viewportMaxCorner[1]) continue;
		var intersections = [];
		for (var j = 0; j < viewport.length; ++j) {
			var k = j + 1;
			if (k == viewport.length) k = 0;
			if (VisibilityPolygon.doLineSegmentsIntersect(segments[i][0][0], segments[i][0][1], segments[i][1][0], segments[i][1][1], viewport[j][0], viewport[j][1], viewport[k][0], viewport[k][1])) {
				var intersect = VisibilityPolygon.intersectLines(segments[i][0], segments[i][1], viewport[j], viewport[k]);
				if (intersect.length != 2) continue;
				if (VisibilityPolygon.equal(intersect, segments[i][0]) || VisibilityPolygon.equal(intersect, segments[i][1])) continue;
				intersections.push(intersect);
			}
		}
		var start = [segments[i][0][0], segments[i][0][1]];
		while (intersections.length > 0) {
			var endIndex = 0;
			var endDis = VisibilityPolygon.distance(start, intersections[0]);
			for (var _j = 1; _j < intersections.length; ++_j) {
				var dis = VisibilityPolygon.distance(start, intersections[_j]);
				if (dis < endDis) {
					endDis = dis;
					endIndex = _j;
				}
			}
			brokenSegments.push([[start[0], start[1]], [intersections[endIndex][0], intersections[endIndex][1]]]);
			start[0] = intersections[endIndex][0];
			start[1] = intersections[endIndex][1];
			intersections.splice(endIndex, 1);
		}
		brokenSegments.push([start, [segments[i][1][0], segments[i][1][1]]]);
	}

	var viewportSegments = [];
	for (var _i4 = 0; _i4 < brokenSegments.length; ++_i4) {
		if (VisibilityPolygon.inViewport(brokenSegments[_i4][0], viewportMinCorner, viewportMaxCorner) && VisibilityPolygon.inViewport(brokenSegments[_i4][1], viewportMinCorner, viewportMaxCorner)) {
			viewportSegments.push([[brokenSegments[_i4][0][0], brokenSegments[_i4][0][1]], [brokenSegments[_i4][1][0], brokenSegments[_i4][1][1]]]);
		}
	}
	var eps = VisibilityPolygon.epsilon() * 10;
	viewportSegments.push([[viewportMinCorner[0] - eps, viewportMinCorner[1] - eps], [viewportMaxCorner[0] + eps, viewportMinCorner[1] - eps]]);
	viewportSegments.push([[viewportMaxCorner[0] + eps, viewportMinCorner[1] - eps], [viewportMaxCorner[0] + eps, viewportMaxCorner[1] + eps]]);
	viewportSegments.push([[viewportMaxCorner[0] + eps, viewportMaxCorner[1] + eps], [viewportMinCorner[0] - eps, viewportMaxCorner[1] + eps]]);
	viewportSegments.push([[viewportMinCorner[0] - eps, viewportMaxCorner[1] + eps], [viewportMinCorner[0] - eps, viewportMinCorner[1] - eps]]);
	return VisibilityPolygon.compute(position, viewportSegments);
};

VisibilityPolygon.inViewport = function (position, viewportMinCorner, viewportMaxCorner) {
	if (position[0] < viewportMinCorner[0] - VisibilityPolygon.epsilon()) return false;
	if (position[1] < viewportMinCorner[1] - VisibilityPolygon.epsilon()) return false;
	if (position[0] > viewportMaxCorner[0] + VisibilityPolygon.epsilon()) return false;
	if (position[1] > viewportMaxCorner[1] + VisibilityPolygon.epsilon()) return false;
	return true;
};

VisibilityPolygon.inPolygon = function (position, polygon) {
	var val = polygon[0][0];
	for (var i = 0; i < polygon.length; ++i) {
		val = Math.min(polygon[i][0], val);
		val = Math.min(polygon[i][1], val);
	}
	var edge = [val - 1, val - 1];
	var parity = 0;
	for (var _i5 = 0; _i5 < polygon.length; ++_i5) {
		var j = _i5 + 1;
		if (j == polygon.length) j = 0;
		if (VisibilityPolygon.doLineSegmentsIntersect(edge[0], edge[1], position[0], position[1], polygon[_i5][0], polygon[_i5][1], polygon[j][0], polygon[j][1])) {
			var intersect = VisibilityPolygon.intersectLines(edge, position, polygon[_i5], polygon[j]);
			if (VisibilityPolygon.equal(position, intersect)) return true;
			if (VisibilityPolygon.equal(intersect, polygon[_i5])) {
				if (VisibilityPolygon.angle2(position, edge, polygon[j]) < 180) ++parity;
			} else if (VisibilityPolygon.equal(intersect, polygon[j])) {
				if (VisibilityPolygon.angle2(position, edge, polygon[_i5]) < 180) ++parity;
			} else {
				++parity;
			}
		}
	}
	return parity % 2 != 0;
};

VisibilityPolygon.convertToSegments = function (polygons) {
	var segments = [];
	for (var i = 0; i < polygons.length; ++i) {
		for (var j = 0; j < polygons[i].length; ++j) {
			var k = j + 1;
			if (k == polygons[i].length) k = 0;
			segments.push([[polygons[i][j][0], polygons[i][j][1]], [polygons[i][k][0], polygons[i][k][1]]]);
		}
	}
	return segments;
};

VisibilityPolygon.breakIntersections = function (segments) {
	var output = [];
	for (var i = 0; i < segments.length; ++i) {
		var intersections = [];
		for (var j = 0; j < segments.length; ++j) {
			if (i == j) continue;
			if (VisibilityPolygon.doLineSegmentsIntersect(segments[i][0][0], segments[i][0][1], segments[i][1][0], segments[i][1][1], segments[j][0][0], segments[j][0][1], segments[j][1][0], segments[j][1][1])) {
				var intersect = VisibilityPolygon.intersectLines(segments[i][0], segments[i][1], segments[j][0], segments[j][1]);
				if (intersect.length != 2) continue;
				if (VisibilityPolygon.equal(intersect, segments[i][0]) || VisibilityPolygon.equal(intersect, segments[i][1])) continue;
				intersections.push(intersect);
			}
		}
		var start = [segments[i][0][0], segments[i][0][1]];
		while (intersections.length > 0) {
			var endIndex = 0;
			var endDis = VisibilityPolygon.distance(start, intersections[0]);
			for (var _j2 = 1; _j2 < intersections.length; ++_j2) {
				var dis = VisibilityPolygon.distance(start, intersections[_j2]);
				if (dis < endDis) {
					endDis = dis;
					endIndex = _j2;
				}
			}
			output.push([[start[0], start[1]], [intersections[endIndex][0], intersections[endIndex][1]]]);
			start[0] = intersections[endIndex][0];
			start[1] = intersections[endIndex][1];
			intersections.splice(endIndex, 1);
		}
		output.push([start, [segments[i][1][0], segments[i][1][1]]]);
	}
	return output;
};

VisibilityPolygon.epsilon = function () {
	return 0.0000001;
};

VisibilityPolygon.equal = function (a, b) {
	if (Math.abs(a[0] - b[0]) < VisibilityPolygon.epsilon() && Math.abs(a[1] - b[1]) < VisibilityPolygon.epsilon()) return true;
	return false;
};

VisibilityPolygon.remove = function (index, heap, position, segments, destination, map) {
	map[heap[index]] = -1;
	if (index == heap.length - 1) {
		heap.pop();
		return;
	}
	heap[index] = heap.pop();
	map[heap[index]] = index;
	var cur = index;
	var parentNode = VisibilityPolygon.parent(cur);
	if (cur != 0 && VisibilityPolygon.lessThan(heap[cur], heap[parentNode], position, segments, destination)) {
		while (cur > 0) {
			var parent = VisibilityPolygon.parent(cur);
			if (!VisibilityPolygon.lessThan(heap[cur], heap[parent], position, segments, destination)) {
				break;
			}
			map[heap[parentNode]] = cur;
			map[heap[cur]] = parentNode;
			var temp = heap[cur];
			heap[cur] = heap[parentNode];
			heap[parentNode] = temp;
			cur = parentNode;
		}
	} else {
		while (true) {
			var left = VisibilityPolygon.child(cur);
			var right = left + 1;
			if (left < heap.length && VisibilityPolygon.lessThan(heap[left], heap[cur], position, segments, destination) && (right == heap.length || VisibilityPolygon.lessThan(heap[left], heap[right], position, segments, destination))) {
				map[heap[left]] = cur;
				map[heap[cur]] = left;
				var _temp = heap[left];
				heap[left] = heap[cur];
				heap[cur] = _temp;
				cur = left;
			} else if (right < heap.length && VisibilityPolygon.lessThan(heap[right], heap[cur], position, segments, destination)) {
				map[heap[right]] = cur;
				map[heap[cur]] = right;
				var _temp2 = heap[right];
				heap[right] = heap[cur];
				heap[cur] = _temp2;
				cur = right;
			} else break;
		}
	}
};

VisibilityPolygon.insert = function (index, heap, position, segments, destination, map) {
	var intersect = VisibilityPolygon.intersectLines(segments[index][0], segments[index][1], position, destination);
	if (intersect.length == 0) return;
	var cur = heap.length;
	heap.push(index);
	map[index] = cur;
	while (cur > 0) {
		var parent = VisibilityPolygon.parent(cur);
		if (!VisibilityPolygon.lessThan(heap[cur], heap[parent], position, segments, destination)) {
			break;
		}
		map[heap[parent]] = cur;
		map[heap[cur]] = parent;
		var temp = heap[cur];
		heap[cur] = heap[parent];
		heap[parent] = temp;
		cur = parent;
	}
};

VisibilityPolygon.lessThan = function (index1, index2, position, segments, destination) {
	var inter1 = VisibilityPolygon.intersectLines(segments[index1][0], segments[index1][1], position, destination);
	var inter2 = VisibilityPolygon.intersectLines(segments[index2][0], segments[index2][1], position, destination);
	if (!VisibilityPolygon.equal(inter1, inter2)) {
		var d1 = VisibilityPolygon.distance(inter1, position);
		var d2 = VisibilityPolygon.distance(inter2, position);
		return d1 < d2;
	}
	var end1 = 0;
	if (VisibilityPolygon.equal(inter1, segments[index1][0])) end1 = 1;
	var end2 = 0;
	if (VisibilityPolygon.equal(inter2, segments[index2][0])) end2 = 1;
	var a1 = VisibilityPolygon.angle2(segments[index1][end1], inter1, position);
	var a2 = VisibilityPolygon.angle2(segments[index2][end2], inter2, position);
	if (a1 < 180) {
		if (a2 > 180) return true;
		return a2 < a1;
	}
	return a1 < a2;
};

VisibilityPolygon.parent = function (index) {
	return Math.floor((index - 1) / 2);
};

VisibilityPolygon.child = function (index) {
	return 2 * index + 1;
};

VisibilityPolygon.angle2 = function (a, b, c) {
	var a1 = VisibilityPolygon.angle(a, b);
	var a2 = VisibilityPolygon.angle(b, c);
	var a3 = a1 - a2;
	if (a3 < 0) a3 += 360;
	if (a3 > 360) a3 -= 360;
	return a3;
};

VisibilityPolygon.sortPoints = function (position, segments) {
	var points = new Array(segments.length * 2);
	for (var i = 0; i < segments.length; ++i) {
		for (var j = 0; j < 2; ++j) {
			var a = VisibilityPolygon.angle(segments[i][j], position);
			points[2 * i + j] = [i, j, a];
		}
	}
	points.sort(function (a, b) {
		return a[2] - b[2];
	});
	return points;
};

VisibilityPolygon.angle = function (a, b) {
	return Math.atan2(b[1] - a[1], b[0] - a[0]) * 180 / Math.PI;
};

VisibilityPolygon.intersectLines = function (a1, a2, b1, b2) {
	var dbx = b2[0] - b1[0];
	var dby = b2[1] - b1[1];
	var dax = a2[0] - a1[0];
	var day = a2[1] - a1[1];

	var u_b = dby * dax - dbx * day;
	if (u_b != 0) {
		var ua = (dbx * (a1[1] - b1[1]) - dby * (a1[0] - b1[0])) / u_b;
		return [a1[0] - ua * -dax, a1[1] - ua * -day];
	}
	return [];
};

VisibilityPolygon.distance = function (a, b) {
	var dx = a[0] - b[0];
	var dy = a[1] - b[1];
	return dx * dx + dy * dy;
};

VisibilityPolygon.isOnSegment = function (xi, yi, xj, yj, xk, yk) {
	return (xi <= xk || xj <= xk) && (xk <= xi || xk <= xj) && (yi <= yk || yj <= yk) && (yk <= yi || yk <= yj);
};

VisibilityPolygon.computeDirection = function (xi, yi, xj, yj, xk, yk) {
	var a = (xk - xi) * (yj - yi);
	var b = (xj - xi) * (yk - yi);
	return a < b ? -1 : a > b ? 1 : 0;
};

VisibilityPolygon.doLineSegmentsIntersect = function (x1, y1, x2, y2, x3, y3, x4, y4) {
	var d1 = VisibilityPolygon.computeDirection(x3, y3, x4, y4, x1, y1);
	var d2 = VisibilityPolygon.computeDirection(x3, y3, x4, y4, x2, y2);
	var d3 = VisibilityPolygon.computeDirection(x1, y1, x2, y2, x3, y3);
	var d4 = VisibilityPolygon.computeDirection(x1, y1, x2, y2, x4, y4);
	return (d1 > 0 && d2 < 0 || d1 < 0 && d2 > 0) && (d3 > 0 && d4 < 0 || d3 < 0 && d4 > 0) || d1 == 0 && VisibilityPolygon.isOnSegment(x3, y3, x4, y4, x1, y1) || d2 == 0 && VisibilityPolygon.isOnSegment(x3, y3, x4, y4, x2, y2) || d3 == 0 && VisibilityPolygon.isOnSegment(x1, y1, x2, y2, x3, y3) || d4 == 0 && VisibilityPolygon.isOnSegment(x1, y1, x2, y2, x4, y4);
};

exports.default = VisibilityPolygon;

},{}],2:[function(require,module,exports){
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

var Game = function (_Phaser$Game) {
  _inherits(Game, _Phaser$Game);

  function Game() {
    _classCallCheck(this, Game);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Game).call(this, 640, 480, Phaser.AUTO, 'content', null));

    _this.state.add('Game', _GameState2.default, false);
    _this.state.start('Game');
    return _this;
  }

  return Game;
}(Phaser.Game);

new Game();

},{"states/GameState":3}],3:[function(require,module,exports){
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

var _visibility_polygon_dev = require('../external/visibility_polygon_dev');

var _visibility_polygon_dev2 = _interopRequireDefault(_visibility_polygon_dev);

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

var CursorRadius = 10;

var GameState = function (_Phaser$State) {
  _inherits(GameState, _Phaser$State);

  function GameState() {
    _classCallCheck(this, GameState);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(GameState).call(this));

    _this.obstaclesCanvas = null;
    _this.lightCanvas = null;
    _this.numBoxes = 5;
    _this.polygons = [];
    _this.moveIndex = null;
    _this.marker = null;
    return _this;
  }

  _createClass(GameState, [{
    key: 'create',
    value: function create() {
      // listener to mouse movement
      this.moveIndex = this.game.input.addMoveCallback(this.move, this);
      // the canvas where we will show the obstaclesCanvas
      this.obstaclesCanvas = this.game.add.graphics(0, 0);
      // line style of obstacle canvas
      this.obstaclesCanvas.lineStyle(4, 0xffffff, 1);
      // the canvas where we will display the scene
      this.lightCanvas = this.game.add.graphics(0, 0);
      // placing some ramdom boxes
      for (var i = 0; i < this.numBoxes; i++) {
        this.randomBox();
      }
      // placing the perimeter box
      this.polygons.push([[-1, -1], [this.game.width + 1, -1], [this.game.width + 1, this.game.height + 1], [-1, this.game.height + 1]]);
      //create marker
      this.marker = this.game.add.graphics();
      this.marker.beginFill(0xff0000);
      this.marker.drawCircle(CursorRadius, CursorRadius, CursorRadius);
      this.marker.endFill();
    }
  }, {
    key: 'update',
    value: function update() {}
  }, {
    key: 'move',
    value: function move() {
      //update marker position
      this.marker.x = this.game.input.activePointer.worldX - CursorRadius;
      this.marker.y = this.game.input.activePointer.worldY - CursorRadius;
      // when the mouse is moved, we determine the new visibility polygon
      var visibility = this.createLightPolygon(this.game.input.worldX, this.game.input.worldY);
      // then we draw it
      this.lightCanvas.clear();
      this.lightCanvas.lineStyle(2, 0xff8800, 1);
      this.lightCanvas.beginFill(0xffff00);
      this.lightCanvas.moveTo(visibility[0][0], visibility[0][1]);
      for (var i = 1; i <= visibility.length; i++) {
        this.lightCanvas.lineTo(visibility[i % visibility.length][0], visibility[i % visibility.length][1]);
      }
      this.lightCanvas.endFill();
    }
  }, {
    key: 'randomBox',
    value: function randomBox() {
      do {
        // drawing boxes with random width, height and upper corner coordinates
        var width = this.game.rnd.between(50, 150);
        var height = this.game.rnd.between(50, 150);
        var startX = this.game.rnd.between(10, this.game.width - 160);
        var startY = this.game.rnd.between(10, this.game.height - 160);
      } while (this.boxesIntersect(startX, startY, width, height));
      // drawing the boxes
      this.obstaclesCanvas.drawRect(startX, startY, width, height);
      // pushing the newly created box into polygons array
      this.polygons.push([[startX, startY], [startX + width, startY], [startX + width, startY + height], [startX, startY + height]]);
    }

    // this is just a function to prevent boxes to insersect or the library won't work

  }, {
    key: 'boxesIntersect',
    value: function boxesIntersect(x, y, w, h) {
      for (var i = 0; i < this.polygons.length; i++) {
        if (x < this.polygons[i][1][0] && x + w > this.polygons[i][0][0] && y < this.polygons[i][3][1] && y + h > this.polygons[i][0][1]) {
          return true;
        }
      }
      return false;
    }

    // and this is how the library generates the visibility polygon starting
    // from an array of polygons and a source point

  }, {
    key: 'createLightPolygon',
    value: function createLightPolygon(x, y) {
      var segments = _visibility_polygon_dev2.default.convertToSegments(this.polygons);
      segments = _visibility_polygon_dev2.default.breakIntersections(segments);
      var position = [x, y];
      if (_visibility_polygon_dev2.default.inPolygon(position, this.polygons[this.polygons.length - 1])) {
        return _visibility_polygon_dev2.default.compute(position, segments);
      }
      return null;
    }
  }]);

  return GameState;
}(Phaser.State);

exports.default = GameState;

},{"../external/visibility_polygon_dev":1}]},{},[2])
//# sourceMappingURL=light-the-map.js.map

// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"perlin.js":[function(require,module,exports) {
var global = arguments[3];
/*
 * A speed-improved perlin and simplex noise algorithms for 2D.
 *
 * Based on example code by Stefan Gustavson (stegu@itn.liu.se).
 * Optimisations by Peter Eastman (peastman@drizzle.stanford.edu).
 * Better rank ordering method by Stefan Gustavson in 2012.
 * Converted to Javascript by Joseph Gentle.
 *
 * Version 2012-03-09
 *
 * This code was placed in the public domain by its original author,
 * Stefan Gustavson. You may use it as you see fit, but
 * attribution is appreciated.
 *
 */
(function (global) {
  var module = global.noise = {};

  function Grad(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  Grad.prototype.dot2 = function (x, y) {
    return this.x * x + this.y * y;
  };

  Grad.prototype.dot3 = function (x, y, z) {
    return this.x * x + this.y * y + this.z * z;
  };

  var grad3 = [new Grad(1, 1, 0), new Grad(-1, 1, 0), new Grad(1, -1, 0), new Grad(-1, -1, 0), new Grad(1, 0, 1), new Grad(-1, 0, 1), new Grad(1, 0, -1), new Grad(-1, 0, -1), new Grad(0, 1, 1), new Grad(0, -1, 1), new Grad(0, 1, -1), new Grad(0, -1, -1)];
  var p = [151, 160, 137, 91, 90, 15, 131, 13, 201, 95, 96, 53, 194, 233, 7, 225, 140, 36, 103, 30, 69, 142, 8, 99, 37, 240, 21, 10, 23, 190, 6, 148, 247, 120, 234, 75, 0, 26, 197, 62, 94, 252, 219, 203, 117, 35, 11, 32, 57, 177, 33, 88, 237, 149, 56, 87, 174, 20, 125, 136, 171, 168, 68, 175, 74, 165, 71, 134, 139, 48, 27, 166, 77, 146, 158, 231, 83, 111, 229, 122, 60, 211, 133, 230, 220, 105, 92, 41, 55, 46, 245, 40, 244, 102, 143, 54, 65, 25, 63, 161, 1, 216, 80, 73, 209, 76, 132, 187, 208, 89, 18, 169, 200, 196, 135, 130, 116, 188, 159, 86, 164, 100, 109, 198, 173, 186, 3, 64, 52, 217, 226, 250, 124, 123, 5, 202, 38, 147, 118, 126, 255, 82, 85, 212, 207, 206, 59, 227, 47, 16, 58, 17, 182, 189, 28, 42, 223, 183, 170, 213, 119, 248, 152, 2, 44, 154, 163, 70, 221, 153, 101, 155, 167, 43, 172, 9, 129, 22, 39, 253, 19, 98, 108, 110, 79, 113, 224, 232, 178, 185, 112, 104, 218, 246, 97, 228, 251, 34, 242, 193, 238, 210, 144, 12, 191, 179, 162, 241, 81, 51, 145, 235, 249, 14, 239, 107, 49, 192, 214, 31, 181, 199, 106, 157, 184, 84, 204, 176, 115, 121, 50, 45, 127, 4, 150, 254, 138, 236, 205, 93, 222, 114, 67, 29, 24, 72, 243, 141, 128, 195, 78, 66, 215, 61, 156, 180]; // To remove the need for index wrapping, double the permutation table length

  var perm = new Array(512);
  var gradP = new Array(512); // This isn't a very good seeding function, but it works ok. It supports 2^16
  // different seed values. Write something better if you need more seeds.

  module.seed = function (seed) {
    if (seed > 0 && seed < 1) {
      // Scale the seed out
      seed *= 65536;
    }

    seed = Math.floor(seed);

    if (seed < 256) {
      seed |= seed << 8;
    }

    for (var i = 0; i < 256; i++) {
      var v;

      if (i & 1) {
        v = p[i] ^ seed & 255;
      } else {
        v = p[i] ^ seed >> 8 & 255;
      }

      perm[i] = perm[i + 256] = v;
      gradP[i] = gradP[i + 256] = grad3[v % 12];
    }
  };

  module.seed(0);
  /*
  for(var i=0; i<256; i++) {
    perm[i] = perm[i + 256] = p[i];
    gradP[i] = gradP[i + 256] = grad3[perm[i] % 12];
  }*/
  // Skewing and unskewing factors for 2, 3, and 4 dimensions

  var F2 = 0.5 * (Math.sqrt(3) - 1);
  var G2 = (3 - Math.sqrt(3)) / 6;
  var F3 = 1 / 3;
  var G3 = 1 / 6; // 2D simplex noise

  module.simplex2 = function (xin, yin) {
    var n0, n1, n2; // Noise contributions from the three corners
    // Skew the input space to determine which simplex cell we're in

    var s = (xin + yin) * F2; // Hairy factor for 2D

    var i = Math.floor(xin + s);
    var j = Math.floor(yin + s);
    var t = (i + j) * G2;
    var x0 = xin - i + t; // The x,y distances from the cell origin, unskewed.

    var y0 = yin - j + t; // For the 2D case, the simplex shape is an equilateral triangle.
    // Determine which simplex we are in.

    var i1, j1; // Offsets for second (middle) corner of simplex in (i,j) coords

    if (x0 > y0) {
      // lower triangle, XY order: (0,0)->(1,0)->(1,1)
      i1 = 1;
      j1 = 0;
    } else {
      // upper triangle, YX order: (0,0)->(0,1)->(1,1)
      i1 = 0;
      j1 = 1;
    } // A step of (1,0) in (i,j) means a step of (1-c,-c) in (x,y), and
    // a step of (0,1) in (i,j) means a step of (-c,1-c) in (x,y), where
    // c = (3-sqrt(3))/6


    var x1 = x0 - i1 + G2; // Offsets for middle corner in (x,y) unskewed coords

    var y1 = y0 - j1 + G2;
    var x2 = x0 - 1 + 2 * G2; // Offsets for last corner in (x,y) unskewed coords

    var y2 = y0 - 1 + 2 * G2; // Work out the hashed gradient indices of the three simplex corners

    i &= 255;
    j &= 255;
    var gi0 = gradP[i + perm[j]];
    var gi1 = gradP[i + i1 + perm[j + j1]];
    var gi2 = gradP[i + 1 + perm[j + 1]]; // Calculate the contribution from the three corners

    var t0 = 0.5 - x0 * x0 - y0 * y0;

    if (t0 < 0) {
      n0 = 0;
    } else {
      t0 *= t0;
      n0 = t0 * t0 * gi0.dot2(x0, y0); // (x,y) of grad3 used for 2D gradient
    }

    var t1 = 0.5 - x1 * x1 - y1 * y1;

    if (t1 < 0) {
      n1 = 0;
    } else {
      t1 *= t1;
      n1 = t1 * t1 * gi1.dot2(x1, y1);
    }

    var t2 = 0.5 - x2 * x2 - y2 * y2;

    if (t2 < 0) {
      n2 = 0;
    } else {
      t2 *= t2;
      n2 = t2 * t2 * gi2.dot2(x2, y2);
    } // Add contributions from each corner to get the final noise value.
    // The result is scaled to return values in the interval [-1,1].


    return 70 * (n0 + n1 + n2);
  }; // 3D simplex noise


  module.simplex3 = function (xin, yin, zin) {
    var n0, n1, n2, n3; // Noise contributions from the four corners
    // Skew the input space to determine which simplex cell we're in

    var s = (xin + yin + zin) * F3; // Hairy factor for 2D

    var i = Math.floor(xin + s);
    var j = Math.floor(yin + s);
    var k = Math.floor(zin + s);
    var t = (i + j + k) * G3;
    var x0 = xin - i + t; // The x,y distances from the cell origin, unskewed.

    var y0 = yin - j + t;
    var z0 = zin - k + t; // For the 3D case, the simplex shape is a slightly irregular tetrahedron.
    // Determine which simplex we are in.

    var i1, j1, k1; // Offsets for second corner of simplex in (i,j,k) coords

    var i2, j2, k2; // Offsets for third corner of simplex in (i,j,k) coords

    if (x0 >= y0) {
      if (y0 >= z0) {
        i1 = 1;
        j1 = 0;
        k1 = 0;
        i2 = 1;
        j2 = 1;
        k2 = 0;
      } else if (x0 >= z0) {
        i1 = 1;
        j1 = 0;
        k1 = 0;
        i2 = 1;
        j2 = 0;
        k2 = 1;
      } else {
        i1 = 0;
        j1 = 0;
        k1 = 1;
        i2 = 1;
        j2 = 0;
        k2 = 1;
      }
    } else {
      if (y0 < z0) {
        i1 = 0;
        j1 = 0;
        k1 = 1;
        i2 = 0;
        j2 = 1;
        k2 = 1;
      } else if (x0 < z0) {
        i1 = 0;
        j1 = 1;
        k1 = 0;
        i2 = 0;
        j2 = 1;
        k2 = 1;
      } else {
        i1 = 0;
        j1 = 1;
        k1 = 0;
        i2 = 1;
        j2 = 1;
        k2 = 0;
      }
    } // A step of (1,0,0) in (i,j,k) means a step of (1-c,-c,-c) in (x,y,z),
    // a step of (0,1,0) in (i,j,k) means a step of (-c,1-c,-c) in (x,y,z), and
    // a step of (0,0,1) in (i,j,k) means a step of (-c,-c,1-c) in (x,y,z), where
    // c = 1/6.


    var x1 = x0 - i1 + G3; // Offsets for second corner

    var y1 = y0 - j1 + G3;
    var z1 = z0 - k1 + G3;
    var x2 = x0 - i2 + 2 * G3; // Offsets for third corner

    var y2 = y0 - j2 + 2 * G3;
    var z2 = z0 - k2 + 2 * G3;
    var x3 = x0 - 1 + 3 * G3; // Offsets for fourth corner

    var y3 = y0 - 1 + 3 * G3;
    var z3 = z0 - 1 + 3 * G3; // Work out the hashed gradient indices of the four simplex corners

    i &= 255;
    j &= 255;
    k &= 255;
    var gi0 = gradP[i + perm[j + perm[k]]];
    var gi1 = gradP[i + i1 + perm[j + j1 + perm[k + k1]]];
    var gi2 = gradP[i + i2 + perm[j + j2 + perm[k + k2]]];
    var gi3 = gradP[i + 1 + perm[j + 1 + perm[k + 1]]]; // Calculate the contribution from the four corners

    var t0 = 0.6 - x0 * x0 - y0 * y0 - z0 * z0;

    if (t0 < 0) {
      n0 = 0;
    } else {
      t0 *= t0;
      n0 = t0 * t0 * gi0.dot3(x0, y0, z0); // (x,y) of grad3 used for 2D gradient
    }

    var t1 = 0.6 - x1 * x1 - y1 * y1 - z1 * z1;

    if (t1 < 0) {
      n1 = 0;
    } else {
      t1 *= t1;
      n1 = t1 * t1 * gi1.dot3(x1, y1, z1);
    }

    var t2 = 0.6 - x2 * x2 - y2 * y2 - z2 * z2;

    if (t2 < 0) {
      n2 = 0;
    } else {
      t2 *= t2;
      n2 = t2 * t2 * gi2.dot3(x2, y2, z2);
    }

    var t3 = 0.6 - x3 * x3 - y3 * y3 - z3 * z3;

    if (t3 < 0) {
      n3 = 0;
    } else {
      t3 *= t3;
      n3 = t3 * t3 * gi3.dot3(x3, y3, z3);
    } // Add contributions from each corner to get the final noise value.
    // The result is scaled to return values in the interval [-1,1].


    return 32 * (n0 + n1 + n2 + n3);
  }; // ##### Perlin noise stuff


  function fade(t) {
    return t * t * t * (t * (t * 6 - 15) + 10);
  }

  function lerp(a, b, t) {
    return (1 - t) * a + t * b;
  } // 2D Perlin Noise


  module.perlin2 = function (x, y) {
    // Find unit grid cell containing point
    var X = Math.floor(x),
        Y = Math.floor(y); // Get relative xy coordinates of point within that cell

    x = x - X;
    y = y - Y; // Wrap the integer cells at 255 (smaller integer period can be introduced here)

    X = X & 255;
    Y = Y & 255; // Calculate noise contributions from each of the four corners

    var n00 = gradP[X + perm[Y]].dot2(x, y);
    var n01 = gradP[X + perm[Y + 1]].dot2(x, y - 1);
    var n10 = gradP[X + 1 + perm[Y]].dot2(x - 1, y);
    var n11 = gradP[X + 1 + perm[Y + 1]].dot2(x - 1, y - 1); // Compute the fade curve value for x

    var u = fade(x); // Interpolate the four results

    return lerp(lerp(n00, n10, u), lerp(n01, n11, u), fade(y));
  }; // 3D Perlin Noise


  module.perlin3 = function (x, y, z) {
    // Find unit grid cell containing point
    var X = Math.floor(x),
        Y = Math.floor(y),
        Z = Math.floor(z); // Get relative xyz coordinates of point within that cell

    x = x - X;
    y = y - Y;
    z = z - Z; // Wrap the integer cells at 255 (smaller integer period can be introduced here)

    X = X & 255;
    Y = Y & 255;
    Z = Z & 255; // Calculate noise contributions from each of the eight corners

    var n000 = gradP[X + perm[Y + perm[Z]]].dot3(x, y, z);
    var n001 = gradP[X + perm[Y + perm[Z + 1]]].dot3(x, y, z - 1);
    var n010 = gradP[X + perm[Y + 1 + perm[Z]]].dot3(x, y - 1, z);
    var n011 = gradP[X + perm[Y + 1 + perm[Z + 1]]].dot3(x, y - 1, z - 1);
    var n100 = gradP[X + 1 + perm[Y + perm[Z]]].dot3(x - 1, y, z);
    var n101 = gradP[X + 1 + perm[Y + perm[Z + 1]]].dot3(x - 1, y, z - 1);
    var n110 = gradP[X + 1 + perm[Y + 1 + perm[Z]]].dot3(x - 1, y - 1, z);
    var n111 = gradP[X + 1 + perm[Y + 1 + perm[Z + 1]]].dot3(x - 1, y - 1, z - 1); // Compute the fade curve value for x, y, z

    var u = fade(x);
    var v = fade(y);
    var w = fade(z); // Interpolate

    return lerp(lerp(lerp(n000, n100, u), lerp(n001, n101, u), w), lerp(lerp(n010, n110, u), lerp(n011, n111, u), w), v);
  };
})(this);
},{}],"utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.move = exports.copy = void 0;

var copy = function copy(target) {
  var re = [];

  for (var i in target) {
    re[i] = target[i];
  }

  return re;
};

exports.copy = copy;

var move = function move(origin, target, duration, after) {
  var fn = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : function (pro) {
    return Math.sqrt(pro, 2);
  };
  if (fn(1) != 1) throw '[moaline-move] The fn must satisfy "fn (1) == 1"'; // 当参数为1时，对应的值也一定要为1

  var st, sp;
  st = performance.now(); // 保存开始时间

  sp = copy(origin); // 保存起点

  var d = {}; // 源与目标之间每一项的距离

  for (var i in origin) {
    d[i] = target[i] - origin[i];
  }

  var frame = function frame(t) {
    var pro = (t - st) / duration; // 当前进程

    if (pro >= 1) {
      return;
    }

    for (var _i in origin) {
      origin[_i] = sp[_i] + fn(pro) * d[_i]; // fn(pro)得出当前时间对应的缓动函数的距离百分比，再乘以总距离
    }

    after(copy(origin), pro);
    requestAnimationFrame(frame);
  };

  frame(st);
};

exports.move = move;
},{}],"wave.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wave = void 0;

var _perlin = require("./perlin");

var _utils = require("./utils");

var wave = function wave(_ref) {
  var dom = _ref.dom,
      _ref$span = _ref.span,
      span = _ref$span === void 0 ? 50 : _ref$span,
      _ref$scale = _ref.scale,
      scale = _ref$scale === void 0 ? 1000 : _ref$scale,
      _ref$speed = _ref.speed,
      speed = _ref$speed === void 0 ? 0.002 : _ref$speed,
      _ref$duration = _ref.duration,
      duration = _ref$duration === void 0 ? 1000 : _ref$duration,
      _ref$zIndex = _ref.zIndex,
      zIndex = _ref$zIndex === void 0 ? -999 : _ref$zIndex,
      _ref$colors = _ref.colors,
      colors = _ref$colors === void 0 ? [{
    r: 212,
    g: 192,
    b: 255
  }, {
    r: 192,
    g: 255,
    b: 244
  }, {
    r: 255,
    g: 192,
    b: 203
  }] : _ref$colors;
  dom.style.position = "relative";
  dom.style.zIndex = 0;
  dom.style.overflow = "hidden";
  var canvas = document.createElement("canvas");
  var context = canvas.getContext("2d");
  canvas.style.position = "absolute";
  canvas.style.zIndex = zIndex;
  canvas.style.top = "-" + parseInt(getComputedStyle(dom)["height"]) * 0.1 + "px";
  canvas.style.left = "-" + parseInt(getComputedStyle(dom)["width"]) * 0.1 + "px";
  canvas.height = parseInt(getComputedStyle(dom)["height"]) * 1.2;
  canvas.width = parseInt(getComputedStyle(dom)["width"]) * 1.2;
  dom.appendChild(canvas);
  var r = span / 2;
  var seed = 0;
  var ci = 0;
  var color = (0, _utils.copy)(colors[ci]);

  function Point(_ref2) {
    var cx = _ref2.cx,
        cy = _ref2.cy;
    this.cx = cx;
    this.cy = cy;
  }

  Point.prototype.init = function () {
    context.beginPath();

    var s = _perlin.noise.simplex3(this.cx / scale, this.cy / scale, seed);

    var sa = Math.abs(s);
    context.strokeStyle = "rgba(".concat(color.r, ", ").concat(color.g, ", ").concat(color.b, ", ").concat(sa, ")");
    context.lineWidth = Math.abs(s) * 8;
    var a = Math.PI * 2 * s;
    var ap = Math.PI + a;
    context.moveTo(this.cx + Math.cos(a) * r, this.cy);
    context.lineTo(this.cx + Math.cos(ap) * r, this.cy + Math.sin(ap) * r);
    context.stroke();
  };

  var points = [];

  function initPoints() {
    for (var y = 0; y < canvas.height; y += span) {
      for (var x = 0; x < canvas.width; x += span) {
        // 这里可能造成绘制的条形超过canvas边界，x < canvas.height即使在canvas的倒数第一行也成立，也会继续向下
        points.push(new Point({
          cx: x + r,
          cy: y + r
        }));
      }
    }
  }

  var p = {
    x: 0,
    y: 0
  };

  function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.translate(p.x, p.y);
    var _ref3 = [0, 0];
    p.x = _ref3[0];
    p.y = _ref3[1];

    for (var _i = 0; _i < points.length; _i++) {
      var i = points[_i];
      i.init();
    }
  }

  var id;

  function animate() {
    draw();
    seed += speed;
    id = requestAnimationFrame(animate);
  }

  initPoints();
  animate();

  function moveE(e) {
    p.x = e.movementX / 50;
    p.y = e.movementY / 50;
  }

  dom.addEventListener("mousemove", moveE);

  function leaveE(e) {
    var _ref4 = [0, 0];
    p.x = _ref4[0];
    p.y = _ref4[1];
  }

  dom.addEventListener("mouseleave", leaveE);

  function resizeE() {
    canvas.height = parseInt(getComputedStyle(dom)["height"]) * 1.2;
    canvas.width = parseInt(getComputedStyle(dom)["width"]) * 1.2;
    canvas.style.top = "-" + parseInt(getComputedStyle(dom)["height"]) * 0.1 + "px";
    canvas.style.left = "-" + parseInt(getComputedStyle(dom)["width"]) * 0.1 + "px";
    initPoints();
  }

  window.addEventListener("resize", resizeE);

  function clickE() {
    var target = (0, _utils.copy)(colors[++ci % colors.length]);
    (0, _utils.move)(color, target, duration);
  }

  dom.addEventListener("click", clickE);
  return {
    canvas: canvas,
    stop: function stop() {
      cancelAnimationFrame(id);
      dom.removeEventListener("mousemove", moveE);
      dom.removeEventListener("mouseleave", leaveE);
      window.removeEventListener("resize", resizeE);
      dom.removeEventListener("click", clickE);
    }
  };
};

exports.wave = wave;
},{"./perlin":"perlin.js","./utils":"utils.js"}],"wind.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wind = void 0;

var _perlin = require("./perlin");

var _utils = require("./utils");

var wind = function wind(_ref) {
  var dom = _ref.dom,
      _ref$span = _ref.span,
      span = _ref$span === void 0 ? 50 : _ref$span,
      _ref$scale = _ref.scale,
      scale = _ref$scale === void 0 ? 200 : _ref$scale,
      _ref$speed = _ref.speed,
      speed = _ref$speed === void 0 ? 0.0001 : _ref$speed,
      _ref$duration = _ref.duration,
      duration = _ref$duration === void 0 ? 1000 : _ref$duration,
      _ref$colors = _ref.colors,
      colors = _ref$colors === void 0 ? [{
    r: 212,
    g: 192,
    b: 255
  }, {
    r: 192,
    g: 255,
    b: 244
  }, {
    r: 255,
    g: 192,
    b: 203
  }] : _ref$colors;
  dom.style.position = "relative";
  dom.style.zIndex = 0;
  dom.style.overflow = "hidden";
  var canvas = document.createElement("canvas");
  var context = canvas.getContext("2d");
  canvas.style.position = "absolute";
  canvas.style.zIndex = "-999";
  canvas.style.top = "-" + parseInt(getComputedStyle(dom)["height"]) * 0.1 + "px";
  canvas.style.left = "-" + parseInt(getComputedStyle(dom)["width"]) * 0.1 + "px";
  canvas.height = parseInt(getComputedStyle(dom)["height"]) * 1.2;
  canvas.width = parseInt(getComputedStyle(dom)["width"]) * 1.2;
  dom.appendChild(canvas);
  var r = span / 2;
  var seed = 0;
  var ci = 0;
  var color = (0, _utils.copy)(colors[ci]);

  function Point(_ref2) {
    var cx = _ref2.cx,
        cy = _ref2.cy;
    this.cx = cx;
    this.cy = cy;
  }

  Point.prototype.line = function () {
    context.beginPath();

    var s = _perlin.noise.simplex3(this.cx / scale, this.cy / scale, seed);

    var sa = Math.abs(s);
    context.strokeStyle = "rgba(".concat(color.r, ", ").concat(color.g, ", ").concat(color.b, ", ").concat(sa, ")");
    context.lineWidth = Math.abs(s) * 8;
    var a = Math.PI * 2 * s;
    var ap = Math.PI + a;
    context.moveTo(this.cx * Math.cos(a), this.cx * Math.sin(a));
    context.lineTo(this.cx * Math.sin(ap), this.cy * Math.cos(ap));
    context.stroke();
  };

  var points = [];

  function initPoints() {
    for (var y = 0; y < canvas.height; y += span) {
      for (var x = 0; x < canvas.width; x += span) {
        // 这里可能造成绘制的条形超过canvas边界，x < canvas.height即使在canvas的倒数第一行也成立，也会继续向下
        points.push(new Point({
          cx: x + r,
          cy: y + r
        }));
      }
    }
  }

  var p = {
    x: 0,
    y: 0
  };

  function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.translate(p.x, p.y);
    var _ref3 = [0, 0];
    p.x = _ref3[0];
    p.y = _ref3[1];

    for (var _i = 0; _i < points.length; _i++) {
      var i = points[_i];
      i.line();
    }
  }

  var id;

  function animate() {
    draw();
    seed += speed;
    id = requestAnimationFrame(animate);
  }

  initPoints();
  animate();

  function moveE(e) {
    p.x = e.movementX / 50;
    p.y = e.movementY / 50;
  }

  dom.addEventListener("mousemove", moveE);

  function leaveE(e) {
    var _ref4 = [0, 0];
    p.x = _ref4[0];
    p.y = _ref4[1];
  }

  dom.addEventListener("mouseleave", leaveE);

  function resizeE() {
    canvas.height = parseInt(getComputedStyle(dom)["height"]) * 1.2;
    canvas.width = parseInt(getComputedStyle(dom)["width"]) * 1.2;
    canvas.style.top = "-" + parseInt(getComputedStyle(dom)["height"]) * 0.1 + "px";
    canvas.style.left = "-" + parseInt(getComputedStyle(dom)["width"]) * 0.1 + "px";
    initPoints();
  }

  window.addEventListener("resize", resizeE);

  function clickE() {
    var target = (0, _utils.copy)(colors[++ci % colors.length]);
    (0, _utils.move)(color, target, duration);
  }

  dom.addEventListener("click", clickE);
  return {
    canvas: canvas,
    stop: function stop() {
      cancelAnimationFrame(id);
      dom.removeEventListener("mousemove", moveE);
      dom.removeEventListener("mouseleave", leaveE);
      window.removeEventListener("resize", resizeE);
      dom.removeEventListener("click", clickE);
    }
  };
};

exports.wind = wind;
},{"./perlin":"perlin.js","./utils":"utils.js"}],"rain.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rain = void 0;

var _perlin = require("./perlin");

var _utils = require("./utils");

var rain = function rain(_ref) {
  var dom = _ref.dom,
      _ref$span = _ref.span,
      span = _ref$span === void 0 ? 50 : _ref$span,
      _ref$scale = _ref.scale,
      scale = _ref$scale === void 0 ? 1000 : _ref$scale,
      _ref$speed = _ref.speed,
      speed = _ref$speed === void 0 ? 0.002 : _ref$speed,
      _ref$duration = _ref.duration,
      duration = _ref$duration === void 0 ? 1000 : _ref$duration,
      _ref$colors = _ref.colors,
      colors = _ref$colors === void 0 ? [{
    r: 212,
    g: 192,
    b: 255
  }, {
    r: 192,
    g: 255,
    b: 244
  }, {
    r: 255,
    g: 192,
    b: 203
  }] : _ref$colors;
  dom.style.position = "relative";
  dom.style.zIndex = 0;
  dom.style.overflow = "hidden";
  var canvas = document.createElement("canvas");
  var context = canvas.getContext("2d");
  canvas.style.position = "absolute";
  canvas.style.zIndex = "-999";
  canvas.style.top = "-" + parseInt(getComputedStyle(dom)["height"]) * 0.1 + "px";
  canvas.style.left = "-" + parseInt(getComputedStyle(dom)["width"]) * 0.1 + "px";
  canvas.height = parseInt(getComputedStyle(dom)["height"]) * 1.2;
  canvas.width = parseInt(getComputedStyle(dom)["width"]) * 1.2;
  dom.appendChild(canvas);
  var r = span / 2;
  var seed = 0;
  var ci = 0;
  var color = (0, _utils.copy)(colors[ci]);

  function Point(_ref2) {
    var cx = _ref2.cx,
        cy = _ref2.cy;
    this.cx = cx;
    this.cy = cy;
  }

  Point.prototype.line = function () {
    context.beginPath();

    var s = _perlin.noise.simplex3(this.cx / scale, this.cy / scale, seed);

    var sa = Math.abs(s);
    context.strokeStyle = "rgba(".concat(color.r, ", ").concat(color.g, ", ").concat(color.b, ", ").concat(sa, ")");
    context.lineWidth = Math.abs(s) * 8;
    var a = Math.PI * 2 * s;
    var ap = Math.PI + a;
    context.moveTo(this.cx + Math.sin(a) * r, this.cy + Math.cos(a) * r);
    context.lineTo(this.cx + Math.cos(ap) * r, this.cy + Math.sin(ap) * r);
    context.stroke();
  };

  var points = [];

  function initPoints() {
    for (var y = 0; y < canvas.height; y += span) {
      for (var x = 0; x < canvas.width; x += span) {
        // 这里可能造成绘制的条形超过canvas边界，x < canvas.height即使在canvas的倒数第一行也成立，也会继续向下
        points.push(new Point({
          cx: x + r,
          cy: y + r
        }));
      }
    }
  }

  var p = {
    x: 0,
    y: 0
  };

  function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.translate(p.x, p.y);
    var _ref3 = [0, 0];
    p.x = _ref3[0];
    p.y = _ref3[1];

    for (var _i = 0; _i < points.length; _i++) {
      var i = points[_i];
      i.line();
    }
  }

  var id;

  function animate() {
    draw();
    seed += speed;
    id = requestAnimationFrame(animate);
  }

  initPoints();
  animate();

  function moveE(e) {
    p.x = e.movementX / 50;
    p.y = e.movementY / 50;
  }

  dom.addEventListener("mousemove", moveE);

  function leaveE(e) {
    var _ref4 = [0, 0];
    p.x = _ref4[0];
    p.y = _ref4[1];
  }

  dom.addEventListener("mouseleave", leaveE);

  function resizeE() {
    canvas.height = parseInt(getComputedStyle(dom)["height"]) * 1.2;
    canvas.width = parseInt(getComputedStyle(dom)["width"]) * 1.2;
    canvas.style.top = "-" + parseInt(getComputedStyle(dom)["height"]) * 0.1 + "px";
    canvas.style.left = "-" + parseInt(getComputedStyle(dom)["width"]) * 0.1 + "px";
    initPoints();
  }

  window.addEventListener("resize", resizeE);

  function clickE() {
    var target = (0, _utils.copy)(colors[++ci % colors.length]);
    (0, _utils.move)(color, target, duration);
  }

  dom.addEventListener("click", clickE);
  return {
    canvas: canvas,
    stop: function stop() {
      cancelAnimationFrame(id);
      dom.removeEventListener("mousemove", moveE);
      dom.removeEventListener("mouseleave", leaveE);
      window.removeEventListener("resize", resizeE);
      dom.removeEventListener("click", clickE);
    }
  };
};

exports.rain = rain;
},{"./perlin":"perlin.js","./utils":"utils.js"}],"index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "wave", {
  enumerable: true,
  get: function () {
    return _wave.wave;
  }
});
Object.defineProperty(exports, "wind", {
  enumerable: true,
  get: function () {
    return _wind.wind;
  }
});
Object.defineProperty(exports, "rain", {
  enumerable: true,
  get: function () {
    return _rain.rain;
  }
});

var _wave = require("./wave");

var _wind = require("./wind");

var _rain = require("./rain");
},{"./wave":"wave.js","./wind":"wind.js","./rain":"rain.js"}],"test.js":[function(require,module,exports) {
"use strict";

var _index = require("./index");

var _utils = require("./utils");

var div2 = document.createElement('div');
div2.style.width = '100px';
div2.style.height = '100px';
div2.style.backgroundColor = 'green';
document.body.appendChild(div2);
var div = document.createElement('div');
div.style.width = '100px';
div.style.height = '100px';
div.style.backgroundColor = 'red';
document.body.appendChild(div);
window.addEventListener('click', function () {
  (0, _utils.move)({
    x: 0
  }, {
    x: 100
  }, 5000, function (e) {
    div.style.transform = "translateX(".concat(e.x, "px)");
  });
  (0, _utils.move)({
    x: 0
  }, {
    x: 100
  }, 5000, function (e) {
    div2.style.transform = "translateX(".concat(e.x, "px)");
  }, function (pro) {
    return pro * 2;
  });
}); // wind({
//   dom: document.querySelector(".main"),
//   duration: 2000
// });
},{"./index":"index.js","./utils":"utils.js"}],"../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49730" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","test.js"], null)
//# sourceMappingURL=/test.e98b79dd.map
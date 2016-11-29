(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Markright = function () {
  function Markright() {
    var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, Markright);

    this.delimiter = opts.delimiter || ' ';
    this.opener = opts.opener || '(';
    this.closer = opts.closer || ')';
  }

  _createClass(Markright, [{
    key: 'html',
    value: function html(str) {
      var ret = undefined;
      var arr = undefined;

      var strFlat = this.flatten(str);
      arr = this.branch(strFlat);
      ret = this.render(arr);

      return ret;
    }
  }, {
    key: 'render',
    value: function render(tree) {
      var _this = this;

      var ret = '';
      var tmp;

      tree.forEach(function (elm) {
        if (typeof elm === 'string') {
          tmp = elm;
        } else {
          tmp = _this.render(elm);
        }

        ret += _this.wrap(tmp);
      });

      return ret;
    }
  }, {
    key: 'wrap',
    value: function wrap(str) {
      return '<span>' + str + '</span>';
    }
  }, {
    key: 'splitStr',
    value: function splitStr(str) {
      var res = undefined;
      var longest = this.getLongest(str);

      res = str.split(this.constantSpace(longest));

      return res;
    }
  }, {
    key: 'getLongest',
    value: function getLongest(str) {
      var longest = 0;

      var len = str.length;
      var i = undefined;
      var longTmp = 0;

      for (i = 0; i < len; i++) {
        if (str[i] === this.delimiter) {
          longTmp++;
        } else {
          longTmp = 0;
        }

        longest = Math.max(longest, longTmp);
      }

      return longest;
    }
  }, {
    key: 'constantSpace',
    value: function constantSpace(len) {
      var ret = '';
      var i = undefined;

      for (i = 0; i < len; i++) {
        ret += this.delimiter;
      }

      return ret;
    }
  }, {
    key: 'sameArrQ',
    value: function sameArrQ(arr1, arr2) {
      return JSON.stringify(arr1) === JSON.stringify(arr2);
    }
  }, {
    key: 'flatten',
    value: function flatten(str) {
      var _this2 = this;

      var longest = this.getLongest(str);

      var tmp = str.replace(/[\)\(]+/g, function (bracketArr) {
        var rep = bracketArr.length || 0;

        return _this2.constantSpace(longest + rep);
      });

      tmp = tmp.replace(/[\(\)]*/g, '');

      var ret = tmp.trim();

      console.log(ret);

      return ret;
    }
  }, {
    key: 'branch',
    value: function branch(str) {
      var _this3 = this;

      var ret = [];

      if (str.indexOf(this.delimiter) !== -1) {
        this.splitStr(str).forEach(function (elm) {
          ret.push(_this3.branch(elm));
        });
      } else {
        ret = str;
      }

      return ret;
    }
  }]);

  return Markright;
}();

exports.default = Markright;

global.Markright = Markright;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1]);

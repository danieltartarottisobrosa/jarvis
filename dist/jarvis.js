"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

(function (global) {

  var readArgs = function readArgs(args) {
    var paths = [];
    var filters = {};
    var properties = [];
    var implementation = function implementation(input) {
      return input;
    };

    for (var _iterator = args, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var arg = _ref;

      var type = typeof arg === "undefined" ? "undefined" : _typeof(arg);

      switch (type) {
        case "string":
          paths.push(arg);
          break;

        case "object":
          if (Array.isArray(arg)) properties = arg;else filters = arg;
          break;

        case "function":
          implementation = arg;
          break;

        default:
          continue;
      }
    }

    return [paths, properties, filters, implementation];
  };

  var recursiveMount = function recursiveMount(tokens, context, data) {
    var token = tokens.shift();

    // Se acabou os tokens retorna o último contexto
    if (typeof token === "undefined") return context;

    token = token.trim();

    // Se ainda não existe este contexto
    if (typeof context[token] === "undefined") {
      if (token.indexOf("(") === -1) {
        // Se não tiver parâmetros
        context[token] = {};
      } else {
        (function () {
          // Se tiver parâmetros
          var splitAux = token.split("(");
          token = splitAux[0];
          var params = splitAux[1].substr(0, splitAux[1].length - 1).split(",");

          context[token] = function () {
            for (var i = 0; i < params.length; i++) {
              data[params[i].trim()] = arguments[i];
            }return context[token];
          };
        })();
      }
    }

    return recursiveMount(tokens, context[token], data);
  };

  var register = function register() /* rest */{
    var _this = this;

    var _readArgs = readArgs(arguments);

    var paths = _readArgs[0];
    var properties = _readArgs[1];
    var filters = _readArgs[2];
    var implementation = _readArgs[3];

    var input = {};

    var _loop = function _loop() {
      if (_isArray2) {
        if (_i2 >= _iterator2.length) return "break";
        _ref2 = _iterator2[_i2++];
      } else {
        _i2 = _iterator2.next();
        if (_i2.done) return "break";
        _ref2 = _i2.value;
      }

      var path = _ref2;

      var lastContext = recursiveMount(path.split("."), _this, input);

      var _loop2 = function _loop2() {
        if (_isArray3) {
          if (_i3 >= _iterator3.length) return "break";
          _ref3 = _iterator3[_i3++];
        } else {
          _i3 = _iterator3.next();
          if (_i3.done) return "break";
          _ref3 = _i3.value;
        }

        var prop = _ref3;

        lastContext[prop] = function (val) {
          input[prop] = typeof filters[prop] === "undefined" ? val : filters[prop](val);
          return lastContext;
        };
      };

      for (var _iterator3 = properties, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
        var _ref3;

        var _ret3 = _loop2();

        if (_ret3 === "break") break;
      }

      lastContext[_this.options.executeMethodName] = function () {
        return implementation(input);
      };
    };

    for (var _iterator2 = paths, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
      var _ref2;

      var _ret2 = _loop();

      if (_ret2 === "break") break;
    }
    return this;
  };

  var create = function create() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? { executeMethodName: "now" } : arguments[0];

    return {
      register: register,
      create: create,
      options: options
    };
  };

  global.Jarvis = create();
})(typeof window === "undefined" ? module.exports : window);
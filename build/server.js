(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("graphql"), require("babel-runtime/regenerator"), require("babel-runtime/helpers/asyncToGenerator"), require("graphql-relay"), require("babel-runtime/helpers/classCallCheck"), require("cors"), require("express"), require("express-graphql"), require("immutability-helper"), require("babel-runtime/helpers/defineProperty"));
	else if(typeof define === 'function' && define.amd)
		define(["graphql", "babel-runtime/regenerator", "babel-runtime/helpers/asyncToGenerator", "graphql-relay", "babel-runtime/helpers/classCallCheck", "cors", "express", "express-graphql", "immutability-helper", "babel-runtime/helpers/defineProperty"], factory);
	else if(typeof exports === 'object')
		exports["Server"] = factory(require("graphql"), require("babel-runtime/regenerator"), require("babel-runtime/helpers/asyncToGenerator"), require("graphql-relay"), require("babel-runtime/helpers/classCallCheck"), require("cors"), require("express"), require("express-graphql"), require("immutability-helper"), require("babel-runtime/helpers/defineProperty"));
	else
		root["Server"] = factory(root["graphql"], root["babel-runtime/regenerator"], root["babel-runtime/helpers/asyncToGenerator"], root["graphql-relay"], root["babel-runtime/helpers/classCallCheck"], root["cors"], root["express"], root["express-graphql"], root["immutability-helper"], root["babel-runtime/helpers/defineProperty"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_9__, __WEBPACK_EXTERNAL_MODULE_12__, __WEBPACK_EXTERNAL_MODULE_13__, __WEBPACK_EXTERNAL_MODULE_14__, __WEBPACK_EXTERNAL_MODULE_20__, __WEBPACK_EXTERNAL_MODULE_23__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/assets/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("graphql");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/regenerator");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/asyncToGenerator");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("graphql-relay");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nodeField = exports.nodeInterface = exports.idFetcher = undefined;

var _regenerator = __webpack_require__(1);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(2);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _graphqlRelay = __webpack_require__(3);

var _api = __webpack_require__(5);

var _models = __webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GETTERS = {
  Home: _api.getHome,
  Task: _api.getTask
};
var idFetcher = exports.idFetcher = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(globalId) {
    var _fromGlobalId, type, id, node;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _fromGlobalId = (0, _graphqlRelay.fromGlobalId)(globalId), type = _fromGlobalId.type, id = _fromGlobalId.id;

            console.log(['nodeDefinitions.idFetcher'], globalId, { type: type, id: id });
            _context.next = 4;
            return GETTERS[type];

          case 4:
            if (!_context.sent) {
              _context.next = 8;
              break;
            }

            _context.t0 = GETTERS[type](id);
            _context.next = 9;
            break;

          case 8:
            _context.t0 = null;

          case 9:
            node = _context.t0;

            if (!node) {
              _context.next = 12;
              break;
            }

            return _context.abrupt('return', node);

          case 12:

            console.error(['nodeDefinitions.idFetcher.error'], 'Cannot resolve node by id.');

            return _context.abrupt('return', null);

          case 14:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function idFetcher(_x) {
    return _ref.apply(this, arguments);
  };
}();
var typeResolver = function typeResolver(obj) {
  console.log(['nodeDefinitions.typeResolver'], obj);
  if (obj instanceof _models.Home) {
    return __webpack_require__(7).default; // FIXME
  } else if (obj instanceof _models.Task) {
    return __webpack_require__(6).default; // FIXME
  }

  console.error(['nodeDefinitions.typeResolver.error'], 'Cannot match instance class.');

  return null;
};

var _nodeDefinitions = (0, _graphqlRelay.nodeDefinitions)(idFetcher, typeResolver);

var nodeInterface = _nodeDefinitions.nodeInterface,
    nodeField = _nodeDefinitions.nodeField;
exports.nodeInterface = nodeInterface;
exports.nodeField = nodeField;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTasks = exports.getTask = exports.getHome = exports.addTask = undefined;

var _api = __webpack_require__(19);

exports.addTask = _api.addTask;
exports.getHome = _api.getHome;
exports.getTask = _api.getTask;
exports.getTasks = _api.getTasks;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = __webpack_require__(0);

var _graphqlRelay = __webpack_require__(3);

var _nodeDefinitions = __webpack_require__(4);

exports.default = new _graphql.GraphQLObjectType({
  name: 'Task',
  description: 'A task',
  fields: function fields() {
    return {
      id: (0, _graphqlRelay.globalIdField)('Task'),
      title: {
        type: _graphql.GraphQLString,
        description: 'Task title'
      },
      priority: {
        type: _graphql.GraphQLString,
        description: 'Task priority'
      },
      creationDate: {
        type: _graphql.GraphQLString,
        description: 'Task creationDate'
      },
      finishDate: {
        type: _graphql.GraphQLString,
        description: 'Task finishDate'
      },
      progress: {
        type: _graphql.GraphQLString,
        description: 'Task progress'
      },
      status: {
        type: _graphql.GraphQLString,
        description: 'Task status'
      },
      note: {
        type: _graphql.GraphQLString,
        description: 'Task note'
      }
    };
  },
  interfaces: [_nodeDefinitions.nodeInterface]
});

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(1);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(2);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _require = __webpack_require__(0),
    GraphQLObjectType = _require.GraphQLObjectType;

var _require2 = __webpack_require__(3),
    connectionArgs = _require2.connectionArgs,
    connectionFromArray = _require2.connectionFromArray,
    globalIdField = _require2.globalIdField;

var _require3 = __webpack_require__(4),
    nodeInterface = _require3.nodeInterface;

var _require4 = __webpack_require__(10),
    taskConnection = _require4.taskConnection;

var _require5 = __webpack_require__(5),
    getTasks = _require5.getTasks;

exports.default = new GraphQLObjectType({
  name: 'Home',
  description: 'Home module',
  fields: function fields() {
    return {
      id: globalIdField('Home'),
      tasks: {
        type: taskConnection,
        description: 'User\'s tasks',
        args: connectionArgs,
        resolve: function () {
          var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_, args) {
            var tasks;
            return _regenerator2.default.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return getTasks();

                  case 2:
                    tasks = _context.sent;
                    return _context.abrupt('return', connectionFromArray(tasks, args));

                  case 4:
                  case 'end':
                    return _context.stop();
                }
              }
            }, _callee, undefined);
          }));

          function resolve(_x, _x2) {
            return _ref.apply(this, arguments);
          }

          return resolve;
        }()
      }
    };
  },
  interfaces: [nodeInterface]
});

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Task = exports.Home = undefined;

var _Home = __webpack_require__(24);

var _Home2 = _interopRequireDefault(_Home);

var _Task = __webpack_require__(25);

var _Task2 = _interopRequireDefault(_Task);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Home = _Home2.default;
exports.Task = _Task2.default;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/classCallCheck");

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TaskEdge = exports.taskConnection = undefined;

var _graphqlRelay = __webpack_require__(3);

var _task = __webpack_require__(6);

var _task2 = _interopRequireDefault(_task);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _connectionDefinition = (0, _graphqlRelay.connectionDefinitions)({ name: 'Task', nodeType: _task2.default }),
    taskConnection = _connectionDefinition.connectionType,
    TaskEdge = _connectionDefinition.edgeType;

exports.taskConnection = taskConnection;
exports.TaskEdge = TaskEdge;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _cors = __webpack_require__(12);

var _cors2 = _interopRequireDefault(_cors);

var _express = __webpack_require__(13);

var _express2 = _interopRequireDefault(_express);

var _expressGraphql = __webpack_require__(14);

var _expressGraphql2 = _interopRequireDefault(_expressGraphql);

var _schema = __webpack_require__(15);

var _schema2 = _interopRequireDefault(_schema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PORT = process.env.PORT || 30000;

var server = (0, _express2.default)();

server.use(_express2.default.static(process.cwd() + '/build'));
server.use('/graphql', (0, _cors2.default)(), (0, _expressGraphql2.default)(function () {
  return {
    schema: _schema2.default, pretty: true, graphiql: true
  };
}));
server.listen(PORT, function () {
  return console.log('GraphQL Server is now running on http://localhost:' + PORT + '/graphql');
});

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("cors");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("express-graphql");

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = __webpack_require__(0);

var _mutation = __webpack_require__(16);

var _mutation2 = _interopRequireDefault(_mutation);

var _query = __webpack_require__(26);

var _query2 = _interopRequireDefault(_query);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _graphql.GraphQLSchema({
  query: _query2.default,
  mutation: _mutation2.default
});

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = __webpack_require__(0);

var _addTask = __webpack_require__(17);

var _addTask2 = _interopRequireDefault(_addTask);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _graphql.GraphQLObjectType({
  name: 'Mutation',
  fields: function fields() {
    return {
      addTask: _addTask2.default
    };
  }
});

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(1);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(2);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _graphql = __webpack_require__(0);

var _graphqlRelay = __webpack_require__(3);

var _types = __webpack_require__(18);

var _models = __webpack_require__(8);

var _api = __webpack_require__(5);

var _connections = __webpack_require__(10);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _graphqlRelay.mutationWithClientMutationId)({
  name: 'addTask',
  inputFields: {
    title: {
      type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
    },
    priority: {
      type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
    },
    status: {
      type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
    },
    creationDate: {
      type: _graphql.GraphQLString
    },
    progress: {
      type: _graphql.GraphQLString
    },
    finishDate: {
      type: _graphql.GraphQLString
    },
    note: {
      type: _graphql.GraphQLString
    }
  },
  outputFields: {
    newTaskEdge: {
      type: _connections.TaskEdge,
      resolve: function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(node) {
          var tasks;
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  console.log(['mutations.addTask.outputFields.newTaskEdge'], node);
                  _context.next = 3;
                  return (0, _api.getTasks)();

                case 3:
                  tasks = _context.sent;
                  return _context.abrupt('return', {
                    node: node,
                    cursor: (0, _graphqlRelay.cursorForObjectInConnection)(tasks, node)
                  });

                case 5:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, undefined);
        }));

        function resolve(_x) {
          return _ref.apply(this, arguments);
        }

        return resolve;
      }()
    },
    home: {
      type: _types.homeType,
      resolve: function () {
        var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
          return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return (0, _api.getHome)();

                case 2:
                  return _context2.abrupt('return', _context2.sent);

                case 3:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, undefined);
        }));

        function resolve() {
          return _ref2.apply(this, arguments);
        }

        return resolve;
      }()
    }
  },
  mutateAndGetPayload: function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(task) {
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              console.log(['addTask.mutateAndGetPayload'], task);

              _context3.next = 3;
              return (0, _api.addTask)(new _models.Task(task));

            case 3:
              return _context3.abrupt('return', _context3.sent);

            case 4:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, undefined);
    }));

    function mutateAndGetPayload(_x2) {
      return _ref3.apply(this, arguments);
    }

    return mutateAndGetPayload;
  }()
});

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.taskType = exports.homeType = undefined;

var _home = __webpack_require__(7);

var _home2 = _interopRequireDefault(_home);

var _task = __webpack_require__(6);

var _task2 = _interopRequireDefault(_task);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.homeType = _home2.default;
exports.taskType = _task2.default;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTasks = exports.getTask = exports.getHome = exports.addTask = undefined;

var _regenerator = __webpack_require__(1);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(2);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _immutabilityHelper = __webpack_require__(20);

var _immutabilityHelper2 = _interopRequireDefault(_immutabilityHelper);

var _data = __webpack_require__(21);

var _data2 = _interopRequireDefault(_data);

var _createStore = __webpack_require__(22);

var _createStore2 = _interopRequireDefault(_createStore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getRandomDelay = function getRandomDelay() {
  return parseInt(Math.random() * 3000);
};
var store = (0, _createStore2.default)(_data2.default);

var addTask = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(task) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log(['mocks.api.addTask'], task);
            task.id = store.tasks.length.toString();
            store = (0, _immutabilityHelper2.default)(store, {
              tasks: {
                $push: [task]
              }
            });

            _context.next = 5;
            return getTask(task.id);

          case 5:
            return _context.abrupt('return', _context.sent);

          case 6:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function addTask(_x) {
    return _ref.apply(this, arguments);
  };
}();
var getHome = function getHome() {
  return store.home;
};
// const getTask = id => store.tasks.find(task => task.id === id);
var getTask = function getTask(id) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(store.tasks.find(function (task) {
        return task.id === id;
      }));
    }, getRandomDelay());
  });
};
// const getTasks = () => store.tasks.sort((a, b) => a.id < b.id);
var getTasks = function getTasks() {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(store.tasks.sort(function (a, b) {
        return a.id < b.id;
      }));
    }, getRandomDelay());
  });
};

exports.addTask = addTask;
exports.getHome = getHome;
exports.getTask = getTask;
exports.getTasks = getTasks;

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("immutability-helper");

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = {"home":{"id":"HOME","name":"Home module"},"tasks":[{"id":"0","title":"Ad autem qui.","priority":"urgent","creationDate":"2016-11-15T04:56:25.603Z","finishDate":"2018-05-27T04:43:13.303Z","progress":0.71,"status":"planned","note":"Qui sapiente expedita sed harum. Maiores eos delectus architecto similique delectus. Eveniet officia praesentium est et debitis soluta harum saepe."},{"id":"1","title":"Cupiditate impedit sed ut et aut incidunt eveniet unde.","priority":"urgent","creationDate":"2017-01-17T08:38:38.060Z","finishDate":"2017-12-23T20:57:44.743Z","progress":0.18,"status":"in progress","note":"Perferendis quam nobis. Repellendus qui tenetur nemo qui itaque debitis necessitatibus. Amet dignissimos aut amet officiis enim asperiores quidem et."},{"id":"2","title":"Et eius dolores fugiat consequatur vitae.","priority":"normal","creationDate":"2017-05-24T14:25:02.727Z","finishDate":"2018-05-18T08:09:57.715Z","progress":0.88,"status":"cancelled","note":"Magni vitae nam quia facere laborum. Aut ipsum inventore mollitia aut soluta sint. Ut in provident molestias labore velit numquam nam aperiam. Et nulla est aliquid. Qui mollitia natus non dolor. Vel voluptate eveniet asperiores facilis sit et tempora."},{"id":"3","title":"Sit quam et nostrum aut numquam ut veritatis quae.","priority":"normal","creationDate":"2017-01-21T06:50:04.316Z","finishDate":"2018-03-17T15:55:55.328Z","progress":0.83,"status":"planned","note":"In iste eum iste quibusdam magnam aut. Vel omnis nobis exercitationem deserunt. Aut doloremque qui omnis vitae eum. Voluptatibus harum officiis."},{"id":"4","title":"Aut sunt sit quod pariatur sit esse deserunt.","priority":"urgent","creationDate":"2017-05-06T08:08:00.343Z","finishDate":"2017-11-08T03:50:35.031Z","progress":0.34,"status":"done","note":"Quasi architecto culpa vel porro error fugiat. Voluptatem quia aut."},{"id":"5","title":"Repudiandae id corrupti minus totam veritatis.","priority":"urgent","creationDate":"2017-01-30T01:20:28.940Z","finishDate":"2018-09-11T10:58:17.471Z","progress":0.88,"status":"planned","note":"Velit tempora itaque voluptate corporis doloribus repellendus odio. Natus debitis magnam voluptatibus aut vero eos."},{"id":"6","title":"Et ipsum quis rerum explicabo.","priority":"urgent","creationDate":"2017-03-24T01:00:05.333Z","finishDate":"2017-12-09T02:32:56.164Z","progress":0.35,"status":"in progress","note":"Est consequatur et nostrum magni neque. Et sit laudantium consectetur voluptatibus aspernatur sunt aut. Et eum vero quia suscipit eligendi cum rerum sed. Corrupti et corrupti deserunt aperiam ab voluptas et enim impedit."},{"id":"7","title":"Optio corrupti qui est commodi qui et quisquam quod.","priority":"normal","creationDate":"2017-02-26T13:21:20.377Z","finishDate":"2018-01-10T13:07:07.974Z","progress":0.51,"status":"planned","note":"Quia occaecati cupiditate est voluptatem rem repudiandae sunt voluptatum iusto. A id quis autem velit laboriosam. Et adipisci quia dolore quae inventore officiis ipsam. Impedit eos molestiae asperiores ratione dolore."},{"id":"8","title":"Mollitia nobis accusamus.","priority":"normal","creationDate":"2017-03-04T15:24:56.861Z","finishDate":"2018-09-04T23:54:20.727Z","progress":0.88,"status":"in progress","note":"Vel fuga et corrupti aut. Quas consequatur laborum."},{"id":"9","title":"Officiis cumque doloremque ad et enim.","priority":"urgent","creationDate":"2017-02-23T09:29:47.876Z","finishDate":"2018-08-02T05:16:52.429Z","progress":0.86,"status":"planned","note":"Id optio officiis aut numquam commodi saepe quam. Atque similique qui delectus voluptate tempora ipsa sit iusto et. Aliquid eos non eligendi deleniti quia quia corrupti qui quibusdam. Corporis omnis eaque aut similique iure. Esse cupiditate libero natus corporis at. Voluptas sunt et exercitationem laborum quis repellendus iste quia quis."},{"id":"10","title":"Architecto aspernatur minima dolorem repudiandae sunt omnis sapiente.","priority":"urgent","creationDate":"2016-10-19T04:12:14.369Z","finishDate":"2017-12-07T02:10:01.802Z","progress":0.69,"status":"done","note":"Et est recusandae animi dolores perferendis consequuntur libero repudiandae. Optio dicta rerum."},{"id":"11","title":"Veniam maxime nobis libero quisquam recusandae harum.","priority":"urgent","creationDate":"2016-12-21T02:29:45.745Z","finishDate":"2017-12-23T07:24:58.883Z","progress":0.47,"status":"planned","note":"Et ut id. Deleniti fugit incidunt hic animi reprehenderit voluptates distinctio cumque. Enim voluptates quis tempore et."},{"id":"12","title":"Aut sint occaecati.","priority":"normal","creationDate":"2017-06-28T01:49:28.715Z","finishDate":"2018-05-14T08:50:24.755Z","progress":0.28,"status":"in progress","note":"Eos temporibus hic harum dolore quis eveniet. Rerum consectetur itaque non ut magni est. Sunt nulla dolores qui laboriosam."},{"id":"13","title":"Mollitia inventore necessitatibus.","priority":"normal","creationDate":"2016-10-24T05:08:28.731Z","finishDate":"2018-09-01T18:11:31.099Z","progress":0.3,"status":"in progress","note":"Laboriosam itaque vel alias. Omnis ipsam nihil. Et possimus itaque ut ea quo sit voluptatem tempore ut."},{"id":"14","title":"Repellendus qui laboriosam.","priority":"normal","creationDate":"2016-12-22T21:07:06.443Z","finishDate":"2018-06-24T22:06:57.184Z","progress":0.31,"status":"in progress","note":"Nemo voluptatem facere recusandae aliquid soluta sequi omnis. Molestias rem dolor."},{"id":"15","title":"Velit quia ratione eum non odit.","priority":"normal","creationDate":"2017-06-13T05:02:47.412Z","finishDate":"2018-07-29T11:21:41.123Z","progress":0.93,"status":"done","note":"Repellat eum quibusdam quasi omnis assumenda. Nihil dolore ut est reiciendis. Distinctio aut excepturi enim et voluptas in pariatur et. Repellendus quia iusto adipisci."},{"id":"16","title":"Tempore voluptatem id optio perspiciatis ut cumque quas.","priority":"normal","creationDate":"2017-05-19T07:47:55.596Z","finishDate":"2018-04-11T17:04:44.423Z","progress":0.31,"status":"planned","note":"Quis eum quis et labore vitae laboriosam adipisci. Corrupti aperiam nesciunt mollitia non in voluptas. Repellendus blanditiis illo alias aperiam quia."},{"id":"17","title":"Repellendus et amet tempore non laboriosam recusandae placeat voluptatem est.","priority":"urgent","creationDate":"2016-12-28T21:42:02.848Z","finishDate":"2018-06-22T02:26:41.382Z","progress":0.81,"status":"planned","note":"Dolorem at quo architecto distinctio mollitia est. Modi animi consectetur quaerat eos ipsa impedit et quo. Adipisci natus dolorem nisi accusamus dolor provident molestias sit aspernatur. In possimus ad."},{"id":"18","title":"Voluptatem repudiandae minima similique voluptatem.","priority":"urgent","creationDate":"2016-12-14T17:31:26.926Z","finishDate":"2018-02-22T20:02:07.459Z","progress":0.71,"status":"planned","note":"Voluptatum ab ipsum vel placeat magni facere tempora delectus neque. Voluptas saepe hic ut voluptatem reprehenderit ut. Dolores laborum tempora autem totam molestiae. Laborum cupiditate non praesentium. Magnam aliquid est sed dolores ipsa delectus. Et maiores impedit magnam recusandae."},{"id":"19","title":"Ut nemo fuga corporis rem distinctio iure iusto.","priority":"urgent","creationDate":"2017-02-27T01:33:53.658Z","finishDate":"2018-05-25T05:10:40.231Z","progress":0.23,"status":"done","note":"Rerum id sunt in nobis doloremque. Voluptate doloremque non tempore recusandae ab aut placeat atque blanditiis. Amet quibusdam quia distinctio dolorem similique sunt est ex sit."}]}

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = __webpack_require__(23);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _models = __webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var STORE_APPLIES = [{
  dataKey: 'home',
  apply: function apply(data) {
    return new _models.Home(data);
  }
}, {
  dataKey: 'tasks',
  apply: function apply(tasks) {
    return tasks.map(function (task) {
      return new _models.Task(task);
    });
  }
}];

exports.default = function (data) {
  return STORE_APPLIES.reduce(function (result, _ref) {
    var dataKey = _ref.dataKey,
        apply = _ref.apply;
    return Object.assign({}, result, (0, _defineProperty3.default)({}, dataKey, apply(data[dataKey])));
  }, {});
};

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = require("babel-runtime/helpers/defineProperty");

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(9);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Home = function Home(_ref) {
  var id = _ref.id,
      name = _ref.name;
  (0, _classCallCheck3.default)(this, Home);

  Object.assign(this, { id: id, name: name });
};

exports.default = Home;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(9);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Task = function Task(_ref) {
  var id = _ref.id,
      title = _ref.title,
      priority = _ref.priority,
      creationDate = _ref.creationDate,
      finishDate = _ref.finishDate,
      progress = _ref.progress,
      status = _ref.status,
      note = _ref.note;
  (0, _classCallCheck3.default)(this, Task);

  Object.assign(this, { id: id, title: title, priority: priority, creationDate: creationDate, finishDate: finishDate, progress: progress, status: status, note: note });
};

exports.default = Task;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = __webpack_require__(0);

var _app = __webpack_require__(27);

var _app2 = _interopRequireDefault(_app);

var _nodeDefinitions = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _graphql.GraphQLObjectType({
  name: 'Query',
  fields: function fields() {
    return {
      app: {
        type: _app2.default,
        resolve: function resolve() {
          return true;
        }
      },
      node: _nodeDefinitions.nodeField
    };
  }
});

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = __webpack_require__(1);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(2);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _graphql = __webpack_require__(0);

var _api = __webpack_require__(5);

var _home = __webpack_require__(7);

var _home2 = _interopRequireDefault(_home);

var _task = __webpack_require__(6);

var _task2 = _interopRequireDefault(_task);

var _nodeDefinitions = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _graphql.GraphQLObjectType({
  name: 'App',
  description: 'Application entry point',
  fields: function fields() {
    return {
      home: {
        type: _home2.default,
        resolve: function () {
          var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
            return _regenerator2.default.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return (0, _api.getHome)();

                  case 2:
                    return _context.abrupt('return', _context.sent);

                  case 3:
                  case 'end':
                    return _context.stop();
                }
              }
            }, _callee, undefined);
          }));

          function resolve() {
            return _ref.apply(this, arguments);
          }

          return resolve;
        }()
      },
      taskDetails: {
        type: _task2.default,
        args: {
          id: { type: _graphql.GraphQLString }
        },
        resolve: function () {
          var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(_, _ref2) {
            var id = _ref2.id;
            return _regenerator2.default.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    _context2.next = 2;
                    return id;

                  case 2:
                    if (!_context2.sent) {
                      _context2.next = 6;
                      break;
                    }

                    _context2.t0 = (0, _nodeDefinitions.idFetcher)(id);
                    _context2.next = 7;
                    break;

                  case 6:
                    _context2.t0 = null;

                  case 7:
                    return _context2.abrupt('return', _context2.t0);

                  case 8:
                  case 'end':
                    return _context2.stop();
                }
              }
            }, _callee2, undefined);
          }));

          function resolve(_x, _x2) {
            return _ref3.apply(this, arguments);
          }

          return resolve;
        }()
      }
    };
  }
});

/***/ })
/******/ ]);
});
//# sourceMappingURL=server.js.map
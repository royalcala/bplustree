"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.put = exports.saveLeaf = void 0;

var _pathEq2 = _interopRequireDefault(require("ramda/src/pathEq"));

var _cond2 = _interopRequireDefault(require("ramda/src/cond"));

var _hasPath2 = _interopRequireDefault(require("ramda/src/hasPath"));

var _ifElse2 = _interopRequireDefault(require("ramda/src/ifElse"));

var _pipe2 = _interopRequireDefault(require("ramda/src/pipe"));

var _tree = require("./tree");

var _leaf = require("./leaf");

var _leafRotate = require("./leafRotate");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const saveLeaf = (by = {}) => (0, _pipe2.default)(_tree.saveKeyValueInStore, (0, _leaf.selectLeaf)(by), _leaf.saveDataWithSelectLeaf, _leafRotate.checkRotateWithSelectLeaf);

exports.saveLeaf = saveLeaf;

const put = tree => (key, value) => (0, _ifElse2.default)((0, _hasPath2.default)(['tree', 'store', key]), ({
  tree
}) => {
  //replace
  tree.store[key] = value;
  return tree;
}, ({
  tree,
  key,
  value
}) => {
  //insert  
  let insert = (0, _cond2.default)([[({
    tree
  }) => tree.size >= tree.leafMax, (0, _pipe2.default)((0, _tree.moveToLeaf)({
    nextNode: tree.firstNoneLeaf
  }), state => saveLeaf({
    ByRefNode: state.selectLeaf
  })(state))], [({
    tree
  }) => tree.size > 0, saveLeaf({
    byId: 0
  })], [(0, _pathEq2.default)(['tree', 'size'], 0), (0, _pipe2.default)(_tree.saveKeyValueInStore, _leaf.createLeaf, (0, _leaf.selectLeaf)({
    byId: 0
  }), _leaf.saveDataWithSelectLeaf)]])({
    tree,
    key,
    value
  });
  tree.size++;
  return insert;
})({
  tree,
  key,
  value
});

exports.put = put;
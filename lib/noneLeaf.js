"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connectWithNoneLeaf = exports.saveUpAndCheckRotate = void 0;

var _pathEq2 = _interopRequireDefault(require("ramda/src/pathEq"));

var _ifElse2 = _interopRequireDefault(require("ramda/src/ifElse"));

var _pipe2 = _interopRequireDefault(require("ramda/src/pipe"));

var _types = require("./types");

var _noneLeafRotate = require("./noneLeafRotate");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const saveDataInUpNode = state => {
  const {
    nodeL,
    nodeR,
    tree
  } = state;
  state.selectNoneLeaf = nodeL.parent;
  nodeR.parent = state.selectNoneLeaf;
  if (nodeR.type === 'leaf') state.selectNoneLeaf.blocks.push(nodeR.blocks[0]);else state.selectNoneLeaf.blocks.push(nodeR.blocks.shift());
  state.selectNoneLeaf.blocksPointers.push(nodeR);
  return state;
};

const saveUpAndCheckRotate = (0, _pipe2.default)(saveDataInUpNode, _noneLeafRotate.checkRotateWithSelectNoneLeaf);
exports.saveUpAndCheckRotate = saveUpAndCheckRotate;

const createFirstNoneLeaf = state => {
  const {
    nodeL,
    nodeR,
    tree
  } = state;
  let newNoneLeaf = (0, _types.setNoneLeaf)(tree);
  if (nodeR.type === 'leaf') newNoneLeaf.blocks = [nodeR.blocks[0]];else newNoneLeaf.blocks = [nodeR.blocks.shift()];
  newNoneLeaf.blocksPointers = [nodeL, nodeR];
  nodeR.parent = newNoneLeaf;
  nodeL.parent = newNoneLeaf;
  tree.firstNoneLeaf = newNoneLeaf;
  return state;
};

const upNode = (0, _ifElse2.default)((0, _pathEq2.default)(['nodeL', 'parent'], null), createFirstNoneLeaf, saveUpAndCheckRotate);

const connectWithNoneLeaf = (Lleaf, Rleaf, tree) => upNode({
  nodeL: Lleaf,
  nodeR: Rleaf,
  tree
});

exports.connectWithNoneLeaf = connectWithNoneLeaf;
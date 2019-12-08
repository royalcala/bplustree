"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkRotateWithSelectNoneLeaf = void 0;

var _ifElse2 = _interopRequireDefault(require("ramda/src/ifElse"));

var _pipe2 = _interopRequireDefault(require("ramda/src/pipe"));

var _types = require("./types");

var _noneLeaf = require("./noneLeaf");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const setBlocksPointers = state => {
  const {
    nodeL,
    nodeR
  } = state;
  let distribution = nodeL.blocksPointers.length / 2;
  nodeR.blocksPointers = nodeL.blocksPointers.splice(-Math.floor(distribution));
  return state;
};

const setBlocks = state => {
  const {
    nodeL,
    nodeR
  } = state;
  let distribution = nodeL.blocks.length / 2;
  nodeR.blocks = nodeL.blocks.splice(-Math.ceil(distribution));
  return state;
};

const reSelectNodes = state => {
  const {
    selectNoneLeaf,
    tree,
    nodeL: beforeL,
    nodeR: beforeR
  } = state;
  state.nodeL = selectNoneLeaf;
  state.nodeR = (0, _types.setNoneLeaf)(tree);
  beforeL.parent = state.nodeR;
  beforeR.parent = state.nodeR;
  return state;
};

const rotateNoneLeaf = (0, _pipe2.default)(reSelectNodes, setBlocks, setBlocksPointers, ({
  nodeL,
  nodeR,
  tree
}) => (0, _noneLeaf.connectWithNoneLeaf)(nodeL, nodeR, tree));
const checkRotateWithSelectNoneLeaf = (0, _ifElse2.default)(({
  selectNoneLeaf,
  tree
}) => selectNoneLeaf.blocks.length === tree.noneLeafMax, rotateNoneLeaf, state => state);
exports.checkRotateWithSelectNoneLeaf = checkRotateWithSelectNoneLeaf;
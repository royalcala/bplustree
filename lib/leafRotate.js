"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkRotateWithSelectLeaf = void 0;

var _ifElse2 = _interopRequireDefault(require("ramda/src/ifElse"));

var _pipe2 = _interopRequireDefault(require("ramda/src/pipe"));

var _leaf = require("./leaf");

var _noneLeaf = require("./noneLeaf");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const divideLeaf = (Lleaf, tree) => {
  let Rleaf = (0, _pipe2.default)(_leaf.createLeaf, ({
    tree
  }) => {
    return tree.leafs[tree.countIdLeaf - 1];
  })({
    tree
  });
  Rleaf.next = Lleaf.next;
  Rleaf.back = Lleaf;
  Lleaf.next = Rleaf;
  if (Rleaf.next === null) tree.lastLeaf = Rleaf;
  let distribution = Lleaf.blocks.length / 2;
  Rleaf.blocks = Lleaf.blocks.splice(-Math.ceil(distribution));
  return Rleaf;
};

const rotateLeaf = state => {
  const {
    selectLeaf,
    tree
  } = state;
  state.Rleaf = divideLeaf(selectLeaf, tree);
  state.noneLeaf = (0, _noneLeaf.connectWithNoneLeaf)(selectLeaf, state.Rleaf, tree);
  return state;
};

const checkRotateWithSelectLeaf = (0, _ifElse2.default)(({
  selectLeaf,
  tree
}) => selectLeaf.blocks.length === tree.leafMax, rotateLeaf, state => state);
exports.checkRotateWithSelectLeaf = checkRotateWithSelectLeaf;
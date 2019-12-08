"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tree = require("./tree");

var _put = require("./put");

// import noneLeaf from './noneLeaf'
// import leaf from './leaf'
// import { initTree } from './initTree'
const main = ({
  noneLeafMax = 3,
  leafMax = 3,
  comparatorSortFx = _tree.defaultComparatorFx
}) => {
  const tree = {
    noneLeafMax,
    leafMax,
    comparatorSortFx,
    firstNoneLeaf: null,
    lastLeaf: null,
    size: 0,
    countIdLeaf: 0,
    countIdNoneLeaf: 0,
    noneLeafs: {},
    leafs: {},
    store: {}
  };
  return {
    put: (key, value) => {
      return (0, _put.put)(tree)(key, value);
    },
    getTree: tree
  };
};

var _default = main;
exports.default = _default;
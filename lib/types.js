"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setNoneLeaf = exports.LEAF = exports.NONELEAF = void 0;
const NONELEAF = 'noneleaf';
exports.NONELEAF = NONELEAF;
const LEAF = 'leaf';
exports.LEAF = LEAF;

const setNoneLeaf = tree => {
  let newNoneLeaf = tree.noneLeafs[tree.countIdNoneLeaf] = {
    blocks: null,
    parent: null,
    blocksPointers: null,
    type: NONELEAF
  }; // tree.firstNoneLeaf = newNoneLeaf

  tree.countIdNoneLeaf++;
  return newNoneLeaf;
};

exports.setNoneLeaf = setNoneLeaf;
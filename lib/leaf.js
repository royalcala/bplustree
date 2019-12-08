"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectLeaf = exports.saveDataWithSelectLeaf = exports.createLeaf = void 0;

var _types = require("./types");

const createLeaf = state => {
  const {
    tree
  } = state;
  let nameNewLeaf = tree.countIdLeaf;
  tree.leafs[nameNewLeaf] = {
    blocks: [],
    parent: null,
    next: null,
    back: null,
    type: _types.LEAF
  };
  tree.countIdLeaf++;
  return state;
};

exports.createLeaf = createLeaf;

const saveDataWithSelectLeaf = state => {
  const {
    selectLeaf,
    tree,
    key
  } = state;
  selectLeaf.blocks.push(tree.store[key]);
  selectLeaf.blocks.sort(tree.comparatorSortFx);
  return state;
};

exports.saveDataWithSelectLeaf = saveDataWithSelectLeaf;

const selectLeaf = ({
  byId = null,
  ByRefNode = null
}) => state => {
  const {
    tree
  } = state;
  state.selectLeaf = byId === null ? ByRefNode : tree.leafs[byId];
  return state;
};

exports.selectLeaf = selectLeaf;
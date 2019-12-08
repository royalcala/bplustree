import { LEAF } from './types'

export const createLeaf = state => {
    const { tree } = state
    let nameNewLeaf = tree.countIdLeaf
    tree.leafs[nameNewLeaf] = {
        blocks: [],
        parent: null,
        next: null,
        back: null,
        type: LEAF
    }
    tree.countIdLeaf++
    return state
}
// const insertOrderedKey = (blocks, store) => {
//     let inserted = false
//     for (let i = blocks.length - 1; i > -1; i--) {
//         if (store.key > blocks[i]) {
//             // console.log('inserted on index:', i);
//             blocks.splice(i + 1, 0, store);
//             inserted = true
//             break;
//         }
//     }
//     if (inserted === false)
//         blocks.splice(0, 0, store);
// };

export const saveDataWithSelectLeaf = state => {
    const { selectLeaf, tree, key, value } = state
    selectLeaf.blocks.push(tree.store[key])
    selectLeaf.blocks.sort(tree.comparatorSortFx)
    // insertOrderedKey(selectLeaf.blocks,tree.store[key])
    // for (i =  selectLeaf.blocks.length - 1; i > 0; i--) {

    // }
    return state
}

export const selectLeaf = ({ byId = null, ByRefNode = null }) => state => {
    const { tree } = state
    state.selectLeaf = byId === null ? ByRefNode : tree.leafs[byId]
    return state
}
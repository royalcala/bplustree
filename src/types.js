export const NONELEAF = 'noneleaf'
export const LEAF = 'leaf'

export const setNoneLeaf = tree => {
    let newNoneLeaf = tree.noneLeafs[tree.countIdNoneLeaf] = {
        blocks: null,
        parent: null,
        blocksPointers: null,
        type: NONELEAF
    }
    // tree.firstNoneLeaf = newNoneLeaf
    tree.countIdNoneLeaf++
    return newNoneLeaf
}
// import noneLeaf from './noneLeaf'
// import leaf from './leaf'
// import { initTree } from './initTree'
import { defaultComparatorFx } from './tree'
import { put } from './put'
// https://www.npmjs.com/package/sbtree //check later

const main = ({ noneLeafMax = 3, leafMax = 3, comparatorSortFx = defaultComparatorFx }) => {
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
    }
    return {
        put: (key, value) => {
            return put(tree)(key, value)
        },
        getTree: tree
    }



}

export default main 
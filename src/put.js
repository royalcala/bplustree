import { ifElse, hasPath, cond, pathEq, pipe } from 'ramda'
import { incrementSizeTree, saveKeyValueInStore, moveToLeaf } from './tree'
import { createLeaf, selectLeaf, saveDataWithSelectLeaf } from './leaf'
import { checkRotateWithSelectLeaf } from './leafRotate'

export const saveLeaf = (by = {}) => pipe(saveKeyValueInStore, selectLeaf(by), saveDataWithSelectLeaf, checkRotateWithSelectLeaf)

export const put = tree => (key, value) => ifElse(
    hasPath(['tree', 'store', key]),
    ({ tree }) => {//replace
        tree.store[key] = value
        return tree
    },
    ({ tree, key, value }) => { //insert  
        let insert = cond([
            [({ tree }) => tree.size >= tree.leafMax, pipe(
                // x => {
                //     console.time('moveToLeaf')
                //     return x
                // },
                moveToLeaf({ nextNode: tree.firstNoneLeaf }),
                // x => {
                //     console.timeEnd('moveToLeaf')
                //     return x
                // },
                state => saveLeaf({ ByRefNode: state.selectLeaf })(state)
            )],
            [({ tree }) => tree.size > 0, saveLeaf({ byId: 0 })],
            [pathEq(['tree', 'size'], 0), pipe(saveKeyValueInStore, createLeaf, selectLeaf({ byId: 0 }), saveDataWithSelectLeaf)],
        ])({ tree, key, value })

        tree.size++
        return insert
    }
)({ tree, key, value })
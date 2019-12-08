import { ifElse, pipe } from 'ramda'
import { createLeaf } from './leaf'
import { connectWithNoneLeaf } from './noneLeaf'
const divideLeaf = (Lleaf, tree) => {
    let Rleaf = pipe(
        createLeaf,
        ({ tree }) => {
            return tree.leafs[tree.countIdLeaf - 1]
        }
    )({ tree })

    Rleaf.next = Lleaf.next
    Rleaf.back = Lleaf
    Lleaf.next = Rleaf
    if (Rleaf.next === null)
        tree.lastLeaf = Rleaf

    let distribution = Lleaf.blocks.length / 2
    Rleaf.blocks = Lleaf.blocks.splice(-Math.ceil(
        distribution
    ))
    return Rleaf
}

const rotateLeaf = state => {
    const { selectLeaf, tree } = state
    state.Rleaf = divideLeaf(selectLeaf, tree)
    state.noneLeaf = connectWithNoneLeaf(selectLeaf, state.Rleaf, tree)

    return state
}

export const checkRotateWithSelectLeaf = ifElse(
    ({ selectLeaf, tree }) => selectLeaf.blocks.length === tree.leafMax,
    rotateLeaf,
    state => state
)
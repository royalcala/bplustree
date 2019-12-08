import { ifElse, pipe } from 'ramda'
import { setNoneLeaf } from './types'
import { connectWithNoneLeaf } from './noneLeaf'

const setBlocksPointers = state => {
    const { nodeL, nodeR } = state
    let distribution = nodeL.blocksPointers.length / 2
    nodeR.blocksPointers = nodeL.blocksPointers.splice(-Math.floor(
        distribution
    ))

    return state
}

const setBlocks = state => {
    const { nodeL, nodeR } = state
    let distribution = nodeL.blocks.length / 2
    nodeR.blocks = nodeL.blocks.splice(-Math.ceil(
        distribution
    ))
    return state
}
const reSelectNodes = state => {
    const { selectNoneLeaf, tree, nodeL: beforeL, nodeR: beforeR } = state
    state.nodeL = selectNoneLeaf
    state.nodeR = setNoneLeaf(tree)
    beforeL.parent = state.nodeR
    beforeR.parent = state.nodeR

    return state
}

const rotateNoneLeaf = pipe(
    reSelectNodes,
    setBlocks,
    setBlocksPointers,
    ({ nodeL, nodeR, tree }) => connectWithNoneLeaf(nodeL, nodeR, tree)

)


export const checkRotateWithSelectNoneLeaf = ifElse(
    ({ selectNoneLeaf, tree }) => selectNoneLeaf.blocks.length === tree.noneLeafMax,
    rotateNoneLeaf,
    state => state
)
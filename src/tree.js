export const defaultComparatorFx = (a, b) => {
    if (a.key > b.key) {
        return 1;
    }
    if (a.key < b.key) {
        return -1;
    }
    // a must be equal to b
    return 0;
}


export const incrementSizeTree = state => {
    const { tree } = state
    tree.size++
    return state
}

export const saveKeyValueInStore = state => {
    const { key, value, tree } = state
    tree.store[key] = {
        key,
        value
    }
    return state
}

export const moveToLeaf = ({ nextNode }) => state => {
    const { key, tree } = state
    // let node = nextNode === null ? tree.noneLeafs[startInNoneLeaf] : nextNode

    let i
    //CASE 1
    for (i = nextNode.blocks.length - 1; i > -1; i--) {
        if (key > nextNode.blocks[i].key) {
            nextNode = nextNode.blocksPointers[i + 1]
            if (nextNode.type === 'noneleaf')
                return moveToLeaf({ nextNode })(state)
            else {
                state.selectLeaf = nextNode
                return state
            }

        }
    }
    // }
    //CASE 2
    //is less than all
    nextNode = nextNode.blocksPointers[0]
    if (nextNode.type === 'noneleaf')//and key < node.blocks[0].key esto es inferido
        return moveToLeaf({ nextNode })(state)
    else {
        state.selectLeaf = nextNode
        return state
    }
    
}
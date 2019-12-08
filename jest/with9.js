import btree from '../src'

export default () => {
    describe('test with 9 inputs', () => {
        const tree = btree({})
        tree.put(10, 'hola')
        tree.put(1, 'hola')
        tree.put(2, 'hola')
        tree.put(4, 'hola')
        tree.put(5, 'hola')
        tree.put(11, 'hola')
        tree.put(12, 'hola')
        tree.put(13, 'hola')
        tree.put(14, 'hola')

        test('while->firstNoneLeaf->right===lastLeaf', () => {
            let node = tree.getTree.firstNoneLeaf
            while (node.type === 'noneleaf') {
                console.log('node.blocks::', node.blocks)
                // console.log('node.blocksPointers.length::', node.blocksPointers.length)
                let size = node.blocksPointers.length
                node = node.blocksPointers[size - 1]
            }
            console.log('lest.blocks::', node.blocks)
            expect(
                node
            ).toBe(
                tree.getTree.lastLeaf
            )
        })

        test('while->firstNoneLeaf->left===firstLeaf', () => {
            let node = tree.getTree.firstNoneLeaf
            while (node.type === 'noneleaf') {
                console.log('node.blocks::', node.blocks)
                node = node.blocksPointers[0]
            }
            console.log('first.blocks::', node.blocks)
            expect(
                node
            ).toBe(
                tree.getTree.leafs[0]
            )
        })

        test('check order min to max of Leafs.blocks', () => {
            const iterate = (leaf = 0, block = 0) => {
                // console.log('holis')
                let leafBlocks = tree.getTree.leafs[leaf].blocks
                // console.log('leafBlocks::', leafBlocks)
                let i
                let prevKey
                let nextKey
                for (i = block; i < leafBlocks.length; i++) {
                    nextKey = leafBlocks[i].key
                    if (prevKey)
                        expect(
                            prevKey
                        ).toBeLessThan(nextKey)
                    console.log(`leaf[${leaf}].blocks[${i}]:`, leafBlocks[i]);

                    prevKey = nextKey
                }
                if (tree.getTree.leafs[leaf].next !== null)
                    iterate(leaf + 1)
            }
            iterate()
        })



    })

}

import btree from '../src'

export default () => {
    describe('test with 5 inputs', () => {
        const tree = btree({})
        tree.put(10, 'hola')
        tree.put(1, 'hola')
        tree.put(2, 'hola')
        tree.put(4, 'hola')
        tree.put(5, 'hola')
        test('total noneLeafs', () => {
            expect(
                Object.entries(tree.getTree.noneLeafs).length
            ).toBe(3)
        })

        test('total first noneleaf blocks', () => {
            expect(
                tree.getTree.noneLeafs[0].blocks.length
            ).toBe(1)
        })

        test('key of first none leaf first block', () => {
            expect(
                tree.getTree.noneLeafs[0].blocks[0].key
            ).toBe(2)
        })

        test('firstNoneLeaf.blocksPointers.length', () => {
            expect(
                tree.getTree.firstNoneLeaf.blocksPointers.length
            ).toBe(
                2
            )
        })
        test('firstNoneLeaf', () => {
            expect(
                tree.getTree.firstNoneLeaf.blocks[0].key
            ).toBe(4)
        })

        test('firstNoneLeaf->left.blocksPointers.length', () => {
            expect(
                tree.getTree.firstNoneLeaf.blocksPointers[0].blocksPointers.length
            ).toBe(
                2
            )
        })
        test('firstNoneLeaf->right.blocksPointers.length', () => {
            expect(
                tree.getTree.firstNoneLeaf.blocksPointers[1].blocksPointers.length
            ).toBe(
                2
            )
        })

        test('firstNoneLeaf->left.key', () => {
            expect(
                tree.getTree.firstNoneLeaf.blocksPointers[0].blocks[0].key
            ).toBe(
                2
            )
        })

        test('firstNoneLeaf->right.key', () => {
            expect(
                tree.getTree.firstNoneLeaf.blocksPointers[1].blocks[0].key
            ).toBe(
                5
            )
        })
        test('firstNoneLeaf->right->right.key', () => {
            expect(
                tree.getTree.firstNoneLeaf.blocksPointers[1].blocksPointers[1].blocks[0].key
            ).toBe(
                5
            )
        })
        test('while->firstNoneLeaf->right===lastLeaf', () => {
            let node = tree.getTree.firstNoneLeaf
            while (node.type === 'noneleaf') {
                let size = node.blocksPointers.length
                node = node.blocksPointers[size-1] 
            }
            expect(
                node
            ).toBe(
                tree.getTree.lastLeaf
            )
        })

        test('manual->firstNoneLeaf->right->right===lastLeaf', () => {
            expect(
                tree.getTree.firstNoneLeaf.blocksPointers[1].blocksPointers[1]
            ).toBe(
                tree.getTree.lastLeaf
            )
        })
        test('while->firstNoneLeaf->left===firstLeaf', () => {
            let node = tree.getTree.firstNoneLeaf
            while (node.type === 'noneleaf') {
                node = node.blocksPointers[0] 
            }
            expect(
                node
            ).toBe(
                tree.getTree.leafs[0]
            )
        })

        test('manual->firstNoneLeaf->left->left===firstLeaf', () => {
            expect(
                tree.getTree.firstNoneLeaf.blocksPointers[0].blocksPointers[0]
            ).toBe(
                tree.getTree.leafs[0]
            )
        })

        tree.getTree.firstNoneLeaf.blocks[0].value = 'holaChanged'
        test('store check reference', () => {
            expect(
                tree.getTree.store[4].value
            ).toBe('holaChanged')
        })

        test('total of leafs', () => {
            expect(
                Object.entries(tree.getTree.leafs).length
            ).toBe(4)
        })
        test('tree.size', () => {
            expect(
                tree.getTree.size
            ).toBe(5)
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

        test('check order2 min to max of Leafs.blocks', () => {
            const iterate = (leaf, block = 0) => {
                // console.log('holis')
                leaf.blocks
                // console.log('leafBlocks::', leafBlocks)
                let i
                let prevKey
                let nextKey
                for (i = block; i < leaf.blocks.length; i++) {
                    nextKey = leaf.blocks[i].key
                    if (prevKey)
                        expect(
                            prevKey
                        ).toBeLessThan(nextKey)
                    // console.log(`leaf[x].blocks[${i}]:`, leaf.blocks[i]);

                    prevKey = nextKey
                }
                if (leaf.next !== null)
                    iterate(leaf.next)
            }
            iterate(tree.getTree.leafs[0])
        })



    })

}

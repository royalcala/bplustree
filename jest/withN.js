import btree from '../src'

export default () => {
    describe('test with N inputs', () => {
        const tree = btree({})


        test('insert', () => {
            let howManyMillions = n => n * 1000000
            // let number = howManyMillions(1)
            // insert (28446ms) with 1000000
            //mockDataTreeBlack: 1382.139ms with 1000000
            // insert (3808ms) with 100000
            // insert (2283ms)
            // mockDataTreeBlack: 145.555ms
            let number = 100000
            for (let i = 0; i < number; i++) {
                // console.time(`put${i}`)
                tree.put(i, i)
                // console.timeEnd(`put${i}`)
            }
            expect(
                tree.getTree.size
            ).toBe(
                number
            )
        })

        test('while->firstNoneLeaf->right===lastLeaf', () => {
            let node = tree.getTree.firstNoneLeaf
            while (node.type === 'noneleaf') {
                // console.log('node.blocks::', node.blocks)
                // console.log('node.blocksPointers.length::', node.blocksPointers.length)
                let size = node.blocksPointers.length
                node = node.blocksPointers[size - 1]
            }
            console.log('last.blocks::', node.blocks)
            expect(
                node
            ).toBe(
                tree.getTree.lastLeaf
            )
        })

        test('while->firstNoneLeaf->left===firstLeaf', () => {
            let node = tree.getTree.firstNoneLeaf
            while (node.type === 'noneleaf') {
                // console.log('node.blocks::', node.blocks)
                node = node.blocksPointers[0]
            }
            console.log('first.blocks::', node.blocks)
            expect(
                node
            ).toBe(
                tree.getTree.leafs[0]
            )
        })


        test('check order min to max of Leafs.blocks', async () => {
            let loops = 0
            const iterate = (leaf = 0, block = 0) => new Promise((resolve, reject) => {
                // console.log('holis')
                let leafBlocks = tree.getTree.leafs[leaf].blocks
                // console.log('leafBlocks::', leafBlocks)
                let i
                let prevKey
                let nextKey
                for (i = block; i < leafBlocks.length; i++) {
                    loops++
                    nextKey = leafBlocks[i].key
                    if (prevKey)
                        expect(
                            prevKey
                        ).toBeLessThan(nextKey)

                    // console.log('hola')
                    // console.log(`leaf[${leaf}].blocks[${i}]:`, leafBlocks[i]);

                    prevKey = nextKey
                }
                // console.log('iteratorN:', leaf)
                resolve(tree.getTree.leafs[leaf].next)
                // if (tree.getTree.leafs[leaf].next !== null) {
                //     iterate(leaf + 1)
                // }

            }).then(x => {
                // console.log(x.next !== null)
                if (x.next !== null) {
                    return iterate(leaf + 1)
                }
            })
            await iterate()
            console.log('loops::', loops)
        })
        // test('check order min to max of Leafs.blocks', async () => {
        //     const iterate = (leaf = 0, block = 0) => {
        //         // console.log('holis')
        //         let leafBlocks = tree.getTree.leafs[leaf].blocks
        //         // console.log('leafBlocks::', leafBlocks)
        //         let i
        //         let prevKey
        //         let nextKey
        //         for (i = block; i < leafBlocks.length; i++) {
        //             nextKey = leafBlocks[i].key
        //             if (prevKey)
        //                 expect(
        //                     prevKey
        //                 ).toBeLessThan(nextKey)

        //             // console.log('hola')
        //             // console.log(`leaf[${leaf}].blocks[${i}]:`, leafBlocks[i]);

        //             prevKey = nextKey
        //         }
        //         // console.log('iteratorN:', leaf)
        //         if (tree.getTree.leafs[leaf].next !== null) {
        //             // iterate(leaf + 1)
        //             // setImmediate(() => {
        //             //     iterate(leaf + 1)
        //             // });
        //             // console.log('leaf::', leaf)
        //             // setTimeout(() => {
        //             //     console.log('run iterate')
        //             //     iterate(leaf + 1)
        //             // }, 5);
        //         }

        //     }
        //     iterate()
        // })
        // test('check order min to max of Leafs.blocks', () => {
        //     const iterate = (leaf = 0, block = 0) => new Promise((resolve, reject) => {
        //         // console.log('holis')
        //         let leafBlocks = tree.getTree.leafs[leaf].blocks
        //         // console.log('leafBlocks::', leafBlocks)
        //         let i
        //         let prevKey
        //         let nextKey
        //         for (i = block; i < leafBlocks.length; i++) {
        //             nextKey = leafBlocks[i].key
        //             // if (prevKey)
        //             //     expect(
        //             //         prevKey
        //             //     ).toBeLessThan(nextKey)
        //             // console.log(`leaf[${leaf}].blocks[${i}]:`, leafBlocks[i]);

        //             prevKey = nextKey
        //         }
        //         // console.log('iteratorN:', leaf)
        //         if (tree.getTree.leafs[leaf].next !== null) {
        //             resolve(iterate(leaf + 1))
        //         } else {
        //             resolve(null)
        //         }

        //     })
        //     iterate()
        // })
        // test('check order min to max of Leafs.blocks', () => {
        //     const iterate = (leaf = 0, block = 0) => {
        //         // console.log('holis')
        //         let leafBlocks = tree.getTree.leafs[leaf].blocks
        //         // console.log('leafBlocks::', leafBlocks)
        //         let i
        //         let prevKey
        //         let nextKey
        //         for (i = block; i < leafBlocks.length; i++) {
        //             nextKey = leafBlocks[i].key
        //             if (prevKey)
        //                 expect(
        //                     prevKey
        //                 ).toBeLessThan(nextKey)
        //             // console.log(`leaf[${leaf}].blocks[${i}]:`, leafBlocks[i]);

        //             prevKey = nextKey
        //         }
        //         if (tree.getTree.leafs[leaf].next !== null) {
        //             return iterate(leaf + 1)
        //         } else
        //             return false
        //     }
        //     iterate()
        // })
        // test('check order2 min to max of Leafs.blocks', () => {
        //     // function iterate(x) {
        //     //     // The following condition 
        //     //     // is the base case.
        //     //     if (!x) {
        //     //         return;
        //     //     }
        //     //     a(--x);
        //     // }
        //     const iterate = (leaf, block = 0) => {
        //         // console.log('holis')
        //         leaf.blocks
        //         // console.log('leafBlocks::', leafBlocks)
        //         let i
        //         let prevKey
        //         let nextKey
        //         for (i = block; i < leaf.blocks.length; i++) {
        //             nextKey = leaf.blocks[i].key
        //             if (prevKey)
        //                 expect(
        //                     prevKey
        //                 ).toBeLessThan(nextKey)
        //             // console.log(`leaf[x].blocks[${i}]:`, leaf.blocks[i]);

        //             prevKey = nextKey
        //             if (i < leaf.blocks.length) {
        //                 if (leaf.next !== null) {
        //                     setTimeout(function () {
        //                         iterate(leaf.next)
        //                     }, 10)
        //                 }

        //             }
        //         }

        //     }
        //     iterate(tree.getTree.leafs[0])
        // })

        // test('check order2 min to max of Leafs.blocks', () => {
        //     // console.log(' tree.getTree.lastLeaf::', tree.getTree.lastLeaf.next)
        //     const iterate = (leaf, block = 0) => {
        //         // console.log('holis')
        //         leaf.blocks
        //         // console.log('leafBlocks::', leafBlocks)
        //         let i
        //         let prevKey
        //         let nextKey
        //         for (i = block; i < leaf.blocks.length; i++) {
        //             nextKey = leaf.blocks[i].key
        //             if (prevKey)
        //                 expect(
        //                     prevKey
        //                 ).toBeLessThan(nextKey)
        //             // console.log(`leaf[x].blocks[${i}]:`, leaf.blocks[i]);

        //             prevKey = nextKey
        //         }
        //         if (leaf.next !== null)
        //             iterate(leaf.next)
        //     }
        //     iterate(tree.getTree.lastLeaf)
        // })



    })

}

import btree from '../src'

export default () => {
    describe('test with 3 inputs', () => {
        const tree = btree({})
        tree.put(10, 'hola')
        tree.put(1, 'hola')
        tree.put(2, 'hola')
        test('total noneLeafs', () => {
            expect(
                Object.entries(tree.getTree.noneLeafs).length
            ).toBe(1)
        })

        test('total first noneleaf blocks first block', () => {
            expect(
                tree.getTree.noneLeafs[0].blocks.length
            ).toBe(1)
        })

        test('key of first none leaf', () => {
            expect(
                tree.getTree.noneLeafs[0].blocks[0].key
            ).toBe(2)
        })

        test('total of leafs', () => {
            expect(
                Object.entries(tree.getTree.leafs).length
            ).toBe(2)
        })


    })

}

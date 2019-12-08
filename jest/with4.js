import btree from '../src'

export default () => {
    describe('test with 4 inputs', () => {
        const tree = btree({})
        tree.put(10, 'hola')
        tree.put(1, 'hola')
        tree.put(2, 'hola')
        tree.put(4, 'hola')
        test('total noneLeafs', () => {
            expect(
                Object.entries(tree.getTree.noneLeafs).length
            ).toBe(1)
        })

        test('total first noneleaf blocks', () => {
            expect(
                tree.getTree.noneLeafs[0].blocks.length
            ).toBe(2)
        })
        
        test('key of first none leaf first block', () => {
            expect(
                tree.getTree.noneLeafs[0].blocks[0].key
            ).toBe(2)
        })

        test('key of second none leaf', () => {
            expect(
                tree.getTree.noneLeafs[0].blocks[1].key
            ).toBe(4)
        })

        test('total of leafs', () => {
            expect(
                Object.entries(tree.getTree.leafs).length
            ).toBe(3)
        })


    })

}

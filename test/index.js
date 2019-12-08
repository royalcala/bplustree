console.clear()
console.log('in b+tree')
import btree from '../src'
// const tableRef2 = {
//     'key1': {
//         key: 'the key',
//         value: 'the value'
//     }
// }
// let array2 = [tableRef2['key1']]
// console.log('array2::', array2)
// tableRef2['key1'].value = 'the value change'
// console.log('array2::', array2)
const tree = btree({})
tree.put(10, 'hola')
tree.put(1, 'hola')
tree.put(2, 'hola')//top.left
tree.put(3, 'hola')//on top
tree.put(4, 'hola')//top right
tree.put(5, 'hola')//top right
console.log('tree.noneLeafs::', tree.getTree.noneLeafs[2].blocks)
console.log('tree.leafs::', tree.getTree.leafs[1].blocks)

console.log('all leafs:::')
Object.entries(tree.getTree.leafs).forEach(e => {
    console.log(e[1].blocks)
});
// console.log('tree.getTree.noneLeafs[0]::',tree.getTree.noneLeafs[0].blocksPointers[0])

// let hola = {
//     a: 1
// }
// let hola2 = hola = {
//     b: 2
// }
// console.log('hola::',hola)
// console.log('hola2::',hola2)
// hola2.b=3
// console.log('hola::',hola)
// tree.getTree.leafs.id0.memory[0].value = 'changed in both sides'
// console.log('tree.getTree.leafs.id0.memory::', tree.getTree.leafs.id0.memory)
// console.log('tree.getTree::', tree.getTree)

// var nombres = [
//     tree.getTree.storeRef[1],
//     tree.getTree.storeRef[2],
//     tree.getTree.storeRef[10],
//     'asdf',
//     'asdfaff'
// ]
// let distribution = nombres.length / 2
// var masculinos = nombres.slice(-Math.ceil(distribution));
// nombres.splice(-Math.ceil(-Math.floor(distribution)))
// // console.log('Math.floor(distribution)::',Math.floor(distribution))
// // masculinos[0].value = 'changueeed in mascu'
// console.log('masculinos::', masculinos)
// console.log('nombres::', nombres)

// console.log('tree.getTree::', tree.getTree)
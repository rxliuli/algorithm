import { treeEachOfBreadthFirst } from '../treeEachOfBreadthFirst'

it('使用广度优先算法遍历', () => {
  const tree = {
    id: 1,
    children: [
      { id: 0 },
      { id: 3, children: [{ id: 2 }, { id: 7 }] },
      {
        id: 6,
        children: [
          {
            id: 5,
            children: [{ id: 4, children: [{ id: 8 }] }, { id: 9 }],
          },
        ],
      },
    ],
  }
  const res: number[] = []
  treeEachOfBreadthFirst(
    [tree],
    (node, path) => {
      res.push(node.id)
      console.log(node.id)
      console.log(path)
    },
    { id: 'id', children: 'children' },
  )
  expect(res).toEqual([1, 0, 3, 6, 2, 7, 5, 4, 9, 8])
  expect(tree).toEqual(JSON.parse(JSON.stringify(tree)))
})

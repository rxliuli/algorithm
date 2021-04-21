/*
1.5.9　画出下面的 id[] 数组所对应的树。这可能是加权 quick-union 算法得到的结果吗？解释为什么不可能，或者给出能够得到该数组的一系列操作。
id=[1,1,3,1,5,6,1,3,4,5]

quick-union 可能，加权 quick-union 就不可能了
 */

import { UFWithQuickUnion, UFWithWeightedQuickUnion } from '../UF'
import { treeEach, treeToList } from '@liuli-util/tree'
import { sortBy } from '@liuli-util/array'
import { UFUtil } from '../UFUtil'

type Node = { id: number; children?: Node[] }

describe('1.5.9', () => {
  const idList = [1, 1, 3, 1, 5, 6, 1, 3, 4, 5]
  const sortCompareFn = ([p]: [number, number]) => p
  it('转换为 tree', () => {
    console.log(UFUtil.convertTree(idList))
  })
  it('quick union', () => {
    /**
     * quick-union 有一个特点，即 union(p, q) 之后 p 一定是子节点，q 一定是父节点。反过来说，如果将数组视为一棵树，采用深度有限的遍历算法，那么将每个节点和父节点作为 [p,q] 收集为数组，一定是操作系列
     * 注：这里有个常见的盲区是 union(p, q) 在 q 并非彼时的根节点时，q 自然不会是父节点，所以需要采取深度优先算法，下面有个示例实现 {@link genOpList2} 就是没有考虑这个问题的实现，即便最终产生的 opList 只有顺序存在些许不同，也会导致最终的 idList 不一样
     * @param idList
     */
    function genOpList(idList: number[]): [number, number][] {
      const res: [number, number][] = []
      treeEach(
        UFUtil.convertTree(idList),
        (node, path) => {
          if (path.length === 1) {
            return
          }
          res.push([node.id, path[path.length - 2]])
        },
        {
          id: 'id',
          children: 'children',
        },
      )
      return res
    }

    function genOpList2(idList: number[]): [number, number][] {
      return idList.reduce((res, q, p) => {
        if (p === q) {
          return res
        }
        res.push([p, q])
        return res
      }, [] as [number, number][])
    }

    function testGenList(genOpList: (idList: number[]) => [number, number][]) {
      const uf = new UFWithQuickUnion(10)
      genOpList(idList).forEach(([p, q]) => uf.union(p, q))
      return uf
    }

    expect(sortBy(genOpList(idList), sortCompareFn)).toEqual(
      sortBy(genOpList2(idList), sortCompareFn),
    )
    expect(testGenList(genOpList).idList).toEqual(idList)
    expect(testGenList(genOpList2).idList).not.toEqual(idList)
  })
  describe('加权 quick union', () => {
    class QuickUnionError extends Error {
      id: number
      parent: number

      constructor(
        msg: string,
        options: Pick<QuickUnionError, 'id' | 'parent'>,
      ) {
        super(msg)
        this.id = options.id
        this.parent = options.parent
      }
    }

    /**
     * 加权 quick-union 特点是 union(p, q) 谁连接到谁取决于 p, q 彼时根节点的长度，一定是短的连接到长的。换言之，将数组视为一棵树，那么每个父节点除该子节点的数量都大于等于每个子节点的数量。
     * 注：最后需要根据 p 的子节点数量排序，将小的放在前面，毕竟 p 是要连接到 q 的
     * @param idList
     * @throws QuickUnionError
     */
    function genOpList(idList: number[]): [number, number][] {
      const tree = UFUtil.convertTree(idList)
      const list = treeToList(tree, {
        id: 'id',
        children: 'children',
        path: 'path' as const,
      })

      function checkNodeCountByPath(path: number[]): boolean {
        const pathList = list.map((node) => node.path.join(','))
        const pathStr = path.join(',')
        const nodeSubCount = pathList.filter((s) => s.startsWith(pathStr))
          .length
        const parentPathStr = path.slice(0, path.length - 1).join(',')
        const parentSubCount = pathList.filter(
          (s) => s.startsWith(parentPathStr) && !s.startsWith(pathStr),
        ).length
        return parentSubCount < nodeSubCount
      }

      const res: [number, number][] = []
      treeEach(
        tree,
        (node, path) => {
          console.log(node.id)
          if (path.length === 1) {
            return
          }
          const parent = path[path.length - 2]
          if (checkNodeCountByPath(path)) {
            throw new QuickUnionError(
              '父节点的子节点数量不能比子节点的数量更少',
              {
                id: node.id,
                parent: parent,
              },
            )
          }
          res.push([node.id, parent])
        },
        {
          id: 'id',
          children: 'children',
        },
      )

      return sortBy(
        res,
        ([p]) => list.filter((node) => node.path.includes(p)).length,
      )
    }

    it('测试 genOpList', () => {
      function getIdList() {
        const uf = new UFWithWeightedQuickUnion(10)
        const arr: [number, number][] = [
          [9, 0],
          [3, 4],
          [5, 8],
          [7, 2],
          [2, 1],
          [5, 7],
          [0, 3],
          [4, 2],
        ]
        arr.forEach(([p, q]) => uf.union(p, q))
        return uf.idList
      }

      const idList = getIdList()

      const opList = genOpList(idList)
      const uf = new UFWithWeightedQuickUnion(10)
      console.log(opList)
      opList.forEach(([p, q]) => uf.union(p, q))
      console.log(uf.idList)
      expect(uf.idList).toEqual(idList)
    })
    it('测试测试数据', () => {
      expect(() => genOpList([1, 1, 3, 1, 5, 6, 1, 3, 4, 5])).toThrowError()
    })
  })
})

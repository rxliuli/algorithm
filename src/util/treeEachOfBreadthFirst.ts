import { TreeOption } from '@liuli-util/tree/src/treeOption'

/**
 * 使用广度优先算法遍历一棵树
 * @param nodeList
 * @param fn
 * @param options
 */
export function treeEachOfBreadthFirst<
  T extends object,
  C extends TreeOption<T>
>(nodeList: T[], fn: (t: T, path: T[C['id']][]) => void, options: C) {
  const pathMap = new Map<any, any[]>()

  function f(nodeList: T[]) {
    const res: T[] = []
    for (let node of nodeList) {
      const id = node[options.id]
      const path = pathMap.get(id)!
      fn(node, path)
      const child = (((node[options.children] as any) as T[]) || []).map(
        (node) => {
          const id = node[options.id]
          pathMap.set(id, path.concat(id))
          return node
        },
      )
      res.push(...child)
    }
    if (res.length > 0) {
      f(res)
    }
  }

  nodeList.forEach((node) => {
    const id = node[options.id]
    pathMap.set(id, [id])
  })

  f(nodeList)
}

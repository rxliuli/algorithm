import { listToTree, ReType } from '../util/listToTree'
import { treeMap } from '@liuli-util/tree'

export class UFUtil {
  /**
   * 将一个 quick-union 的数组转换为一棵树
   * @param idList
   */
  static convertTree<R extends ReType<{ id: number }, 'children'>>(
    idList: number[],
  ): R[] {
    const nodeList = idList.map((v, i) => ({
      id: i,
      parent: v === i ? null : v,
    }))
    let tree = listToTree(nodeList, {
      children: 'children',
      id: 'id',
      parentId: 'parent',
    })
    return treeMap(
      tree,
      (node) => {
        const { parent, ...rest } = node
        return rest
      },
      {
        id: 'id',
        children: 'children',
      },
    ) as R[]
  }
}

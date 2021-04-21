/*
1.5.14　根据高度加权的quick-union 算法。给出UF 的一个实现，使用和加权quick-union 算法相同的策略，但记录的是树的高度并总是将较矮的树连接到较高的树上。用算法证明 N 个触点的树的高度不会超过其大小的对数级别。

可以进行一个推导，最坏情况下
| count | height  |
| ----- | ------- |
| 1     | 1       |
| 2     | 2       |
| 4     | 3       |
| 8     | 4       |
| 16    | 5       |
| n     | 2^(h-1) |

换言之，一颗节点为 n 的树，最大高度应该只有 `n >= 2^(h-1)` => `h <= log2(n)+1`
 */

import { UFWithWeightedQuickUnion } from '../UF'
import { UFUtil } from '../UFUtil'
import { treeToList } from '@liuli-util/tree'
import { sortBy } from '@liuli-util/array'
import { RandomUtil } from '../RandomUtil'

class UF extends UFWithWeightedQuickUnion {
  union(p: number, q: number) {
    let pRoot = this.find(p)
    let qRoot = this.find(q)
    if (pRoot === qRoot) {
      return
    }
    if (this.sz[pRoot] > this.sz[qRoot]) {
      ;[pRoot, qRoot] = [qRoot, pRoot]
    }
    this.idList[pRoot] = qRoot
    this.sz[qRoot]++
    this._count--
  }
}

it('1.5.14', () => {
  function testUF(count: number) {
    //最坏情况
    const uf = new UF(count)
    const opList = RandomUtil.array(
      count,
      () =>
        [RandomUtil.integer(0, count), RandomUtil.integer(0, count)] as const,
    )
    opList.forEach(([p, q]) => uf.union(p, q))

    const list = treeToList(UFUtil.convertTree(uf.idList), {
      id: 'id',
      children: 'children',
      path: 'path' as const,
    })
    const height = sortBy(list, (item) => -item.path.length)[0].path.length
    const maxHeight = Math.ceil(Math.log2(count))
    console.log(height, maxHeight)
    expect(height).toBeLessThanOrEqual(maxHeight)
  }

  testUF(RandomUtil.integer(10000))
})

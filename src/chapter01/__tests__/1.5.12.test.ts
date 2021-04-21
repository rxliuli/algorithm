/*
1.5.12　使用路径压缩的 quick-union 算法。根据路径压缩修改 quick-union 算法（请见 1.5.2.3 节），在 find() 方法中添加一个循环来将从 p 到根节点的路径上的每个触点都连接到根节点。给出一列输入，使该方法能够产生一条长度为 4 的路径。注意：该算法的所有操作的均摊成本已知为对数级别。
 */

import { UFWithWeightedQuickUnion } from '../UF'
import { testUF } from './UF.test'
import { UFUtil } from '../UFUtil'

class UF extends UFWithWeightedQuickUnion {
  /**
   * 在每次 find 时将路径上所有的节点全部连接至根节点
   * @param p
   */
  find(p: number): number {
    const res: number[] = []
    while (p !== this.idList[p]) {
      res.push(p)
      p = this.idList[p]
    }
    for (let i of res) {
      this.idList[i] = p
    }
    return p
  }
}

describe('1.5.12', () => {
  it('基本示例', () => {
    testUF(UF)
  })
  it('传入参数产生一条长度为 4 的路径', async () => {
    const uf = new UF(10)
    //其实就是针对 UFWithWeightedQuickUnion 的最坏情况 union 而已
    ;[
      [0, 1],
      [2, 3],
      [4, 5],
      [6, 7],
      [1, 3],
      [5, 7],
      [3, 7],
    ].forEach(([k, v]) => uf.union(k, v))
    const res = UFUtil.convertTree(uf.idList)
    console.log(JSON.stringify(res))
    expect(res[0].children![0].children![0].children![0]).toEqual({
      id: 0,
    })
  })
})

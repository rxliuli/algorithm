/*
1.5.3　使用加权 quick-union 算法（请见算法 1.5）完成练习 1.5.1。
 */

import { UFWithWeightedQuickUnion } from '../UF'
import { StatisticsUF, testStatisticsUF } from './1.5.1.test'
import { UFUtil } from './1.5.12.test'

class UF extends UFWithWeightedQuickUnion implements StatisticsUF {
  private _size = 0
  private _szSize = 0

  /**
   * 访问数组 (路径长度 - 1) * 2 + 1 或者 路径长度
   * @param p
   */
  find(p: number): number {
    this._size++
    while (p !== this.idList[p]) {
      this._size += 2
      p = this.idList[p]
    }

    return p
  }

  /**
   * 访问数组的次数 find * 2 + 1
   * 访问 sz 的次数 4
   * @param p
   * @param q
   */
  union(p: number, q: number) {
    this._size = 0
    this._szSize = 0
    let pId = this.find(p)
    let qId = this.find(q)
    if (pId === qId) {
      return
    }
    if (this.sz[pId] > this.sz[qId]) {
      ;[pId, qId] = [qId, pId]
    }
    this.idList[pId] = qId
    this.sz[qId] += this.sz[pId]
    this._szSize += 4
    this._size++
    this._count--
  }

  get size() {
    return this._size
  }

  get szSize() {
    return this._szSize
  }
}

it('1.5.3', () => {
  const res = testStatisticsUF(UF)
  //TODO 这里的 size 可能有点问题，ref：https://github.com/tongji4m3/Algorithm-fourth-edition/blob/master/1.5/1.5.1-1.5.11.md
  console.log(
    res
      .map((item) => item.list.join(' ') + ' 数组访问：' + item.size)
      .join('\n'),
  )
  expect(UFUtil.convertTree(res[res.length - 1].list)).toEqual([
    {
      id: 2,
      children: [
        { id: 1 },
        { id: 4, children: [{ id: 0, children: [{ id: 9 }] }, { id: 3 }] },
        { id: 7 },
        { id: 8, children: [{ id: 5 }] },
      ],
    },
    { id: 6 },
  ])
})

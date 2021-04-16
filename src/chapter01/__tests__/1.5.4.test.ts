/*
1.5.4　在正文的加权 quick-union 算法示例中，对于输入的每一对整数（包括对照输入和最坏情况下的输入），给出 id[] 和 sz[] 数组的内容以及访问数组的次数。

分析:
相比于
 */

import { UFWithWeightedQuickUnion } from '../UF'
import { testStatisticsUF } from './1.5.1.test'

class UF extends UFWithWeightedQuickUnion {
  private _size = 0
  private _szSize = 0

  find(p: number): number {
    this._size++
    while (p !== this.idList[p]) {
      this._size += 2
      p = this.idList[p]
    }

    return p
  }

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
    this._count--
    this._size++
    this._szSize += 4
  }

  get size() {
    return this._size
  }

  get szSize() {
    return this._szSize
  }
}

describe('1.5.4', () => {
  it('基本示例', () => {
    const res = testStatisticsUF(UF)
    console.log(res.map(({ size }) => size))
  })
})

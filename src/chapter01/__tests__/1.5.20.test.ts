/*
1.5.20　动态生长。使用链表或大小可变的数组实现加权quick-union 算法，去掉需要预先知道对象数量的限制。为 API 添加一个新方法 newSite()，它应该返回一个类型为 int 的标识符。
 */

import { UFWithWeightedQuickUnion } from '../UF'
import { testUF } from './UF.test'

/**
 * 其实用链表或大小可变的数组实现起来都不是很方便，因为它们的 api 都是将元素追加到最后一个然后自动扩容，并没有直接根据下标设置，越界自动扩容的机制
 */
class UFWithArrayList extends UFWithWeightedQuickUnion {
  constructor() {
    super((arguments[0] as number) || 0)
  }

  find(p: number): number {
    while (p !== this.idList[p]) {
      const temp = this.idList[p]
      if (temp === undefined) {
        return p
      }
      p = temp
    }
    return p
  }

  union(p: number, q: number) {
    let pId = this.find(p)
    let qId = this.find(q)
    if (pId === qId) {
      return
    }
    if (this.sz[pId] === undefined) {
      this.sz[pId] = 1
    }
    if (this.sz[qId] === undefined) {
      this.sz[qId] = 1
    }
    if (this.sz[pId] > this.sz[qId]) {
      ;[pId, qId] = [qId, pId]
    }
    this.idList[pId] = qId
    this.sz[qId] += this.sz[pId]
    this._count--
  }

  newSite() {
    return this.idList.length
  }
}

describe('1.5.20', () => {
  it('标准测试', () => {
    testUF(UFWithArrayList)
  })
  it('基本示例', () => {
    const uf = new UFWithArrayList()
    expect(uf.newSite()).toBe(0)
    uf.union(0, 9)
    console.log(uf.idList, uf.idList.length)
    console.log(uf.find(0), uf.find(9))
    expect(uf.connected(0, 9)).toBeTruthy()
    expect(uf.newSite()).toBe(1)
  })
  it('测试 find 的行为', () => {
    const uf = new UFWithArrayList()
    expect(uf.find(9)).toBe(9)
    expect(uf.newSite()).toBe(0)
  })
})

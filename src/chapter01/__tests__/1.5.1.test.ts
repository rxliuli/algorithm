/*
1.5.1　使用 quick-find 算法处理序列 9-0 3-4 5-8 7-2 2-1 5-7 0-3 4-2 。对于输入的每一对整数，给出 id[] 数组的内容和访问数组的次数。
 */

import { IUF, UFWithQuickFind } from '../UF'
import { Class } from 'type-fest'

export interface StatisticsUF {
  readonly idList: number[]
  size: number
}

export function testStatisticsUF(
  UF: Class<IUF & StatisticsUF, [count: number]>,
) {
  const uf = new UF(10)
  const arr = [
    [9, 0],
    [3, 4],
    [5, 8],
    [7, 2],
    [2, 1],
    [5, 7],
    [0, 3],
    [4, 2],
  ]
  const res = arr.reduce(
    (res, [p, q]) => {
      uf.union(p, q)
      res.push({
        list: [...uf.idList],
        size: uf.size,
      })
      return res
    },
    [] as {
      list: number[]
      size: number
    }[],
  )
  return res
}

class UF extends UFWithQuickFind implements StatisticsUF {
  private _size = 0

  /**
   * 访问数组一次
   * @param p
   */
  find(p: number): number {
    this._size++
    return this.idList[p]
  }

  /**
   * 访问数组的次数 2 + 2 * 已经连接的值 + N
   * @param p
   * @param q
   */
  union(p: number, q: number): void {
    this._size = 0
    const pId = this.find(p)
    const qId = this.find(q)
    if (pId === qId) {
      return
    }
    for (let i = 0, len = this.idList.length; i < len; i++) {
      if (this.idList[i] === pId) {
        this.idList[i] = qId
        this._size++
      }
      this._size++
    }
    this._count--
  }

  get size() {
    return this._size
  }
}

it('1.5.1', () => {
  const res = testStatisticsUF(UF)
  console.log(res)
})

/*
1.5.2　使用 quick-union 算法（请见 1.5.2.3 节代码框）完成练习 1.5.1。另外，在处理完输入的每对整数之后画出id[] 数组表示的森林。
 */

import { UFWithQuickUnion } from '../UF'
import { StatisticsUF, testStatisticsUF } from './1.5.1.test'
import { UFUtil } from './1.5.12.test'

class UF extends UFWithQuickUnion implements StatisticsUF {
  private _size = 0

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
   * 最好情况是 1，最坏情况是 2N
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
    this.idList[pId] = qId
    this._size++
    this._count--
  }

  get size() {
    return this._size
  }
}

it('1.5.2', () => {
  const res = testStatisticsUF(UF)
  console.log(res)
  expect(UFUtil.convertTree(res[res.length - 1].list)).toEqual([
    {
      id: 1,
      children: [
        { id: 2, children: [{ id: 7 }] },
        {
          id: 4,
          children: [{ id: 0, children: [{ id: 9 }] }, { id: 3 }],
        },
        { id: 8, children: [{ id: 5 }] },
      ],
    },
    { id: 6 },
  ])
})

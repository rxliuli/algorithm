/*
1.4.12　编写一个程序，有序打印给定的两个有序数组（含有 N 个 int 值）中的所有公共元素，程序在最坏情况下所需的运行时间应该和 N 成正比。
TODO 还需优化
 */

import { BinarySearch } from '../BinarySearch'
import { groupBy } from '@liuli-util/array'

describe('1.4.12', () => {
  function testF(f: (a1: number[], a2: number[]) => number[]) {
    expect(f([0, 1, 2, 3], [1, 2, 3, 4])).toEqual([1, 2, 3])
    expect(f([1, 2, 3], [1, 2])).toEqual([1, 2])
    expect(f([1, 2, 2, 3], [1, 2, 2])).toEqual([1, 2])
  }

  /**
   * 复杂度是 m+n，Set.has 的复杂度是 1
   */
  it('使用 Set', () => {
    function f(a1: number[], a2: number[]): number[] {
      const set = new Set(a2)
      const hasSet = new Set()
      const res = []
      for (let i of a1) {
        if (set.has(i) && !hasSet.has(i)) {
          res.push(i)
          hasSet.add(i)
        }
      }
      return res
    }

    testF(f)
  })
  it('使用 groupBy', () => {
    function f(a1: number[], a2: number[]): number[] {
      const map = groupBy([...a1, ...a2], (i) => i)
      const res = []
      for (let [k, v] of map) {
        if (v.length > 1) {
          res.push(k)
        }
      }
      return res
    }

    testF(f)
  })
  it('使用二分搜索', () => {
    /**
     * 复杂度实际上会是 logM*N
     * @param a1
     * @param a2
     */
    function f(a1: number[], a2: number[]): number[] {
      const res: number[] = []
      ;[a1, a2] = a1.length <= a2.length ? [a1, a2] : [a2, a1]
      for (let i of a1) {
        if (
          BinarySearch.searchSortArray(a2, i) !== -1 &&
          (res.length === 0 || i !== res[res.length - 1])
        ) {
          res.push(i)
        }
      }
      return res
    }

    testF(f)
  })
})

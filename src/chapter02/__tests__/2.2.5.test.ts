/*
2.2.5　当输入数组的大小 N=39 时，给出自顶向下和自底向上的归并排序中各次归并子数组的大小及顺序。

答：
自底而上基本上是在二分，直到 r===l 为止的深度优先算法的节点遍历路径。自底而上大致上是反向的广度优先算法的节点遍历路径。
已在下面的 `genMergeSortPath` 和 `genMergeBUSortPath` 中实现
 */

import { merge } from './sort.test'
import { RandomUtil } from '../../chapter01/RandomUtil'

interface SortPath {
  l: number
  r: number
}

describe('2.2.5', () => {
  it('自顶向下', () => {
    function genMergeSortPath(len: number) {
      function f(l: number, r: number): SortPath[] {
        if (r === l) {
          return [{ l, r }]
        }
        const m = l + Math.floor((r - l) / 2)
        return [{ l, r }, ...f(l, m), ...f(m + 1, r)]
      }

      return f(0, len - 1)
    }

    function sortOfMerge(arr: number[]) {
      const aux = Array(arr.length)
      const locus: SortPath[] = []

      function f(arr: number[], l: number, r: number) {
        locus.push({ l, r })
        if (l >= r) {
          return
        }
        const middle = l + Math.floor((r - l) / 2)
        f(arr, l, middle)
        f(arr, middle + 1, r)
        merge(arr, l, r, middle, aux)
      }

      f(arr, 0, arr.length - 1)
      return { res: arr, locus }
    }

    const len = RandomUtil.integer(10, 100)
    expect(sortOfMerge(RandomUtil.array(len)).locus.length).toBe(
      genMergeSortPath(len).length,
    )
  })
  it('自底而上', () => {
    function split(len: number, step: number): SortPath[] {
      const res: SortPath[] = []
      for (let i = 0; i < len - step; i += step * 2) {
        res.push({ l: i, r: Math.min(i + step * 2, len) - 1 })
      }
      return res
    }

    function genMergeBUSortPath(len: number): SortPath[] {
      function f(step: number): SortPath[] {
        const res = split(len, step)
        if (step * 2 < len) {
          res.push(...f(step * 2))
        }
        return res
      }

      return f(1)
    }

    function sortOfMergeBU(arr: number[]) {
      const aux = Array(arr.length)
      const locus: SortPath[] = []
      for (let count = 1; count < arr.length; count *= 2) {
        for (let l = 0; l < arr.length - count; l += count * 2) {
          let r: number = Math.min(arr.length, l + count * 2) - 1
          const m = l + count - 1
          locus.push({ l, r })
          merge(arr, l, r, m, aux)
        }
      }
      return { res: arr, locus }
    }

    const len = RandomUtil.integer(10, 100)
    expect(sortOfMergeBU(RandomUtil.array(len)).locus.length).toBe(
      genMergeBUSortPath(len).length,
    )
  })
})

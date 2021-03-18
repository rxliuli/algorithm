/*
1.4.18　数组的局部最小元素。编写一个程序，给定一个含有 N 个不同整数的数组，找到一个局部最小元素：满足 a[i]<a[i － 1]，且 a[i]<a[i+1] 的索引 i。程序在最坏情况下所需的比较次数为 ~2lgN。
//TODO 没搞懂
答：检查数组的中间值 a[N/2] 以及和它相邻的元素 a[N/2-1] 和 a[N/2+1]。如果 a[N/2] 是一个局部最小值则算法终止；否则则在较小的相邻元素的半边中继续查找。
 */

import { RandomUtil } from '../RandomUtil'
import { uniqueBy } from '@liuli-util/array'

describe('1.4.18', () => {
  function expectFn(arr: number[]): number {
    for (let i = 1; i < arr.length - 1; i++) {
      if (arr[i] < arr[i - 1] && arr[i] < arr[i + 1]) {
        return i
      }
    }
    return -1
  }

  it('直接遍历（o(N)）', () => {
    expect(expectFn([1, 8, 10, 7, 5, 9, 5])).toBe(4)
    expect(expectFn([1, 8, 10, 9, 7, 5, 5])).toBe(-1)
  })
  it('测试标准答案', () => {
    function f(arr: number[]): number {
      function inner(l: number, r: number): number {
        if (l > r) {
          return -1
        }
        const i = Math.floor((r + l) / 2)
        if (i === 0 || i === arr.length - 1 || i === l) {
          return -1
        }
        if (arr[i] - arr[i - 1] < 0 && arr[i] - arr[i + 1] < 0) {
          return i
        }
        if (arr[i - 1] < arr[i + 1]) {
          return inner(l, i)
        }
        return inner(i, r)
      }

      return inner(0, arr.length - 1)
    }

    expect(f([1, 8, 10, 7, 5, 9, 5])).toBe(4)
    expect(f([1, 8, 10, 9, 7, 5, 5])).toBe(-1)

    const arr = uniqueBy(RandomUtil.array(100, () => RandomUtil.integer(1000)))
    const res = f(arr)
    if (res !== -1) {
      expect(arr[res] < arr[res - 1] && arr[res] < arr[res + 1]).toBeTruthy()
    } else {
      expect(expectFn(arr)).toBe(-1)
    }
  })
})

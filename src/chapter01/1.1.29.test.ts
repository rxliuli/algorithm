/*
1.1.29 等值键。为 BinarySearch 类添加一个静态方法 rank()，它接受一个键和一个整型有序数组（可
能存在重复键）作为参数并返回数组中小于该键的元素数量，以及一个类似的方法 count() 来
返回数组中等于该键的元素的数量。注意：如果 i 和 j 分别是 rank(key,a) 和 count(key,a)
的返回值，那么 a[i..i+j-1] 就是数组中所有和 key 相等的元素。
 */
/*
答案：
基本思路是先用 rank 找到 key，然后向两边搜索搜不到为止
还可以先用 rank 找到 key，然后对分割的两个数组再次 rank 查找，如果找到，反复如此，直到找不到为止
 */

import { rank } from '../util/rank'
import { randIntArray } from '../util/randIntArray'

describe('1.1.29', () => {
  const arr = randIntArray(1000)
  const n = arr[0]
  arr.sort()
  it('暴力解法', () => {
    function count(arr: number[], n: number): number {
      const idx = rank(arr, n)
      if (idx === -1) {
        return 0
      }
      let res = 1
      for (let i = idx + 1; i < arr.length && arr[i] === n; i++) res++
      for (let i = idx - 1; i >= 0 && arr[i] === n; i--) res++
      return res
    }
    expect(count([1, 2, 2, 2, 4, 5], 2)).toBe(3)
    console.log(count(arr, n))
  })
  /**
   * 原理
   * 对半搜索
   * 先通过二分查找到指定区间的 n 的下标，然后将它们分割成两个数组，再次查找
   * TODO 原理大概知道了，但步骤还没想清楚
   */
  it('二分搜索法', () => {})
})

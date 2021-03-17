/*
1.4.15　快速 3-sum。作为热身，使用一个线性级别的算法（而非基于二分查找的线性对数级别的算法）实现 TwoSumFaster 来计算已排序的数组中和为 0 的整数对的数量。用相同的思想为 3-sum 问题给出一个平方级别的算法。
 */

import { sortBy } from '@liuli-util/array'

describe('1.4.15', () => {
  it('实现快速的 twoSumFaster', () => {
    /**
     * 基本思路：从两边逐渐往中心逼近
     * @param arr
     * @param sum
     */
    function twoSumFaster(arr: number[], sum: number): [number, number][] {
      arr = sortBy(arr)
      return []
    }
  })
})

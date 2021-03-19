/*
1.4.20　双调查找。如果一个数组中的所有元素是先递增后递减的，则称这个数组为双调的。编写一个程序，给定一个含有 N 个不同int 值的双调数组，判断它是否含有给定的整数。程序在最坏情况下所需的比较次数为 \sim3\lg N。
 */

import { BinarySearch } from '../BinarySearch'
import { RandomUtil } from '../RandomUtil'
import { sortBy, uniqueBy } from '@liuli-util/array'

describe('1.4.20', () => {
  function testF(f: (arr: number[], v: number) => number) {
    //简单测试
    ;(() => {
      const arr = [1, 2, 3, 4, 5, 6, 9, 8, 7]
      arr.forEach((v, i) => {
        expect(f(arr, v)).toBe(i)
      })
      expect(f(arr, 10)).toBe(-1)
    })()

    //随机数据测试
    ;(() => {
      const arr = sortBy(uniqueBy(RandomUtil.array(1000)))
      const i = RandomUtil.integer(1, arr.length - 1)
      const left = arr.slice(0, i)
      const right = arr.slice(i)
      const concatArr = [...left, ...sortBy(right, (i) => -i)]
      const v = RandomUtil.integer(1000)
      expect(f(concatArr, v)).toBe(concatArr.indexOf(v))
    })()
  }

  it('方法 1', () => {
    /**
     * 基本思路
     * 使用二分法找到一个点，然后判断趋势对两边采取不同的搜索策略
     * @param arr
     * @param v
     */
    function f(arr: number[], v: number): number {
      function inner(l: number, r: number): number {
        if (l > r) {
          return -1
        }
        const i = Math.floor((l + r) / 2)
        const curr = arr[i]
        if (curr === v) {
          return i
        }
        const prev = arr[i - 1]
        const next = arr[i + 1]
        //在顶点左侧
        if (curr > prev && curr < next) {
          if (curr > v) {
            const res = BinarySearch.searchSortArray(arr, v, { l, r: i - 1 })
            if (res !== -1) {
              return res
            }
          }

          return inner(i + 1, r)
        }
        //在顶点右侧
        if (curr < prev && curr > next) {
          const res = BinarySearch.searchSortArray(arr, v, {
            l: i + 1,
            r,
            order: 'desc',
          })
          if (res !== -1) {
            return res
          }
          return inner(l, i - 1)
        }
        //本身就是顶点
        if (curr > prev && curr > next) {
          if (curr < v) {
            return -1
          }
          const res = BinarySearch.searchSortArray(arr, v, { l, r: i - 1 })
          if (res !== -1) {
            return res
          }
          return BinarySearch.searchSortArray(arr, v, {
            l: i + 1,
            r,
            order: 'desc',
          })
        }

        throw new Error('数组不是双调的')
      }

      return inner(0, arr.length - 1)
    }

    testF(f)
  })
  it('优化方法', () => {
    /**
     * 基本思路
     * 先找到顶点，然后对顶点两侧的元素进行二分搜索，避免频繁的小范围二分查找
     */
    function f(arr: number[], v: number): number {
      /**
       * 搜索顶点下标
       * 如果中间点的趋势是上升，则继续往右边找
       * 如果中间点的趋势是下降，则继续往左边找
       * 如果中间点是顶点，则返回
       */
      function searchVertex(l: number, r: number): number {
        if (l > r) {
          return -1
        }
        const i = Math.floor((l + r) / 2)
        const curr = arr[i]
        const prev = arr[i - 1]
        const next = arr[i + 1]

        if (curr > prev && curr < next) {
          return searchVertex(i + 1, r)
        }
        if (curr < prev && curr > next) {
          return searchVertex(l, r - 1)
        }
        //本身就是顶点
        if (curr > prev && curr > next) {
          return i
        }
        throw new Error('数组不是双调的')
      }

      const vertex = searchVertex(0, arr.length - 1)
      if (arr[vertex] === v) {
        return vertex
      }
      const left = BinarySearch.searchSortArray(arr, v, { l: 0, r: vertex - 1 })
      if (left !== -1) {
        return left
      }
      return BinarySearch.searchSortArray(arr, v, {
        l: vertex + 1,
        r: arr.length - 1,
        order: 'desc',
      })
    }

    testF(f)
  })
})

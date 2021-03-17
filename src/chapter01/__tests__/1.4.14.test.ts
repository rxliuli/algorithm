/*
1.4.14　4-sum。为 4-sum 设计一个算法。
TODO 可以优化
 */

import { RandomUtil } from '../RandomUtil'
import { BinarySearch } from '../BinarySearch'

describe('1.4.14', () => {
  function testF(
    f: <R extends [a: number, b: number, c: number, d: number]>(
      arr: number[],
      sum: number,
    ) => R[],
  ) {
    expect(f([1, 2, 3, 4, 4, 6], 10)).toEqual([
      [0, 1, 2, 3],
      [0, 1, 2, 4],
    ])
    expect(
      f(RandomUtil.array(20), 20).every((item) => item.reduce((a, b) => a + b)),
    ).toBeTruthy()
  }

  it('暴力实现', () => {
    function f<R extends [a: number, b: number, c: number, d: number]>(
      arr: number[],
      sum: number,
    ): R[] {
      const res: R[] = []
      for (let a = 0; a < arr.length; a++) {
        for (let b = a + 1; b < arr.length; b++) {
          for (let c = b + 1; c < arr.length; c++) {
            for (let d = c + 1; d < arr.length; d++) {
              if (arr[a] + arr[b] + arr[c] + arr[d] === sum) {
                res.push([a, b, c, d] as R)
              }
            }
          }
        }
      }
      return res
    }

    testF(f)
  })
  it('排序之后二分', () => {
    function f<R extends [a: number, b: number, c: number, d: number]>(
      arr: number[],
      sum: number,
    ): R[] {
      const res: R[] = []
      for (let a = 0; a < arr.length; a++) {
        for (let b = a + 1; b < arr.length; b++) {
          for (let c = b + 1; c < arr.length; c++) {
            const temp = BinarySearch.searchSortArrayRange(
              arr,
              sum - arr[a] - arr[b] - arr[c],
              c + 1,
              arr.length - 1,
            )
            if (temp !== null) {
              const [l, r] = temp
              for (let i = l; i <= r; i++) {
                // console.log(i, res)
                res.push([a, b, c, i] as any)
              }
            }
          }
        }
      }
      return res
    }

    testF(f)
  })
  it('两两结合之后计算 twoSum', () => {})
})

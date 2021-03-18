/*
1.4.16　最接近的一对（一维）。编写一个程序，给定一个含有 N 个 double 值的数组 a[]，在其中找到一对最接近的值：两者之差（绝对值）最小的两个数。程序在最坏情况下所需的运行时间应该是线性对数级别的。
 */

import { RandomUtil } from '../RandomUtil'
import { sortBy } from '@liuli-util/array'

describe('1.4.16', () => {
  function testF(f: (arr: number[]) => [number, number] | null) {
    expect(f([1, 2, 3, 3, 5])).toEqual([3, 3])
    expect(f([])).toBeNull()
    const arr = RandomUtil.array(100, () => RandomUtil.integer(10000))
    const expectRes = arr
      .flatMap((v, i) =>
        arr.slice(i + 1).map((v2) => [Math.abs(v - v2), v, v2]),
      )
      .sort(([d1], [d2]) => d1 - d2)[0]
      .slice(1)
    const res = f(arr)!
    expect(Math.abs(res[0] - res[1])).toBe(
      Math.abs(expectRes[0] - expectRes[1]),
    )
  }

  it('双重循环实现', () => {
    function f(arr: number[]): [number, number] | null {
      if (arr.length < 2) {
        return null
      }
      let diff: number | null = null
      const res: [number, number] = Array(2) as any
      for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
          const num = Math.abs(arr[i] - arr[j])
          if (diff === null || num < diff) {
            diff = num
            res[0] = arr[i]
            res[1] = arr[j]
            if (diff === 0) {
              break
            }
          }
        }
      }
      return res
    }

    testF(f)
  })

  it('排序后找到', () => {
    /**
     * 排序后遍历查找，但其实会更容易找到小的值（如果存在多个符合条件的元组）
     * @param arr
     */
    function f(arr: number[]): [number, number] | null {
      if (arr.length < 2) {
        return null
      }

      arr = sortBy(arr)

      let diff: number | null = null
      const res: [number, number] = Array(2) as any
      for (let i = 0; i < arr.length - 1; i++) {
        const v = arr[i]
        const next = arr[i + 1]
        const num = Math.abs(v - next)
        if (diff === null || num < diff) {
          diff = num
          res[0] = v
          res[1] = next
          if (diff === 0) {
            break
          }
        }
      }
      return res
    }

    testF(f)
  })
})

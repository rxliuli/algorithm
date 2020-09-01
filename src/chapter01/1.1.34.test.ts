/*
1.1.34 过滤。以下哪些任务需要（在数组中，比如）保存标准输入中的所有值？哪些可以被实现为一
个过滤器且仅使用固定数量的变量和固定大小的数组（和 N 无关）？在每个问题中，输入都来
自于标准输入且含有 N 个 0 到 1 的实数。
- 打印出最大和最小的数
- 打印出所有数的中位数
- 打印出第 k 小的数，k 小于 100
- 打印出所有数的平方和
- 打印出 N 个数的平均值
- 打印出大于平均值的数的百分比
- 将 N 个数按照升序打印
- 将 N 个数按照随机顺序打印
 */
/*
答案：
- 打印出最大和最小的数 -- 可以
- 打印出所有数的中位数
- 打印出第 k 小的数，k 小于 100 -- 不可以
- 打印出所有数的平方和 -- 可以
- 打印出 N 个数的平均值 -- 可以
- 打印出大于平均值的数的百分比 -- 可以
- 将 N 个数按照升序打印
- 将 N 个数按照随机顺序打印
 */

import { sort } from '../util/sort'

describe('1.1.34', () => {
  it('打印出最大和最小的数', () => {
    function f(arr: number[]): [max: number, min: number] {
      let min = arr[0],
        max = arr[0]
      for (let n of arr) {
        if (min > n) {
          min = n
        }
        if (max < n) {
          max = n
        }
      }
      return [max, min]
    }
    expect(f([1, 2, 3, 4])).toEqual([4, 1])
  })
  it('打印出所有数的中位数', () => {
    function f(arr: number[]): number {
      //TODO 此处使用其他已有 API 实现
      const res = sort(arr, (i) => i)
      return res[Math.floor((res.length - 1) / 2)]
    }
    expect(f([1, 2, 3, 4])).toBe(2)
    expect(f([1, 2, 3])).toBe(2)
    expect(f([1, 2, 2, 3])).toBe(2)
    expect(f([1, 3, 2, 3])).toBe(2)
    expect(f([1, 2, 3, 1])).toBe(1)
  })
  it('打印出第 k 小的数，k 小于 100', () => {})
  it('打印出所有数的平方和', () => {
    function f(arr: number[]): number {
      return arr.reduce((res, v) => res + v * v, 0)
    }
    expect(f([1, 2, 3, 4])).toBe(30)
  })
  function sum(arr: number[]): number {
    return arr.reduce((res, v) => res + v, 0)
  }
  function average(arr: number[]): number {
    return sum(arr) / arr.length
  }
  it('打印出 N 个数的平均值', () => {
    expect(average([1, 2, 3, 4])).toBe(2.5)
  })
  it('打印出大于平均值的数的百分比', () => {
    function f(arr: number[]): number {
      const avg = average(arr)
      let res = 0
      for (let n of arr) {
        if (n > avg) {
          res++
        }
      }
      return res
    }
    expect(f([1, 2, 3, 4])).toBe(2)
  })
  it('将 N 个数按照升序打印', () => {
    function f(arr: number[]) {
      const res = sort(arr, (i) => i)
      for (let n of res) {
        console.log(n)
      }
    }
    f([3, 2, 4])
  })
  it('将 N 个数按照随机顺序打印', () => {
    function f(arr: number[]) {
      const res = sort(arr, Math.random)
      for (let n of res) {
        console.log(n)
      }
    }
    f([3, 2, 4])
  })
})

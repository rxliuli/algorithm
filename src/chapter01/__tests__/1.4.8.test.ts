/*
1.4.8　编写一个程序，计算输入文件中相等的整数对的数量。如果你的第一个程序是平方级别的，请继续思考并用 Array.sort() 给出一个线性对数级别的解答。
TODO 还需优化
 */

import { groupBy } from '@liuli-util/array'
import { BinarySearch } from '../BinarySearch'

describe('1.4.8', () => {
  function testF(f: (arr: number[]) => number) {
    expect(f([1, 2, 1, 1, 2])).toEqual(4)
    expect(f([1, 2, 1, 2])).toEqual(2)
    expect(f([])).toEqual(0)
    expect(f([1])).toEqual(0)
    expect(f([1, 1, 1, 1, 1])).toEqual(10)
  }

  it('使用双重循环', () => {
    function f(arr: number[]): number {
      const res: [number, number][] = []
      for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
          if (arr[i] === arr[j]) {
            res.push([i, j])
          }
        }
      }
      return res.length
    }

    testF(f)
  })
  it('分组方式', () => {
    /**
     * 计算几个相同数字的全部组合形式
     * @param n
     */
    function fn(n: number): number {
      return ((n - 1) * n) / 2
    }

    function f(arr: number[]): number {
      let res = 0
      for (let [, v] of groupBy(arr, (i) => i)) {
        res += fn(v.length)
      }
      return res
    }

    testF(f)
  })
  it('使用二分搜索', () => {
    function f(arr: number[]): number {
      arr.sort((a, b) => a - b)
      let res = 0
      for (let i = 0; i < arr.length; i++) {
        const v = arr[i]
        const idx = BinarySearch.searchSortArray(arr, v, i + 1, arr.length)
        if (idx === -1) {
          continue
        }
        res++
        //向后搜索
        for (let j = idx + 1; arr[j] === v && j < arr.length; j++) {
          res++
        }
        //向前搜索
        for (let j = idx - 1; arr[j] === v && j > i; j--) {
          res++
        }
      }
      return res
    }

    testF(f)
  })
  it('使用二分搜索（包括查找周围相同的元素）', () => {})
})

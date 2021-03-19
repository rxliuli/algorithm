import { BinarySearch } from '../BinarySearch'
import { Random } from 'mockjs'

describe('测试 BinarySearch', () => {
  describe('测试搜索一维有序的数组', () => {
    it('正常情况', () => {
      const arr = Array(10)
        .fill(0)
        .map(() => Random.integer())
        .sort((a, b) => a - b)
      const i = Random.integer(0, arr.length - 1)
      const res = BinarySearch.searchSortArray(arr, arr[i])
      expect(res).toBe(i)
    })
    it('测试空数组', () => {
      const res = BinarySearch.searchSortArray([], 0)
      expect(res).toBe(-1)
    })
    it('测试只有一个元素的数组', () => {
      const res = BinarySearch.searchSortArray([1], 1)
      expect(res).toBe(0)
    })
    it('测试存在相同元素的数组', () => {
      expect(BinarySearch.searchSortArray([1, 2, 2, 3], 2)).toBe(1)
      expect(BinarySearch.searchSortArray([1, 2, 2, 3, 4], 2)).toBe(2)
    })
    it('测试搜索递减的数组', () => {
      expect(
        BinarySearch.searchSortArray([4, 3, 2, 1], 2, {
          order: 'desc',
        }),
      ).toBe(2)
    })
  })
  describe('测试 searchSortArrayRange', () => {
    it('测试异常情况-找到 [3,-1]', () => {
      const arr = [1, 2, 3, 4, 4, 6]
      // console.log(BinarySearch.searchSortArray(arr, 4, 0, 5))
      // console.log(BinarySearch.findMin(arr, 4, 0, 5))
      // console.log(BinarySearch.findMax(arr, 4, 0, 5))
      const res = BinarySearch.searchSortArrayRange(arr, 4)
      expect(res).toEqual([3, 4])
    })
  })
  describe('搜索有序的二维矩阵', () => {
    function testFunc(
      f: (arr: number[][], v: number) => [number, number] | null,
    ) {
      const arr = [
        [2, 4, 5, 6],
        [7, 8, 10, 11],
        [12, 13, 14, 17],
      ]
      expect(f(arr, 10)).toEqual([1, 2])
      expect(f(arr, 20)).toBeNull()
      expect(f([], 10)).toBeNull()
    }

    it('暴力搜索', () => {
      function f(arr: number[][], v: number): [number, number] | null {
        for (let i = 0; i < arr.length; i++) {
          for (let j = 0; j < arr[0].length; j++) {
            if (arr[i][j] === v) {
              return [i, j]
            }
          }
        }
        return null
      }

      testFunc(f)
    })
    it('二分搜索', () => {
      testFunc(BinarySearch.searchSortMatrix)
    })
    it('走迷宫的方法', () => {
      function f(arr: number[][], v: number): [number, number] | null {
        function inner(i: number, j: number): [number, number] | null {
          if (i < 0 || j >= arr[0].length) {
            return null
          }
          const curr = arr[i][j]
          if (v === curr) {
            return [i, j]
          } else if (v < curr) {
            return inner(i - 1, j)
          } else {
            return inner(i, j + 1)
          }
        }

        return inner(arr.length - 1, 0)

        // 使用循环实现
        // let i = arr.length - 1
        // let j = 0
        // while (i >= 0 && j < arr.length) {
        //   const curr = arr[i][j]
        //   if (v === curr) {
        //     return [i, j]
        //   } else if (v < curr) {
        //     i--
        //   } else {
        //     j++
        //   }
        // }
        //
        // return null
      }

      testFunc(f)
    })
  })
})

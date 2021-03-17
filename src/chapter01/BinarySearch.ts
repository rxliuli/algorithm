import { OrderItemComparator } from './OrderItemComparator'

/**
 * 二分搜索
 */
export class BinarySearch {
  /**
   * 搜索有序的一维数组
   * @param arr
   * @param v
   */
  static searchSortArray(arr: number[], v: number): number
  static searchSortArray(arr: number[], v: number, l: number, r: number): number
  static searchSortArray<T>(
    arr: T[],
    comparator: OrderItemComparator<T>,
  ): number
  static searchSortArray<T>(
    arr: T[],
    comparator: OrderItemComparator<T>,
    l: number,
    r: number,
  ): number
  static searchSortArray<T>(
    arr: T[],
    comparator: OrderItemComparator<T> | number,
    l: number = 0,
    r: number = arr.length - 1,
  ): number {
    const fn: OrderItemComparator<T> =
      typeof comparator === 'number'
        ? (v: number) => v - comparator
        : (comparator as any)

    function f(l: number, r: number): number {
      if (l > r) {
        return -1
      }
      const i = Math.floor((l + r) / 2)
      const res = fn(arr[i])
      if (res === 0) {
        return i
      } else if (res > 0) {
        return f(l, i - 1)
      } else {
        return f(i + 1, r)
      }
    }

    return f(l, r)
  }

  static searchSortArrayRange(
    arr: number[],
    v: number,
  ): [left: number, right: number] | null
  static searchSortArrayRange(
    arr: number[],
    v: number,
    l: number,
    r: number,
  ): [left: number, right: number] | null
  /**
   * 找出给定键的第一次出现和最后一次出现的为止且在最坏情况下所需的运行时间和 log N 成正比
   * @param arr
   * @param v
   * @param l
   * @param r
   */
  static searchSortArrayRange(
    arr: number[],
    v: number,
    l: number = 0,
    r: number = arr.length - 1,
  ): [left: number, right: number] | null {
    function find(
      l: number,
      r: number,
    ): [index: number, left: number, right: number] | null {
      if (l > r) {
        return null
      }
      const i = Math.floor((l + r) / 2)
      if (arr[i] === v) {
        return [i, l, r]
      } else if (arr[i] > v) {
        return find(l, i - 1)
      } else {
        return find(i + 1, r)
      }
    }

    function findMin(l: number, r: number): number {
      if (l > r) {
        return -1
      }
      const i = Math.floor((l + r) / 2)
      if (arr[i] === v) {
        if (l === i) {
          return i
        }
        return findMin(l, i)
      } else if (arr[i] > v) {
        return findMin(l, i - 1)
      } else {
        return findMin(i + 1, r)
      }
    }

    function findMax(l: number, r: number): number {
      if (l > r) {
        return -1
      }
      const i = Math.ceil((l + r) / 2)
      if (arr[i] === v) {
        if (i === r) {
          return i
        }
        return findMax(l, i)
      } else if (arr[i] > v) {
        return findMax(l, i - 1)
      } else {
        return findMax(i + 1, r)
      }
    }

    const res = find(l, r)
    if (res == null) {
      return null
    }
    const [index, left, right] = res
    const min = findMin(left, index)
    const max = findMax(index, right)
    return [min, max]
  }

  /**
   * 搜索排好序的二维矩阵
   * leetcode 原题
   * @Link https://leetcode-cn.com/problems/search-a-2d-matrix-ii/
   */
  static searchSortMatrix(arr: number[][], v: number): [number, number] | null {
    /**
     * 在一行或一列中搜索指定值，搜索到的话返回坐标，否则返回 null
     * @param start
     * @param vertical
     */
    function f(start: number, vertical: boolean): [number, number] | null {
      /**
       * 找到一行或一列中指定值的下标（行或者列的下标），如果没找到就返回 -1
       * @param l
       * @param r
       */
      function inner(l: number, r: number): number {
        if (l > r) {
          return -1
        }
        const i = Math.floor((l + r) / 2)
        const curr = vertical ? arr[i][start] : arr[start][i]
        if (curr === v) {
          return i
        } else if (curr > v) {
          return inner(l, i - 1)
        } else {
          return inner(i + 1, r)
        }
      }

      const idx = inner(
        start,
        vertical ? arr.length - 1 : arr[start].length - 1,
      )
      if (idx === -1) {
        return null
      }
      return vertical ? [idx, start] : [start, idx]
    }

    if (arr.length === 0) {
      return null
    }

    const min = Math.min(arr.length, arr[0].length)
    for (let i = 0; i < min; i++) {
      const r1 = f(i, true)
      if (r1 !== null) {
        return r1
      }
      const r2 = f(i, false)
      if (r2 !== null) {
        return r2
      }
    }

    return null
  }
}

type BinarySearchSortArrayOptions = {
  /** 区间的左边界 */
  l?: number
  /** 区间的右边界 */
  r?: number
  /** 顺序是递增还是递减 */
  order?: 'asc' | 'desc'
}

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
  /**
   * 搜索有序的一维数组
   * @param arr
   * @param v
   * @param options
   * @param options.l
   * @param options.r
   * @param options.order
   */
  static searchSortArray(
    arr: number[],
    v: number,
    options?: BinarySearchSortArrayOptions,
  ): number
  static searchSortArray(
    arr: number[],
    v: number,
    {
      l = 0,
      r = arr.length - 1,
      order = 'asc',
    }: BinarySearchSortArrayOptions = {},
  ): number {
    function f(arr: number[], v: number, l: number, r: number): number {
      if (l > r) {
        return -1
      }
      const i = Math.floor((l + r) / 2)
      if (arr[i] === v) {
        return i
      } else if (
        (arr[i] > v && order === 'asc') ||
        (arr[i] < v && order === 'desc')
      ) {
        return f(arr, v, l, i - 1)
      } else {
        return f(arr, v, i + 1, r)
      }
    }

    return f(arr, v, l, r)
  }

  private static findMax(
    arr: number[],
    v: number,
    l: number,
    r: number,
  ): number {
    if (l > r) {
      return -1
    }
    const i = Math.ceil((l + r) / 2)
    if (arr[i] === v) {
      if (i === r) {
        return i
      }
      return BinarySearch.findMax(arr, v, i, r)
    } else if (arr[i] > v) {
      return BinarySearch.findMax(arr, v, l, i - 1)
    } else {
      return BinarySearch.findMax(arr, v, i + 1, r)
    }
  }

  private static findMin(
    arr: number[],
    v: number,
    l: number,
    r: number,
  ): number {
    if (l > r) {
      return -1
    }
    const i = Math.floor((l + r) / 2)
    if (arr[i] === v) {
      if (l === i) {
        return i
      }
      return BinarySearch.findMin(arr, v, l, i)
    } else if (arr[i] > v) {
      return BinarySearch.findMin(arr, v, l, i - 1)
    } else {
      return BinarySearch.findMin(arr, v, i + 1, r)
    }
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

    const res = find(l, r)
    if (res == null) {
      return null
    }
    const [index, left, right] = res
    const min = BinarySearch.findMin(arr, v, left, index)
    const max = BinarySearch.findMax(arr, v, index, right)
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

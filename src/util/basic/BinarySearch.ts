/**
 * 二分搜索
 */
export class BinarySearch {
  /**
   * 搜索有序的一维数组
   * @param arr
   * @param v
   */
  static searchSortArray(arr: number[], v: number): number {
    function f(l: number, r: number): number {
      if (l > r) {
        return -1
      }
      const i = Math.floor((l + r) / 2)
      if (arr[i] === v) {
        return i
      } else if (arr[i] > v) {
        return f(l, i - 1)
      } else {
        return f(i + 1, r)
      }
    }

    return f(0, arr.length - 1)
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

import { IterableElement } from 'type-fest'

export class SortUtil {
  static sortOfSelection<T extends (number | string)[]>(arr: T): T
  static sortOfSelection<T extends any[]>(
    arr: T,
    kFn: (v: IterableElement<T>) => number | string,
  ): T
  static sortOfSelection<T>(
    arr: T[],
    kFn: (v: T) => number | string = (v) => v as any,
  ): T[] {
    for (let i = 0; i < arr.length - 1; i++) {
      let min = i
      for (let j = i + 1; j < arr.length; j++) {
        if (kFn(arr[j]) < kFn(arr[min])) {
          min = j
        }
      }
      ;[arr[i], arr[min]] = [arr[min], arr[i]]
    }
    return arr
  }

  static sortOfInsert<T extends (number | string)[]>(arr: T): T
  static sortOfInsert<T extends any[]>(
    arr: T,
    kFn: (v: IterableElement<T>) => number | string,
  ): T
  static sortOfInsert<T>(
    arr: T[],
    kFn: (v: T) => number | string = (v) => v as any,
  ): T[] {
    for (let i = 1; i < arr.length; i++) {
      for (let j = i - 1; kFn(arr[j]) > kFn(arr[j + 1]) && j >= 0; j--) {
        ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
      }
    }
    return arr
  }

  static sortOfShell<T extends (number | string)[]>(arr: T): T
  static sortOfShell<T extends any[]>(
    arr: T,
    kFn: (v: IterableElement<T>) => number | string,
  ): T
  static sortOfShell<T>(
    arr: T[],
    kFn: (v: T) => number | string = (v) => v as any,
  ): T[] {
    let len = arr.length
    let h = 1
    while (h < len / 3) h = 3 * h + 1 // 1, 4, 13, 40, 121, 364, 1093, ...
    while (h >= 1) {
      // 将数组变为h有序
      for (let i = h; i < len; i++) {
        // 将 a[i] 插入到 a[i-h], a[i-2*h], a[i-3*h]... 之中
        for (let j = i; j >= h && kFn(arr[j]) < kFn(arr[j - h]); j -= h) {
          ;[arr[j], arr[j - h]] = [arr[j - h], arr[j]]
        }
      }
      h = Math.floor(h / 3)
    }
    return arr
  }

  static sortOfBinary<T extends (number | string)[]>(arr: T): T
  static sortOfBinary<T extends any[]>(
    arr: T,
    kFn: (v: IterableElement<T>) => number | string,
  ): T
  static sortOfBinary<T>(
    arr: T[],
    kFn: (v: T) => number | string = (v) => v as any,
  ): T[] {
    // 边界条件，如果传入数组的值
    if (arr.length <= 1) {
      return arr
    }
    // 根据中间值对数组分治为两个数组
    const medianIndex = Math.floor(arr.length / 2)
    const medianValue = arr[medianIndex]
    const left = []
    const right = []
    for (let i = 0, len = arr.length; i < len; i++) {
      if (i === medianIndex) {
        continue
      }
      const v = arr[i]
      if (kFn(v) <= kFn(medianValue)) {
        left.push(v)
      } else {
        right.push(v)
      }
    }
    return SortUtil.sortOfBinary(left, kFn)
      .concat([medianValue])
      .concat(SortUtil.sortOfBinary(right, kFn))
  }

  /**
   * 合并两个有序数组
   * @param arr
   * @param l
   * @param r
   * @param middle
   * @param aux
   * @param kFn
   */
  private static merge<T extends any[]>(
    arr: T,
    l: number,
    r: number,
    middle: number,
    aux: T,
    kFn: (v: IterableElement<T>) => number | string,
  ) {
    for (let k = l; k <= r; k++) {
      aux[k] = arr[k]
    }
    let i = l,
      j = middle + 1
    for (let k = l; k <= r; k++) {
      if (i > middle) {
        arr[k] = aux[j++]
      } else if (j > r) {
        arr[k] = aux[i++]
      } else if (kFn(aux[i]) < kFn(aux[j])) {
        arr[k] = aux[i++]
      } else {
        arr[k] = aux[j++]
      }
    }
    return arr
  }

  /**
   * 原地归并排序
   * @param arr
   */
  static sortOfMerge<T extends (number | string)[]>(arr: T): T
  static sortOfMerge<T extends any[]>(
    arr: T,
    kFn: (v: IterableElement<T>) => number | string,
  ): T
  static sortOfMerge<T>(
    arr: T[],
    kFn: (v: T) => number | string = (v) => v as any,
  ): T[] {
    const aux = Array<T>(arr.length)

    function f(arr: T[], l: number, r: number) {
      if (l >= r) {
        return
      }
      const middle = l + Math.floor((r - l) / 2)
      f(arr, l, middle)
      f(arr, middle + 1, r)
      SortUtil.merge(arr, l, r, middle, aux, kFn)
    }

    f(arr, 0, arr.length - 1)
    return arr
  }

  /**
   * 自底而上
   * @link https://photos.google.com/photo/AF1QipOjtCheOCXVjIrE05uEOLkygNq91X-WkP8Xpesr
   * @param arr
   */
  static sortOfMergeBU<T extends (number | string)[]>(arr: T): T
  static sortOfMergeBU<T extends any[]>(
    arr: T,
    kFn: (v: IterableElement<T>) => number | string,
  ): T
  static sortOfMergeBU<T>(
    arr: T[],
    kFn: (v: T) => number | string = (v) => v as any,
  ): T[] {
    const aux = Array(arr.length)
    for (let count = 1; count < arr.length; count *= 2) {
      for (let l = 0; l < arr.length - count; l += count * 2) {
        let r: number = Math.min(arr.length, l + count * 2) - 1
        const m = l + count - 1
        SortUtil.merge(arr, l, r, m, aux, kFn)
      }
    }
    return arr
  }
}

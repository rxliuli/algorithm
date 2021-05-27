export class SortUtil {
  static sortOfSelection<T extends number | string>(arr: T[]): T[]
  static sortOfSelection<T>(arr: T[], kFn: (v: T) => number | string): T[]
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

  static sortOfInsert<T extends number | string>(arr: T[]): T[]
  static sortOfInsert<T>(arr: T[], kFn: (v: T) => number | string): T[]
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

  static sortOfShell<T extends number | string>(arr: T[]): T[]
  static sortOfShell<T>(arr: T[], kFn: (v: T) => number | string): T[]
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

  static sortOfBinary<T extends number | string>(arr: T[]): T[]
  static sortOfBinary<T>(arr: T[], kFn: (v: T) => number | string): T[]
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
}

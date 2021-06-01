export class NumberArrayUtil {
  static sum(arr: number[]): number {
    return arr.reduce((res, i) => res + i, 0)
  }

  static avg(arr: number[]) {
    if (arr.length === 0) {
      return 0
    }
    return NumberArrayUtil.sum(arr) / arr.length
  }
}

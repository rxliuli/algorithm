export class RandomUtil {
  /**
   * 随机生成一个整数
   * @param max
   */
  static integer(max: number): number
  static integer(min: number, max: number): number
  static integer(min: number, max?: number) {
    if (max === undefined) {
      max = min
      min = 0
    }
    if (!Number.isInteger(min) || !Number.isInteger(max)) {
      throw new Error('参数必须是整数')
    }
    return min + Math.floor(Math.random() * (max - min))
  }
}

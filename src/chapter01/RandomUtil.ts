export class RandomUtil {
  static integer(max: number): number
  static integer(min: number, max: number): number
  /**
   * 随机生成一个整数
   * @param min 最小值
   * @param max 最大值，如果没有传的话将使用最小值作为最大值，同时设置最小值为 0
   */
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

  static array(num: number): number[]
  static array<T>(num: number, gen: (i: number) => T): T[]
  /**
   * 随机生成一个数组
   * @param num
   * @param gen
   */
  static array<T>(
    num: number,
    gen: (i: number) => T = () => (RandomUtil.integer(0, num) as unknown) as T,
  ): T[] {
    const res = []
    for (let i = 0; i < num; i++) {
      res.push(gen(i))
    }
    return res
  }
}

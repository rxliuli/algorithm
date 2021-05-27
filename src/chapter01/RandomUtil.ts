type GetValueType<T> = T extends () => any
  ? ReturnType<Extract<T, () => any>> | Exclude<T, () => any>
  : T

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

  /**
   * 按照概率生成数据
   * @param map
   */
  static builder<T>(
    map: [probability: number, value: T | ((...args: any[]) => T)][],
  ): (...args: any[]) => GetValueType<T> {
    let sum = 0
    const _map: [(v: number) => boolean, T][] = []
    for (let [probability, value] of map) {
      const left = sum
      _map.push([
        (v) => {
          return v >= left && v < left + probability
        },
        value as T,
      ])
      sum += probability
    }

    return (...args: any[]) => {
      const number = RandomUtil.integer(sum)
      for (let [predicate, value] of _map) {
        if (predicate(number)) {
          return typeof value === 'function' ? value(...args) : value
        }
      }
      throw new Error()
    }
  }
}

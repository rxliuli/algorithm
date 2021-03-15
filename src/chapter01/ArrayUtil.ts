import { RandomUtil } from './RandomUtil'

type FlatArrayItem<T> = T extends (infer U)[] ? FlatArrayItem<U> : T

export class ArrayUtil {
  /**
   * 随机的迭代器
   * 基本思路
   * 1. 从当前下标和最后一个随机选择一个值
   * 2. 读取这个随机下标对应的值
   * 3. 如果随机值不是当前值，则将随机下标对应的值用当前值填充
   * 4. 如此直到遍历整个数组
   *
   * 由于不能修改原值，这里采用一个折衷方案
   */
  static *shuffle<T>(arr: T[], len = arr.length): Generator<T> {
    const old = Array(len)
    for (let i = 0; i < len; i++) {
      const n = RandomUtil.integer(i, len)
      const v = old[n] ?? arr[n]
      yield v
      if (i !== n) {
        old[n] = old[i] ?? arr[i]
      }
    }
  }

  /**
   * 深层将数组压平
   * @param arr
   */
  static flat<T>(arr: T[]): FlatArrayItem<T>[] {
    if (!Array.isArray(arr)) {
      return [arr]
    }
    return arr.reduce((res: any[], a) => res.concat(this.flat(a as any)), [])
  }
}

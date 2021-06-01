/*
2.2.6　编写一个程序来计算自顶向下和自底向上的归并排序访问数组的准确次数。使用这个程序将 N=1 至 512 的结果绘成曲线图，并将其和上限 6N\lg N 比较。

答：
还是远小于上限的，自顶而下大约在上限的 1/6 左右。自底而上也差不多是 1/6
 */

import { SortUtil } from '../SortUtil'
import { RandomUtil } from '../../chapter01/RandomUtil'
import { NumberArrayUtil } from '../../util/NumberArrayUtil'

/**
 * 可以统计访问次数的数组
 * @param arr
 */
export function proxyVisitArray<T>(arr: T[]) {
  let visits = 0
  return new Proxy(arr, {
    get(target: T[], p: string | symbol, receiver: any): any {
      if (p === 'visits') {
        return visits
      }
      if (typeof p === 'string' && !isNaN(Number.parseInt(p as string))) {
        visits++
      }
      return Reflect.get(target, p, receiver)
    },
  }) as T[] & { visits: number }
}

describe('2.2.6', () => {
  function testSort(sort: <T extends (number | string)[]>(arr: T) => T) {
    const lenArray = RandomUtil.array(512, (i) => i + 1)

    function computedMaxVisits(len: number) {
      return 6 * len * Math.log2(len)
    }

    const visitsArray = lenArray
      .map((len) => proxyVisitArray(RandomUtil.array(len)))
      .map((arr) => sort(arr).visits)
    const res = lenArray
      .map((len) => computedMaxVisits(len))
      .map((v, i) => (visitsArray[i] === 0 ? 1 : v / visitsArray[i]))
    return NumberArrayUtil.avg(res)
  }

  it('自顶向下', () => {
    console.log('平均值: ', testSort(SortUtil.sortOfMerge))
  })
  it('自底而上', () => {
    console.log('平均值: ', testSort(SortUtil.sortOfMergeBU))
  })
})

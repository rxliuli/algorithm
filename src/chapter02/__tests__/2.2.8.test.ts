/*
2.2.8　假设将算法 2.4 修改为：只要 a[mid] <= a[mid+1] 就不调用 merge() 方法，请证明用归并排序处理一个已经有序的数组所需的比较次数是线性级别的。

答：
数组访问次数与数组长度之比大致上在 2 左右徘徊，即比较次数是线性增长的
 */

import { merge } from './sort.test'
import { RandomUtil } from '../../chapter01/RandomUtil'
import { proxyVisitArray } from './2.2.6.test'
import { SortUtil } from '../SortUtil'
import { NumberUtil } from '../../util/NumberUtil'

it('2.2.8', () => {
  function sortOfMerge<T extends number[]>(arr: T): T {
    const aux = Array(arr.length)

    function f(arr: number[], l: number, r: number) {
      if (l >= r) {
        return
      }
      const m = l + Math.floor((r - l) / 2)
      f(arr, l, m)
      f(arr, m + 1, r)
      if (arr[m] <= arr[m + 1]) {
        return
      }
      merge(arr, l, r, m, aux)
    }

    f(arr, 0, arr.length - 1)
    return arr
  }

  const visitArrList = RandomUtil.array(200, (i) =>
    proxyVisitArray(SortUtil.sortOfMergeBU(RandomUtil.array(i + 1))),
  )
  const res = visitArrList.map((arr) => {
    return NumberUtil.fixed(sortOfMerge(arr).visits / arr.length, 2)
  })
  console.log(res)
})

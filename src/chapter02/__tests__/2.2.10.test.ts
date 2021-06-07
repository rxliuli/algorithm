/*
2.2.10　快速归并。实现一个 merge() 方法，按降序将 a[] 的后半部分复制到 aux[]，然后将其归并回 a[] 中。这样就可以去掉内循环中检测某半边是否用尽的代码。注意：这样的排序产生的结果是不稳定的（请见 2.5.1.8 节）。

TODO 没看懂怎么将后半部分归并回 a[] 中
 */

import { RandomUtil } from '../../chapter01/RandomUtil'
import { sortBy } from '@liuli-util/array'

describe('2.2.10', () => {
  /**
   * 一种实现方式，但实际上还是需要判断数据是否取完了
   * @link https://photos.google.com/photo/AF1QipOhjP0DSvTE9_oe2J086deiallBM3trnZlwtnvu
   * @param arr
   * @param l
   * @param r
   * @param m
   */
  function merge(arr: number[], l: number, r: number, m: number) {
    let aux = Array(r - m)
    for (let j = r, i = 0; j > m; j--, i++) {
      aux[i] = arr[j]
    }
    let i = m
    let k = 0
    for (let j = r; j >= l; j--) {
      if (aux[k] > arr[i] || i < l) {
        arr[j] = aux[k]
        k++
      } else {
        arr[j] = arr[i]
        i--
      }
    }
    return arr
  }

  it('基本示例', () => {
    const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    expect(merge([0, 4, 5, 6, 7, 1, 2, 3, 8, 9], 0, 9, 4)).toEqual(arr)
    expect(merge([5, 6, 7, 8, 9, 0, 1, 2, 3, 4], 0, 9, 4)).toEqual(arr)
    expect(merge([...arr], 0, 9, 4)).toEqual(arr)
  })
  it('随机数据', () => {
    const arr = [
      ...sortBy(RandomUtil.array(100)),
      ...sortBy(RandomUtil.array(100)),
    ]
    expect(merge([...arr], 0, 199, 99)).toEqual(sortBy(arr))
  })
})

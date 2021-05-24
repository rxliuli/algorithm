/*
2.1.12　令希尔排序打印出递增序列的每个元素所带来的比较次数和数组大小的比值。编写一个测试用例对随机 Double 数组进行希尔排序，验证该值是一个小常数，数组大小按照 10 的幂次递增，不小于 100。

答：
比较次数和数组大小的比值不是一个小常数，数组的比较次数增长与数组大小的增长的比值才是一个固定值，大概在 1.4 左右
 */

import { RandomUtil } from '../../chapter01/RandomUtil'

it('2.1.12', () => {
  function sortOfShell<T>(arr: T[]): [res: T[], locus: number] {
    let locus = 0
    let len = arr.length
    let h = 1
    while (h < len / 3) h = 3 * h + 1 // 1, 4, 13, 40, 121, 364, 1093, ...
    while (h >= 1) {
      // 将数组变为h有序
      for (let i = h; i < len; i++) {
        // 将 a[i] 插入到 a[i-h], a[i-2*h], a[i-3*h]... 之中
        for (let j = i; j >= h && arr[j] < arr[j - h]; j -= h) {
          locus++
          ;[arr[j], arr[j - h]] = [arr[j - h], arr[j]]
        }
      }
      h = Math.floor(h / 3)
    }
    return [arr, locus]
  }

  const arr = RandomUtil.array(100_000)
  const res = [100, 1_000, 10_000, 100_000].map((len) => {
    const [, locus] = sortOfShell(arr.slice(0, len))
    return locus / len
  })

  console.log(res)
})

/*
2.1.2　在选择排序中，一个元素最多可能会被交换多少次？平均可能会被交换多少次？

答：
最多会被一直交换，即数组长度-1 次，平均是 2 次
 */

import { sortOfSelection } from './2.1.1.test'

it('2.1.2', () => {
  /**
   * 生成一个单个元素交换次数最多的数组
   * @param len
   */
  function gen(len: number) {
    const arr = Array(len - 1)
      .fill(0)
      .map((_, i) => i)
    arr.unshift(len - 1)
    return arr
  }

  const [, locus] = sortOfSelection(gen(10))
  console.log(locus.map(([i, min, arr]) => [arr[i], arr[min]]))
})

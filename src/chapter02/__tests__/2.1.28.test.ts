/*
2.1.28　相等的主键。对于主键仅可能取两种值的数组，评估和验证插入排序和选择排序的性能，假设两种主键值出现的概率相同。

答：
猜测：由于 {@link 2.1.8} 推断插入排序仍然是平方级别，选择排序比较次数一直是平方级别
实际结果：插入排序的性能大幅度提高，接近选择排序，主要原因可能是交换的次数少了很多
TODO 待定
 */

import { SortUtil } from '../SortUtil'
import { RandomUtil } from '../../chapter01/RandomUtil'

describe('2.1.28', () => {
  let arr: number[]
  beforeAll(() => {
    arr = RandomUtil.array(128 * Math.pow(2, 10), () => RandomUtil.integer(2))
    console.log('arr: ', arr.length)
  })
  it('测试 sortOfSelection', () => {
    SortUtil.sortOfSelection([...arr])
  })
  it('测试 sortOfInsert', () => {
    SortUtil.sortOfInsert([...arr])
  })
})

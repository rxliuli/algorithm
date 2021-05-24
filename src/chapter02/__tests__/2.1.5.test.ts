/*
2.1.5　构造一个含有 N 个元素的数组，使插入排序（算法 2.2）运行过程中内循环（for）的两个判断结果总是假。

答：
实际上就是想要有序的数组
 */

import { sortOfInsert } from './2.1.4.test'

it('2.1.5', () => {
  function gen(len: number): number[] {
    return Array(len)
      .fill(0)
      .map((_, i) => i)
  }

  const [, locus] = sortOfInsert(gen(10))
  expect(locus.length).toBe(0)
})

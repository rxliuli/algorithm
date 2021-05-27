/*
2.1.36　不均匀的数据。编写一个测试用例，生成不均匀的测试数据，包括：

一半数据是 0，一半是 1；
一半数据是 0，1/4 是 1，1/4 是 2，以此类推；
一半数据是 0，一半是随机 int 值。
　　　评估并验证这些输入数据对本节讨论的算法的性能的影响。

TODO 验证待定
 */

import { RandomUtil } from '../../chapter01/RandomUtil'

describe('2.1.36', () => {
  it('一半数据是 0，一半数据是 1', () => {
    function gen(len: number) {
      return RandomUtil.array(
        len,
        RandomUtil.builder([
          [0, 1],
          [1, 1],
        ]),
      )
    }

    console.log(gen(10))
  })
  it('一半数据是 0，1/4 是 1，1/4 是 2', () => {
    function gen(len: number) {
      return RandomUtil.array(
        len,
        RandomUtil.builder([
          [0, 2],
          [1, 1],
          [2, 1],
        ]),
      )
    }

    console.log(gen(10))
  })
  it('一半数据是 0，一半是随机 int 值', () => {
    function gen(len: number) {
      return RandomUtil.array(
        len,
        RandomUtil.builder([
          [1, 0],
          [1, () => RandomUtil.integer(1, len)],
        ]),
      )
    }

    console.log(gen(10))
  })
})

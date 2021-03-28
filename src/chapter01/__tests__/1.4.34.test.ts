/*
1.4.34　热还是冷。你的目标是猜出 1 到 N 之间的一个秘密的整数。每次猜完一个整数后，你会知道你的猜测和这个秘密整数是否相等（如果是则游戏结束）。如果不相等，你会知道你的猜测相比上一次猜测距离该秘密整数是比较热（接近）还是比较冷（远离）。设计一个算法在 \sim2\lg N 之内找到这个秘密整数，然后再设计一个算法在 \sim1\lg N 之内找到这个秘密整数。
 */

import { RandomUtil } from '../RandomUtil'

describe('1.4.34', () => {
  function genMockF(res: number) {
    let last: number = Infinity
    return jest.fn((i: number) => {
      const prev = Math.abs(last - res)
      const curr = Math.abs(i - res)
      console.log(i, prev, curr)
      last = i
      if (curr === 0) {
        return 0
      } else if (curr < prev) {
        return -1
      } else {
        return 1
      }
    })
  }

  it('测试 mockF', () => {
    const mockF = genMockF(10)
    console.log(mockF(1))
    console.log(mockF(5))
    console.log(mockF(100))
    console.log(mockF(10))
  })

  it('2lgN 实现', () => {
    function search(
      n: number,
      /**
       * @return 1 更远、0 等于、-1 更近
       */
      compare: (i: number) => 1 | 0 | -1,
    ): number | null {
      /**
       * 基本思路
       * 在指定区间搜索指定值
       * 如果在最后一次的左边取点，则判断是否离得更远
       *  如果是，则将左边的区间舍弃，否则，搜索两边的区间
       * 如果是在最后一次的右边取点，则判断是否离得更远
       *  如果是，则将右边的区间舍弃，否则，搜索两边的区间
       *
       * 终止条件：当前值正好等于 0
       * 分解子问题：将从中间分割，然后继续比较 1/4，3/4 的两个点，由此缩小问题范围
       * @param l
       * @param r
       * @param direction
       */
      function inner(
        l: number,
        r: number,
        direction: 'left' | 'right',
      ): number | null {
        if (l > r) {
          return null
        }
        const i = Math.floor((l + r) / 2)
        const temp = compare(i)
        if (temp === 0) {
          return i
        }
        let res: number | null = null
        if (direction === 'left') {
          if (temp === -1) {
            res = inner(l, i - 1, 'left')
          }
          if (res !== null) {
            return res
          }
          compare(i)
          return inner(i + 1, r, 'right')
        } else {
          if (temp === -1) {
            res = inner(i + 1, r, 'right')
          }
          if (res !== null) {
            return res
          }
          compare(i)
          return inner(l, i - 1, 'left')
        }
      }

      compare(0)
      return inner(1, n, 'right')
    }

    const max = 1000
    const res = RandomUtil.integer(max)
    const mockF = genMockF(res)
    expect(search(max, mockF)).toBe(res)
  })
})

/*
1.1.14 编写一个静态方法 lg()，接受一个整型参数 N，返回不大于 log2N 的最大整数。不要使用 Math 库。
 */

/*
答案：
应该有数学上的最优解吧，不过吾辈先尝试使用暴力解法试试
 */

import { rand } from '../util/rand'

describe('1.1.14', () => {
  it('暴力解法', () => {
    function lg(num: number): number {
      for (let i = 0; i < num; i++) {
        if (Math.pow(2, i) <= num && Math.pow(2, i + 1) > num) {
          return i
        }
      }
      return NaN
    }

    const num = rand(100)
    expect(Math.floor(Math.log2(num))).toBe(lg(num))
  })
  /**
   * 还是使用了 Math 的方法，所以不能算
   * 换底公式参考
   * @link https://zh.wikipedia.org/zh-sg/%E5%AF%B9%E6%95%B0%E6%81%92%E7%AD%89%E5%BC%8F
   */
  it('换底公式', () => {
    expect(Math.floor(Math.log(100) / Math.log(2))).toBe(
      Math.floor(Math.log2(100)),
    )
  })
  /**
   * TODO 这个是错的，因为每次迭代需要计算 Math.pow
   */
  it('二分法搜索', () => {
    function lg(num: number): number {
      let last = num
      for (let i = 0; i < num; ) {
        console.log(i)
        if (Math.pow(2, i) <= num && Math.pow(2, i + 1) > num) {
          return i
        }
        if (Math.pow(2, i) < num) {
          const temp = i
          i = Math.floor(i + Math.abs((last - i) / 2))
          last = temp
          continue
        }
        if (Math.pow(2, i) > num) {
          const temp = i
          i = Math.floor(i - Math.abs((last - i) / 2))
          last = temp
          continue
        }
      }
      return NaN
    }
    console.log(lg(120))
  })
  /**
   * TODO 在网络上找到的更好的算法
   */
  it('正确的二分搜索法（乘法）', () => {
    function lg(num: number): number {
      if (num < 1) {
        return NaN
      }
      let sum = 1
      for (let i = 0; i < num; i++) {
        const temp = sum
        sum = sum * 2
        if (temp <= num && sum > num) {
          return i
        }
      }
      return NaN
    }
    console.log(lg(100))
  })
})

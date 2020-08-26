/*
1.1.24 给出使用欧几里德算法计算 105 和 24 的最大公约数的过程中得到的一系列 p 和 q 的值。扩展该
算法中的代码得到一个程序 Euclid，从命令行接受两个参数，计算它们的最大公约数并打印出每
次调用递归方法时的两个参数。使用你的程序计算 1 111 111 和 1 234 567 的最大公约数。
 */
/*
答案：
欧几里得算法
f(p,q) =
  c = p mod q
  c=0, q
  c>0, f(q, c)
 */
import { rand } from '../util/rand'
import Benchmark from 'benchmark'

describe('1.1.24', () => {
  function gcd(p: number, q: number): number {
    // console.log(p, q)
    const c = p % q
    if (c === 0) return q
    else return gcd(q, c)
  }
  it('基本示例', () => {
    expect(gcd(6, 9)).toBe(3)
    expect(gcd(42, 14)).toBe(14)
  })
  it('计算多个值的最大公约数', () => {
    function foo(nums: number[]): number {
      return nums.reduce((a, b) => gcd(a, b))
    }

    expect(foo([2, 4, 6])).toBe(2)
    expect(foo([1, 111, 111])).toBe(1)
    expect(foo([1, 234, 567])).toBe(1)
  })
  describe('通过递归实现', () => {
    it('基本实现', () => {
      /**
       * 递归计算多个值的最大公约数
       * 数学推导
       * f(nums) =
       *  len(nums)<=2, f(nums[0], nums[1])
       *  len(nums)>2, f(nums[0], nums[1,])
       * @param nums
       */
      function foo(nums: number[]): number {
        if (nums.length <= 2) return gcd(nums[0], nums[1])
        else return gcd(nums[0], foo(nums.slice(1)))
      }
      expect(foo([2, 4, 6])).toBe(2)
      expect(foo([1, 111, 111])).toBe(1)
      expect(foo([1, 234, 567])).toBe(1)
    })
    it('优化性能（减小数组复制）', () => {
      /**
       * 递归计算多个值的最大公约数
       */
      function foo(nums: number[]): number {
        let i = nums.length - 1
        function innerF(nums: number[]): number {
          if (i <= 1) return gcd(nums[i], nums[i - 1])
          else return gcd(nums[i--], innerF(nums))
        }
        return innerF(nums)
      }
      expect(foo([2, 4, 6])).toBe(2)
      expect(foo([1, 111, 111])).toBe(1)
      expect(foo([1, 234, 567])).toBe(1)
      // expect(foo([16, 8, 4])).toBe(4)
      const arr = Array(1000)
        .fill(0)
        .map(() => rand(1000) + 1)
      console.log(foo(arr))
      console.log(new Benchmark(() => foo(arr)).run().count)
    })
    it('使用尾递归优化性能（减小栈的层级）', () => {
      /**
       * 数学推导
       * f(nums)
       *  r=nums[0]
       *  i=1
       *    len(nums)<=0, r
       *    len(nums)>0, r=f(r, nums[i++])
       * @param nums
       */
      function foo(nums: number[]): number {
        let i = 1
        function innerF(r: number): number {
          if (i > nums.length - 1) return r
          else return innerF(gcd(r, nums[i++]))
        }
        return innerF(nums[0])
      }
      expect(foo([2, 4, 6])).toBe(2)
      expect(foo([1, 111, 111])).toBe(1)
      expect(foo([1, 234, 567])).toBe(1)
      expect(foo([16, 8, 4])).toBe(4)
      const arr = Array(1000)
        .fill(0)
        .map(() => rand(1000) + 1)
      console.log(foo(arr))
      console.log(new Benchmark(() => foo(arr)).run().count)
    })
  })
})

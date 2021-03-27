/*
1.4.25　扔两个鸡蛋。和上一题相同的问题，但现在假设你只有两个鸡蛋，而你的成本模型则是扔鸡蛋的次数。设计一种策略，最多扔 2\sqrt{N} 次鸡蛋即可判断出 F 的值，然后想办法把这个成本降低到 \sim{\rm c}\sqrt{F} 次。这和查找命中（鸡蛋完好无损）比未命中（鸡蛋被摔碎）的成本小得多的情形类似。
TODO 待定
 */

describe('1.4.25', () => {
  it('计算两个鸡蛋扔的最小次数（这是手算之后的错误结果）', () => {
    function f(n: number, x: number): number {
      return Math.floor(n / x) + x
    }

    let res = Number.MAX_SAFE_INTEGER
    for (let i = 1; i < 100; i++) {
      res = Math.min(res, f(100, i))
    }
    console.log(res)
  })
  it('计算最小扔的次数', () => {
    function dp(k: number, n: number): number {
      const map = new Map<string, number>()

      function f(k: number, n: number): number {
        if (k === 1) {
          return n
        }
        if (n === 0) {
          return 0
        }
        const key = n + ',' + k
        if (map.has(key)) {
          return map.get(key)!
        }

        function linearSearch() {
          let res = Infinity
          for (let i = 1; i <= n; i++) {
            res = Math.min(res, Math.max(f(k, n - i), f(k - 1, i - 1)) + 1)
          }
          return res
        }

        function binarySearch(res: number, l: number, r: number): number {
          if (l > r) {
            return res
          }
          const i = Math.floor((l + r) / 2)
          const broken = f(k - 1, i - 1) // 碎了
          const notBroken = f(k, n - i) // 没碎
          if (broken > notBroken) {
            return binarySearch(Math.min(res, broken + 1), l, i - 1)
          }
          return binarySearch(Math.min(res, notBroken + 1), i + 1, r)
        }

        const res = binarySearch(Infinity, 1, n)
        map.set(key, res)
        return res
      }

      return f(k, n)
    }

    expect(dp(2, 100)).toBe(14)
  })
})

/*
1.1.16 给出 exR1(6) 的返回值：
public static String exR1(int n)
{
  if (n <= 0) return "";
  return exR1(n-3) + n + exR1(n-2) + n;
}
 */

/*
答案：
TODO 看不懂是什么意思
 */

import Benchmark from 'benchmark'
import { rand } from '../util/rand'

describe('1.1.16', () => {
  it('基本示例', () => {
    function exR1(n: number): string {
      if (n <= 0) return ''
      return exR1(n - 3) + n + exR1(n - 2) + n
    }
    console.log(exR1(6))
    const benchmark = new Benchmark(() => exR1(rand(20))).run()
    console.log(benchmark.count)
  })
  it('使用缓存改进算法', () => {
    function exR1(n: number): string {
      const map = new Map<number, string>()
      function f(n: number): string {
        if (n <= 0) return ''
        if (map.has(n)) {
          return map.get(n)!
        }
        const res = f(n - 3) + n + f(n - 2) + n
        map.set(n, res)
        return res
      }
      return f(n)
    }
    console.log(exR1(6))
    const benchmark = new Benchmark(() => exR1(rand(20))).run()
    console.log(benchmark.count)
  })
})

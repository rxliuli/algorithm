/*
1.1.19 在计算机上运行以下程序：
public class Fibonacci
{
  public static long F(int N)
  {
    if (N == 0) return 0;
    if (N == 1) return 1;
    return F(N-1) + F(N-2);
  }
  public static void main(String[] args)
  {
    for (int N = 0; N < 100; N++)
      StdOut.println(N + " " + F(N));
  }
}
计算机用这段程序在一个小时之内能够得到 F(N) 结果的最大 N 值是多少？开发 F(N) 的一
个更好的实现，用数组保存已经计算过的值。
 */

/*
答案：
可以抽象为数学表达式
f(0)=0, f(1)=1,n>1 时,f(n)=f(n-1)+f(n-2)。
TODO 本质上是斐波那契数列求值公式，第 n 个数的值为第 n-1 个数与 n-2 个数的和，然后递归计算，直到计算遇到了 0/1
 */

describe('1.1.19', () => {
  it('书中的示例', () => {
    function f(num: number): number {
      if (num == 0) return 0
      if (num == 1) return 1
      return f(num - 1) + f(num - 2)
    }

    console.log(f(10))
  })
  it('优化的示例（循环）', () => {
    function f(num: number): number[] {
      const res = [] as number[]
      for (let j = 0, k = 1, i = 0; i < num; [j, k] = [k, j + k], i++) {
        res.push(j)
      }
      return res
    }
    console.log(f(10))
  })
  /**
   * TODO 不支持从 0 开始计算
   * f(n) =
   *  n=0, [0]
   *  n=1, [0,1]
   *  n>2, f(n-1) + f(
   */
  it('优化的示例（递归）', () => {
    function f(n: number): number[] {
      if (n === 0) {
        return [0]
      }
      if (n === 1) {
        return [0, 1]
      }
      if (n === 2) {
        return [1, 1]
      }
      const a = f(n - 1)
      a.push(a[n - 2] + a[n - 3])
      return a
    }
    console.log(f(10))
  })
})

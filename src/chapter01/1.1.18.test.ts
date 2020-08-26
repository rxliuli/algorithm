/*
1.1.18 请看以下递归函数：
public static int mystery(int a, int b)
{
  if (b == 0) return 0;
  if (b % 2 == 0) return mystery(a+a, b/2);
  return mystery(a+a, b/2) + a;
}
mystery(2, 25) 和 mystery(3, 11) 的返回值是多少？给定正整数 a 和 b，mystery(a,b)
计算的结果是什么？将代码中的 + 替换为 * 并将 return 0 改为 return 1，然后回答相同
的问题。
 */

/*
答案：
我猜测他应该是 log2(b) 个以 a 开始的等差数列之和 -- TODO 是等比数列之和，应该需要从等比数列中排除 b 为偶数的情况
换成乘法的话我猜是 log2(b) 个以 a 开始的等比数列之积 -- TODO 是 2^2^n 之积，应该需要从数列中排除 b 为偶数的情况
 */

describe('1.1.18', () => {
  it('猜想 mystery(2, 25) 的值', () => {
    const res = (2 * (1 - Math.pow(2, 5))) / (1 - 2)
    console.log(res)
  })
  it('实测 +', () => {
    function mystery(a: number, b: number): number {
      if (b == 0) return 0
      if (b % 2 == 0) return mystery(a + a, Math.floor(b / 2))
      console.log(a, b)
      return mystery(a + a, Math.floor(b / 2)) + a
    }
    console.log(mystery(2, 25))
  })
  it('实测 *', () => {
    function mystery(a: number, b: number): number {
      if (b == 0) return 1
      console.log(a, b)
      if (b % 2 == 0) return mystery(a * a, Math.floor(b / 2))
      return mystery(a * a, Math.floor(b / 2)) * a
    }
    console.log(mystery(2, 25))
  })
})

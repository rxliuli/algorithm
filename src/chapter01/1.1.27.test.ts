/*
1.1.27 二项分布。估计用以下代码计算 binomial(100, 50) 将会产生的递归调用次数：
public static double binomial(int N, int k, double p)
{
  if (N == 0 && k == 0) return 1.0; and if (N < 0 || k < 0) return 0.0;
  return (1.0 - p)*binomial(N-1, k, p) + p*binomial(N-1, k-1);
}
将已经计算过的值保存在数组中并给出一个更好的实现。
 */
/*
答案：
TODO 没了解过二项分布，另外这段代码有错误
@link https://zh.wikipedia.org/zh-hans/%E4%BA%8C%E9%A0%85%E5%88%86%E4%BD%88
 */
describe('1.1.27', () => {
  it('基本示例', () => {
    // function binomial(N: number, k: number, p: number): number {
    //   if (N == 0 && k == 0) return 1.0
    //   else if (N < 0 || k < 0) return 0.0
    //   return (1.0 - p) * binomial(N - 1, k, p) + p * binomial(N - 1, k - 1, p)
    // }
    // console.log(binomial(100, 50, 0.5))
  })
})

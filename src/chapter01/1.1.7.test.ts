/*
1.1.7 分别给出以下代码段打印出的值：
a. double t = 9.0;
while (Math.abs(t - 9.0/t) > .001)
  t = (9.0/t + t) / 2.0;
StdOut.printf("%.5f\n", t);
b. int sum = 0;
for (int i = 1; i < 1000; i++)
  for (int j = 0; j < i; j++)
    sum++;
StdOut.println(sum);
c. int sum = 0;
for (int i = 1; i < 1000; i *= 2)
  for (int j = 0; j < 1000; j++)
    sum++;
StdOut.println(sum);
 */

/*
答案：
a. 计算平方值 TODO 执行后才发现，查找资料后了解到这是一种计算平方根的方法
b. 二层循环，计算 99 个 1-n 的等差数列之和 TODO 由于是 ++ 而非 +=j，所以实际上应该还是计数，计算内部循环了多少次
c. 二层循环，计算 1-1000，步长为 2，等比数列的个数 * 1000 TODO 虽然知道目的不过不知道最终的结果是多少 -- 知道了，应该是 Math.log2(1000) * 1000 -- 外层循环数应该需要 +1，因为外层循环初始值是 2^0 而非 2^1
 */

describe('1.1.7', () => {
  /**
   * 本质上这是[古巴比伦算法](https://en.wikipedia.org/wiki/Methods_of_computing_square_roots#Babylonian_method)
   * 其计算过程很简单，如果我们猜 g 是 x 的一个根，那么 (g + x / g) / 2 会是一个更好的根。
   */
  const num = Math.floor(Math.random() * 1000)
  it('a', () => {
    function sqrt(num: number) {
      //计算更好的迭代值
      const avgDamping = (num: number, target: number) =>
        (num / target + target) / 2.0
      //判断误差
      const closeEnough = (num: number, target: number) =>
        Math.abs(target - num / target) > 0.0001
      let target = num
      while (closeEnough(num, target)) {
        target = avgDamping(num, target)
      }
      return target
    }
    console.log(sqrt(9))
    console.log(sqrt(16))
  })
  it('b', () => {
    function sumOfArithmeticSequence(num: number) {
      let sum = 0
      for (let i = 1; i < num; i++) {
        for (let j = 0; j < i; j++) {
          sum++
        }
      }
      return sum
    }
    function sumOfArithmeticSequenceV2(num: number) {
      let n = num - 1
      return ((n + 1) * n) / 2
    }

    expect(sumOfArithmeticSequence(num)).toBe(sumOfArithmeticSequenceV2(num))
  })
  it.skip('b 尝试另一个有趣的计算', () => {
    function sumOfArithmeticSequenceV1(num: number) {
      const res = []
      let sum = 0
      for (let i = 1; i < num; i++) {
        res.push([] as number[])
        for (let j = 0; j < i; j++) {
          res[res.length - 1].push(j)
          sum += j
        }
      }
      console.log(res)
      return sum
    }
    function sumOfArithmeticSequenceV2(num: number) {
      let n = num - 2
      return num + (n * (n + 1)) / 2 + (n * (n + 1) * (2 * n + 1)) / 6
    }
    //TODO 但结果不一致，也就是说推算错误
    console.log(sumOfArithmeticSequenceV1(10))
    console.log(sumOfArithmeticSequenceV2(10))
  })
  it('c', () => {
    function sumV1(num: number) {
      let sum = 0
      for (let i = 1; i < num; i *= 2) {
        for (let j = 0; j < num; j++) {
          sum++
        }
      }
      return sum
    }
    function sumV2(num: number) {
      return (Math.floor(Math.log2(num)) + 1) * num
    }

    expect(sumV1(num)).toBe(sumV2(num))
  })
})

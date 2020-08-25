/*
1.1.9 编写一段代码，将一个正整数 N 用二进制表示并转换为一个 String 类型的值 s。
解答：Java 有一个内置方法 Integer.toBinaryString(N) 专门完成这个任务，但该题的目的就
是给出这个方法的其他实现方法。下面就是一个特别简洁的答案：
String s = "";
for (int n = N; n > 0; n /= 2)
s = (n % 2) + s;
 */

it('1.1.9', () => {
  function decimalToBinaryV1(num: number): string {
    if (num === 0) {
      return ''
    }
    return decimalToBinaryV1(Math.floor(num / 2)) + '' + (num % 2)
  }
  function decimalToBinaryV2(num: number): string {
    let s = ''
    for (let n = num; n > 0; n = Math.floor(n / 2)) {
      s = (n % 2) + s
    }
    return s
  }

  const num = Math.floor(Math.random() * 1000)
  expect(decimalToBinaryV1(num)).toBe(decimalToBinaryV2(num))
})

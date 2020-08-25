/*
1.1.12 以下代码段会打印出什么结果？
int[] a = new int[10];
for (int i = 0; i < 10; i++)
  a[i] = 9 - i;
for (int i = 0; i < 10; i++)
  a[i] = a[a[i]];
for (int i = 0; i < 10; i++)
  System.out.println(i);
 */

/*
答案：
题目应该是写错了，最后打印的应该是 a[i]，如果是这样，则这段代码打印的将是反转后的数组
TODO 实际上打印的是回文数，第一个循环得到的是 9 - 0 的一个倒序数组，然后中间的数组在 0-5 次迭代时将值设为后面的，然后后面的将值设为前面的但已经是一样的了
 */

import { rand } from '../util/rand'

it('1.1.12', () => {
  function genNumberOfPalindromes(num: number) {
    const a = []
    for (let i = 0; i < num; i++) a[i] = num - 1 - i
    for (let i = 0; i < num; i++) a[i] = a[a[i]]
    return a
  }
  function genNumberOfPalindromes2(num: number) {
    const a = []
    const idx = Math.floor(num / 2)
    for (let i = 0; i < num; i++) {
      if (i < idx) {
        a.push(i)
      } else {
        a.push(num - 1 - i)
      }
    }
    return a
  }

  const num = rand(100)
  expect(genNumberOfPalindromes(num)).toEqual(genNumberOfPalindromes2(num))
})

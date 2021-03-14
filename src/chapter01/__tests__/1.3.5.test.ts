/*
1.3.5　当 N 为 50 时下面这段代码会打印什么？从较高的抽象层次描述给定正整数 N 时这段代码的行为。

Stack<Integer> stack = new Stack<Integer>();
while (N > 0)
{
   stack.push(N % 2);
   N = N / 2;
}
for (int d : stack) StdOut.print(d);
StdOut.println();

答：
打印 lg(n) 个数，每个数字分别是每个 lg(n) 时与 2 的余数
TODO 待定
 */

import { Stack } from '../Stack'

describe('1.3.5', () => {
  it('基本示例', () => {
    function f(n: number) {
      function inner(stack: Stack<number>, n: number): Stack<number> {
        if (n <= 0) {
          return stack
        }
        console.log(n, n % 2)
        stack.push(n % 2)
        return inner(stack, Math.floor(n / 2))
      }

      return inner(new Stack<number>(), n)
    }

    expect([...f(50)].join('')).toBe('110010')
  })
})

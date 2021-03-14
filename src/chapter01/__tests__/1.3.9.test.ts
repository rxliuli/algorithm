/*
1.3.9　编写一段程序，从标准输入得到一个缺少左括号的表达式并打印出补全括号之后的中序表达式。例如，给定输入：

1 + 2 ) * 3 - 4 ) * 5 - 6 ) ) )
　　　你的程序应该输出：

( ( 1 + 2 ) * ( ( 3 - 4 ) * ( 5 - 6 ) ) )

TODO 待定
 */

import { Stack } from '../Stack'

describe('1.3.9', () => {
  it('暴力解法', () => {
    function f(str: string): string {
      const arr = str.split(' ').reverse()
      const stack = new Stack<string>()

      for (let s of arr) {
        switch (s) {
          case '+':
          case '-':
          case '*':
          case '/':
            stack.push(s)
            break
        }
        if (s === '-') {
        }
      }
      return ''
    }
  })
})

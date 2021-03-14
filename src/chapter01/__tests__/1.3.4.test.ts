/*
1.3.4　编写一个 Stack 的用例 Parentheses，从标准输入中读取一个文本流并使用栈判定其中的括号是否配对完整。例如，对于 [()]{}{[()()]()} 程序应该打印 true，对于 [(]) 则打印 false。
 */

import { Stack } from '../Stack'

describe('1.3.4', () => {
  it('使用 Stack 实现', () => {
    function validateSymmetry(arr: string[]): boolean {
      const stack = new Stack()
      for (let s of arr) {
        switch (s) {
          case '(':
            stack.push(')')
            break
          case '[':
            stack.push(']')
            break
          case '{':
            stack.push('}')
            break
          case ')':
          case ']':
          case '}':
            const last = stack.pop()
            if (last !== s) {
              return false
            }
            break
        }
      }
      return true
    }

    expect(validateSymmetry('[()]{}{[()()]()}'.split(''))).toBeTruthy()
    expect(validateSymmetry('[(])'.split(''))).toBeFalsy()
  })
})

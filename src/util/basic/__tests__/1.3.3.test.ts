/*
1.3.3　假设某个用例程序会进行一系列入栈和出栈的混合栈操作。入栈操作会将整数 0 到 9 按顺序压入栈；出栈操作会打印出返回值。下面哪种序列是不可能产生的？

　　　a. 4 3 2 1 0 9 8 7 6 5

　　　b. 4 6 8 7 5 3 2 9 0 1

　　　c. 2 5 6 7 4 8 9 3 1 0

　　　d. 4 3 2 1 0 5 6 7 8 9

　　　e. 1 2 3 4 5 6 9 8 7 0

　　　f. 0 4 6 5 3 8 1 7 2 9

　　　g. 1 4 7 9 8 6 5 3 0 2

　　　h. 2 1 4 3 6 5 8 7 9 0

感觉哪种都不可能产生，栈的打印应该是对称的
错了，实际上是有可能的
 */

import { Stack } from '../Stack'

describe('1.3.3', () => {
  it('证明以上序列可能出现', () => {
    const stack = new Stack()
    const res = []
    for (let i = 0, k = 0; i < 10; ) {
      if (k <= 9 && (Math.random() > 0.5 || stack.isEmpty)) {
        stack.push(k)
        res.push(`push: ${k}`)
        k++
      } else {
        res.push(`pop: ${stack.pop()}`)
        i++
      }
    }
    console.log(res)
  })

  function convert(s: string): number[] {
    return s.split(' ').map((s) => Number.parseInt(s))
  }

  it('从出栈操作推断整个入栈操作', () => {
    /**
     * 在入栈操作一定是 0-9 的情况下，判断出栈操作是否错误
     * @param arr 出栈操作列表
     */
    function checkStack(arr: number[]): boolean {
      const stack = new Stack<number>()
      let start: number = 0
      for (let n of arr) {
        for (let i = start; i <= n; i++) {
          stack.push(i)
        }
        start = Math.max(n + 1, start)
        const last = stack.pop()!
        if (n < last) {
          return false
        }
      }
      expect(stack.size).toBe(0)
      return true
    }

    expect(checkStack(convert('4 3 2 1 0 9 8 7 6 5'))).toBeTruthy() // a. 4 3 2 1 0 9 8 7 6 5
    expect(checkStack(convert('4 6 8 7 5 3 2 9 0 1'))).toBeFalsy() // b. 4 6 8 7 5 3 2 9 0 1
    expect(checkStack(convert('2 5 6 7 4 8 9 3 1 0'))).toBeTruthy() // c. 2 5 6 7 4 8 9 3 1 0
    expect(checkStack(convert('4 3 2 1 0 5 6 7 8 9'))).toBeTruthy() // d. 4 3 2 1 0 5 6 7 8 9
    expect(checkStack(convert('1 2 3 4 5 6 9 8 7 0'))).toBeTruthy() // e. 1 2 3 4 5 6 9 8 7 0
    expect(checkStack(convert('0 4 6 5 3 8 1 7 2 9'))).toBeFalsy() // f. 0 4 6 5 3 8 1 7 2 9
    expect(checkStack(convert('1 4 7 9 8 6 5 3 0 2'))).toBeFalsy() // g. 1 4 7 9 8 6 5 3 0 2
    expect(checkStack(convert('2 1 4 3 6 5 8 7 9 0'))).toBeTruthy() // h. 2 1 4 3 6 5 8 7 9 0
  })
  it('leetcode 同类型的问题 https://leetcode-cn.com/problems/zhan-de-ya-ru-dan-chu-xu-lie-lcof/solution/mian-shi-ti-31-zhan-de-ya-ru-dan-chu-xu-lie-mo-n-2/', () => {
    /**
     * 给定 pushed 和 popped 两个序列，每个序列中的 值都不重复，只有当它们可能是在最初空栈上进行的推入 push 和弹出 pop 操作序列的结果时，返回 true；否则，返回 false 。
     * 这种思路倾向于找到错误而非找到正确的，而且不是及时的
     * @param pushed
     * @param popped
     */
    function checkStackOp(pushed: number[], popped: number[]): boolean {
      const stack = new Stack<number>()
      let i = 0
      for (const n of pushed) {
        stack.push(n)
        while (stack.size !== 0 && stack.peek() === popped[i]) {
          stack.pop()
          i++
        }
      }

      return stack.size === 0
    }

    const pushed = convert('0 1 2 3 4 5 6 7 8 9')
    expect(checkStackOp(pushed, convert('4 3 2 1 0 9 8 7 6 5'))).toBeTruthy() // a. 4 3 2 1 0 9 8 7 6 5
    expect(checkStackOp(pushed, convert('4 6 8 7 5 3 2 9 0 1'))).toBeFalsy() // b. 4 6 8 7 5 3 2 9 0 1
    expect(checkStackOp(pushed, convert('2 5 6 7 4 8 9 3 1 0'))).toBeTruthy() // c. 2 5 6 7 4 8 9 3 1 0
    expect(checkStackOp(pushed, convert('4 3 2 1 0 5 6 7 8 9'))).toBeTruthy() // d. 4 3 2 1 0 5 6 7 8 9
    expect(checkStackOp(pushed, convert('1 2 3 4 5 6 9 8 7 0'))).toBeTruthy() // e. 1 2 3 4 5 6 9 8 7 0
    expect(checkStackOp(pushed, convert('0 4 6 5 3 8 1 7 2 9'))).toBeFalsy() // f. 0 4 6 5 3 8 1 7 2 9
    expect(checkStackOp(pushed, convert('1 4 7 9 8 6 5 3 0 2'))).toBeFalsy() // g. 1 4 7 9 8 6 5 3 0 2
    expect(checkStackOp(pushed, convert('2 1 4 3 6 5 8 7 9 0'))).toBeTruthy() // h. 2 1 4 3 6 5 8 7 9 0
    expect(checkStackOp([1, 2, 3, 4, 5], [4, 5, 3, 2, 1])).toBeTruthy()
  })
})

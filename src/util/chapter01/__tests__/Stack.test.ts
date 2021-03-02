import { Stack } from '../Stack'

describe('测试 Stack', () => {
  it('测试迭代器', () => {
    const stack = new Stack<number>()
    stack.push(1)
    stack.push(2)
    stack.push(3)
    expect([...stack]).toEqual([3, 2, 1])
  })
})

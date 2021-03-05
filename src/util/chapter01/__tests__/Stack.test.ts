import { IStack, LinkedStack, Stack } from '../Stack'
import { Class } from 'type-fest'

export function testStack(Stack: Class<IStack<number>>) {
  const stack = new Stack()
  stack.push(1)
  stack.push(2)
  stack.push(3)
  expect([...stack]).toEqual([3, 2, 1])
  expect(stack.size).toBe(3)
  expect(stack.pop()).toBe(3)
  expect(stack.pop()).toBe(2)
  expect(stack.pop()).toBe(1)
  expect(stack.pop()).toBeNull()
  expect(stack.isEmpty).toBeTruthy()
}

describe('测试 Stack', () => {
  it('测试迭代器', () => {
    testStack(Stack)
  })
  it('测试 LinkedStack', () => {
    testStack(LinkedStack)
  })
})

/*
1.3.1　为 FixedCapacityStackOfStrings 添加一个方法 isFull()。
 */
import { FixedCapacityStack } from '../FixedCapacityStackOfStrings'

it('1.3.1', () => {
  const stack = new FixedCapacityStack(2)
  expect(stack.isEmpty).toBeTruthy()
  stack.push(1)
  stack.push(2)
  expect(() => stack.push(3)).toThrowError()
  expect(stack.isFull).toBeTruthy()
  expect(stack.pop()).toBe(2)
  expect(stack.size).toBe(1)
  expect(stack.pop()).toBe(1)
  expect(stack.isEmpty).toBeTruthy()
})

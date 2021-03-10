/*
1.3.12　编写一个可迭代的 Stack 用例，它含有一个静态的copy() 方法，接受一个字符串的栈作为参数并返回该栈的一个副本。注意：这种能力是迭代器价值的一个重要体现，因为有了它我们无需改变基本 API 就能够实现这种功能。
 */

import { Stack, StackUtil } from '../Stack'

it('1.3.12', () => {
  const stack = new Stack()
  stack.push(1)
  stack.push(2)
  stack.push(3)
  expect([...StackUtil.copy(stack, new Stack())]).toEqual([...stack])
})

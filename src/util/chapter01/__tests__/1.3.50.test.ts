/*
1.3.50　快速出错的迭代器。修改 Stack 的迭代器代码，确保一旦用例在迭代器中（通过push() 或pop() 操作）修改集合数据就抛出一个java.util.ConcurrentModificationException 异常。解答：用一个计数器记录 push() 和 pop() 操作的次数。在创建迭代器时，将该值记录到 Iterator 的一个实例变量中。在每次调用hasNext() 和next() 之前，检查该值是否发生了变化，如果变化则抛出异常。
 */

import { LinkedStack } from '../Stack'

class SafeLinkedNodeStack<T> extends LinkedStack<T> {
  private pushCount = 0
  private popCount = 0

  push(item: T) {
    super.push(item)
    this.pushCount++
  }

  pop(): T | null {
    const pop = super.pop()
    if (pop !== null) {
      this.popCount++
    }
    return pop
  }

  *[Symbol.iterator](): Generator<T> {
    const pushCount = this.pushCount
    const popCount = this.popCount
    const iter = super[Symbol.iterator]()
    for (const item of iter) {
      yield item
      if (this.pushCount !== pushCount || this.popCount !== popCount) {
        throw new Error('遍历时不能修改集合数据')
      }
    }
  }
}

it('1.3.50', () => {
  const stack = new SafeLinkedNodeStack()
  stack.push(1)
  for (let i of stack) {
    console.log(i)
  }
  expect(() => {
    for (let i of stack) {
      stack.pop()
    }
  }).toThrowError()
})

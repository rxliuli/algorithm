/*
1.4.28　一个队列实现的栈。使用一个队列实现一个栈，使得每个栈操作所需的队列操作数量为线性级别。提示：要删除一个元素，将队列中的所有元素一一出列再入列，除了最后一个元素，应该将它删除并返回（这种方法的确非常低效）。
 */

import { LinkedQueue } from '../Queue'
import { IStack } from '../Stack'
import { testStack } from './Stack.test'

it('1.4.28', () => {
  class StackWithQueue<T> implements IStack<T> {
    private queue = new LinkedQueue<T>()

    get isEmpty(): boolean {
      return this.queue.isEmpty
    }

    get size(): number {
      return this.queue.size
    }

    *[Symbol.iterator](): Iterator<T> {
      const arr = [...this.queue]
      for (let i = arr.length - 1; i >= 0; i--) {
        yield arr[i]
      }
    }

    pop(): T | null {
      if (this.queue.isEmpty) {
        return null
      }
      const arr: T[] = []
      while (!this.queue.isEmpty) {
        arr.push(this.queue.dequeue()!)
      }
      for (let i = 0; i < arr.length - 1; i++) {
        this.queue.enqueue(arr[i])
      }
      return arr[arr.length - 1]
    }

    push(item: T): void {
      this.queue.enqueue(item)
    }
  }

  testStack(StackWithQueue)
})

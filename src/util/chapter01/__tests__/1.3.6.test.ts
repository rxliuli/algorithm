/*
1.3.6　下面这段代码对队列 q 进行了什么操作？

Stack<String> stack = new Stack<String>();
while (!q.isEmpty())
   stack.push(q.dequeue());
while (!stack.isEmpty())
   q.enqueue(stack.pop());

答：
很明显就是反转整个队列元素的顺序

 */

import { IQueue, Queue } from '../Queue'
import { Stack } from '../Stack'

describe('1.3.6', () => {
  it('验证', () => {
    function f<T, Q extends IQueue<T>>(q: Q): Q {
      const stack = new Stack<T>()
      while (!q.isEmpty) {
        stack.push(q.dequeue()!)
      }
      while (!stack.isEmpty) {
        q.enqueue(stack.pop()!)
      }
      return q
    }

    const queue = new Queue<number>()
    queue.enqueue(1)
    queue.enqueue(2)
    queue.enqueue(3)
    expect([...f(queue)]).toEqual([3, 2, 1])
  })
})

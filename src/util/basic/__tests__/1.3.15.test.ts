/*
1.3.15　编写一个 Queue 的用例，接受一个命令行参数 k 并打印出标准输入中的倒数第 k 个字符串（假设标准输入中至少有 k 个字符串）。
 */

import { IQueue, Queue } from '../Queue'

it('1.3.15', () => {
  function f<T>(queue: IQueue<T>, lastIdx: number): T | null {
    const idx = queue.size - lastIdx
    let res: T | null = null
    for (let i = 0; i <= idx; i++) {
      res = queue.dequeue()
    }
    return res
  }

  const queue = new Queue<number>()
  queue.enqueue(1)
  queue.enqueue(2)
  queue.enqueue(3)

  expect(f(Queue.copy(queue), 1)).toBe(3)
  expect(f(Queue.copy(queue), 2)).toBe(2)
  expect(f(Queue.copy(queue), 3)).toBe(1)
})

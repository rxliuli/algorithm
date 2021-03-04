import { IQueue, LinkedQueue, Queue } from '../Queue'
import { Class } from 'type-fest'

describe('测试 Queue', () => {
  function testQueue(Queue: Class<IQueue<number>>) {
    const queue = new Queue()
    queue.enqueue(1)
    queue.enqueue(2)
    queue.enqueue(3)
    expect([...queue]).toEqual([1, 2, 3])
    expect(queue.dequeue()).toBe(1)
    expect(queue.dequeue()).toBe(2)
    expect(queue.dequeue()).toBe(3)
    expect(queue.isEmpty).toBeTruthy()
  }

  it('测试 Queue', () => {
    testQueue(Queue)
  })
  it('测试 LinkedQueue', () => {
    testQueue(LinkedQueue)
  })
})

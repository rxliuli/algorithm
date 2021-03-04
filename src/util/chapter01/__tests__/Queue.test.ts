import { IQueue, LinkedQueue, Queue } from '../Queue'

describe('测试 Queue', () => {
  function testQueue(queue: IQueue<number>) {
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
    testQueue(new Queue())
  })
  it('测试 LinkedQueue', () => {
    testQueue(new LinkedQueue())
  })
})

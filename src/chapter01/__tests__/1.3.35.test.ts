/*
1.3.35　随机队列。随机队列能够存储一组元素并支持表 1.3.11 中的 API：

　　　表 1.3.11　泛型随机队列的 API

public class RandomQueue<Item>
             RandomQueue()	创建一条空的随机队列
   boolean   isEmpty()	队列是否为空
      void   enqueue(Item item)	添加一个元素
      Item   dequeue()	删除并随机返回一个元素（取样且不放回）
      Item   sample()	随机返回一个元素但不删除它（取样且放回）
　　　编写一个 RandomQueue 类来实现这份 API。提示：使用（能够动态调整大小的）数组表示数据。删除一个元素时，随机交换某个元素（索引在 0 和 N-1 之间）和末位元素（索引为N-1）的位置，然后像 ResizingArrayStack 一样删除并返回末位元素。编写一个用例，使用 RandomQueue<Card> 在桥牌中发牌（每人 13 张）。
 */

import { ResizingArrayQueue } from './1.3.14.test'
import { ArrayUtil } from '../ArrayUtil'
import { sortBy } from '@liuli-util/array'
import { RandomUtil } from '../RandomUtil'
import { QueueUtil } from '../Queue'

class RandomQueue<T> extends ResizingArrayQueue<T> {
  constructor() {
    super(8)
  }

  *[Symbol.iterator](): Generator<T> {
    const iter = ArrayUtil.shuffle(this.arr, this.size)
    for (let item of iter) {
      yield item
    }
  }

  dequeue(): T | null {
    this.sample()
    return super.dequeue()
  }

  sample(): T | null {
    if (this.size === 0) {
      return null
    }
    const n = RandomUtil.integer(0, this.size)
    ;[this.arr[0], this.arr[n]] = [this.arr[n], this.arr[0]]
    return this.arr[0]
  }
}

describe('1.3.35', () => {
  const queue = new RandomQueue<number>()
  const arr = Array(10)
    .fill(0)
    .map((_, i) => i)
  beforeEach(() => {
    QueueUtil.clear(queue)
    arr.forEach((i) => queue.enqueue(i))
  })
  it('基本示例', () => {
    expect(sortBy([...queue])).toEqual(arr)
  })
  it('测试 dequeue/sample', () => {
    queue.sample()
    expect(queue.size).toBe(10)
    queue.dequeue()
    expect(queue.size).toBe(9)
  })
})

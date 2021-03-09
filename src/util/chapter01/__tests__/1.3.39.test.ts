/*
1.3.39　环形缓冲区。环形缓冲区，又称为环形队列，是一种定长为 N 的先进先出的数据结构。它在进程间的异步数据传输或记录日志文件时十分有用。当缓冲区为空时，消费者会在数据存入缓冲区前等待；当缓冲区满时，生产者会等待将数据存入缓冲区。为RingBuffer 设计一份API 并用（回环）数组将其实现。
 */
import { LinkedQueue } from '../Queue'
import { Class } from 'type-fest'

interface RingBuffer<T> {
  len: number
  size: number

  dequeue(): T | null

  enqueue(item: T): boolean
}

class RingBufferLoopLinkedNode<T> implements RingBuffer<T> {
  private queue = new LinkedQueue<T>()

  constructor(public readonly len: number) {}

  get size(): number {
    return this.queue.size
  }

  dequeue(): T | null {
    return this.queue.dequeue()
  }

  enqueue(item: T): boolean {
    if (this.size >= this.len) {
      return false
    }
    this.queue.enqueue(item)
    return true
  }
}

class RingBufferLoopArray<T> implements RingBuffer<T> {
  private arr: (T | null)[] = Array(this.len)
  private first = 0
  private last = 0
  private _size = 0

  constructor(public readonly len: number) {}

  private plus(n: number) {
    return (n + 1) % this.len
  }

  get size(): number {
    return this._size
  }

  dequeue(): T | null {
    if (this.size === 0) {
      return null
    }
    this._size--
    const res = this.arr[this.first]
    this.arr[this.first] = null
    this.first = this.plus(this.first)
    return res
  }

  enqueue(item: T): boolean {
    if (this.size >= this.len) {
      return false
    }
    this._size++
    this.arr[this.last] = item
    this.last = this.plus(this.last)
    return true
  }
}

describe('1.3.39', () => {
  function testRingBuffer(clazz: Class<RingBuffer<number>, [len: number]>) {
    const ringBuffer = new clazz(2)
    expect(ringBuffer.size).toBe(0)
    expect(ringBuffer.enqueue(1)).toBeTruthy()
    expect(ringBuffer.enqueue(2)).toBeTruthy()
    expect(ringBuffer.enqueue(3)).toBeFalsy()
    expect(ringBuffer.size).toBe(2)
    expect(ringBuffer.dequeue()).toBe(1)
    expect(ringBuffer.dequeue()).toBe(2)
    expect(ringBuffer.dequeue()).toBe(null)
  }

  it('链表实现', () => {
    testRingBuffer(RingBufferLoopLinkedNode)
  })
  it('环形数组实现', () => {
    testRingBuffer(RingBufferLoopArray)
  })
})

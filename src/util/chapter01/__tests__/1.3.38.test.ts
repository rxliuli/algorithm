/*
1.3.38　删除第 k 个元素。实现一个类并支持表 1.3.12 中的 API：

表 1.3.12　泛型一般队列的 API

public class GeneralizedQueue<Item>
             GeneralizedQueue()	创建一条空队列
   boolean   isEmpty()	队列是否为空
      void   insert(Item x)	添加一个元素
      Item   delete(int k)	删除并返回最早插入的第 k 个元素
　　　首先用数组实现该数据类型，然后用链表实现该数据类型。注意：我们在第 3 章中介绍的算法和数据结构可以保证 insert() 和 delete() 的实现所需的运行时间和和队列中的元素数量成对数关系——请见练习 3.5.27。
 */

import { Class } from 'type-fest'
import { LinkedNode } from '../LinkedNode'
import { LinkedNodeUtil } from '../LinkedNodeUtil'

interface GeneralizedQueue<T> extends Iterable<T> {
  size: number

  isEmpty: boolean

  insert(item: T): void

  delete(k: number): T | null
}

class GeneralizedQueueArray<T> implements GeneralizedQueue<T> {
  private arr: T[] = []
  private _size = 0
  len: number = 16

  get isEmpty() {
    return this.size === 0
  }

  get size(): number {
    return this._size
  }

  delete(k: number): T | null {
    if (this.isEmpty) {
      return null
    }
    const [res] = this.arr.splice(k, 1)
    this._size--
    if (this._size <= this.len / 4 && this.len > 1) {
      this.len = Math.floor(this.len / 2)
      this.arr = this.arr.slice(0, this.len)
    }
    return res
  }

  insert(item: T): void {
    if (this._size === this.len) {
      const old = this.arr
      this.len *= 2
      this.arr = Array(this.len)
      old.forEach((v, i) => (this.arr[i] = v))
    }
    this.arr[this._size] = item
    this._size++
  }

  [Symbol.iterator](): Iterator<T> {
    return this.arr[Symbol.iterator]()
  }
}

class GeneralizedQueueLinkedNode<T> implements GeneralizedQueue<T> {
  private first: LinkedNode<T> | null = null
  private last: LinkedNode<T> | null = null
  private _size = 0

  get isEmpty(): boolean {
    return this.size === 0
  }

  get size(): number {
    return this._size
  }

  [Symbol.iterator](): Iterator<T> {
    return LinkedNodeUtil.iterator(this.first, (item) => item.value)
  }

  delete(k: number): T | null {
    if (k >= this.size) {
      return null
    }
    const iter = LinkedNodeUtil.iterator({ value: null, next: this.first })
    for (let i = 0, curr = iter.next(); !curr.done; i++, curr = iter.next()) {
      if (i === k) {
        const res = curr.value.next!.value
        curr.value.next = curr.value.next!.next
        this._size--
        return res
      }
    }
    throw new Error('发生了一些错误')
  }

  insert(item: T): void {
    if (this.isEmpty) {
      this.first = this.last = { value: item, next: null }
    } else {
      const old = this.last
      this.last = { value: item, next: null }
      old!.next = this.last
    }
    this._size++
  }
}

describe('1.3.38', () => {
  function testGeneralizedQueue(clazz: Class<GeneralizedQueue<number>>) {
    const queue = new clazz()
    expect(queue.isEmpty).toBeTruthy()
    queue.insert(0)
    queue.insert(1)
    queue.insert(2)
    expect(queue.size).toBe(3)
    expect([...queue]).toEqual([0, 1, 2])
    expect(queue.delete(1)).toBe(1)
    expect(queue.delete(1)).toBe(2)
    expect(queue.delete(0)).toBe(0)
    expect(queue.isEmpty).toBeTruthy()
  }

  it('使用数组实现', () => {
    testGeneralizedQueue(GeneralizedQueueArray)
  })
  it('使用链表实现', () => {
    testGeneralizedQueue(GeneralizedQueueLinkedNode)
  })
})

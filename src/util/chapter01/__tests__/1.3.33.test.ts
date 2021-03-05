/*
1.3.33　Deque。一个双向队列（或者称为 deque）和栈或队列类似，但它同时支持在两端添加或删除元素。Deque 能够存储一组元素并支持表 1.3.9 中的 API：

　　　表 1.3.9　泛型双向队列的 API

public class Deque<Item> implements Iterable<Item>
             Deque()	创建空双向队列
   boolean   isEmpty()	双向队列是否为空
       int   size()	双向队列中的元素数量
      void   pushLeft(Item item)	向左端添加一个新元素
      void   pushRight(Item item)	向右端添加一个新元素
      Item   popLeft()	从左端删除一个元素
      Item   popRight()	从右端删除一个元素
　　　编写一个使用双向链表实现这份 API 的 Deque 类，以及一个使用动态数组调整实现这份 API 的 ResizingArrayDeque 类。
 */

import { IDoubleLinkedList } from '../DoubleLinkedList'

describe('1.3.33', () => {
  it('双向链表实现', () => {
    //已在 1.3.31 实现
  })
  it('动态扩容数组实现', () => {
    class ResizingArrayDeque<T> implements IDoubleLinkedList<T> {
      private arr: (T | null)[] = Array(16)
      private _size = 0

      get isEmpty(): boolean {
        return this.size === 0
      }

      get size(): number {
        return this._size
      }

      *[Symbol.iterator](): Iterator<T> {
        for (let i = 0; i < this.size; i++) {
          let item = this.arr[i]
          yield item!
        }
      }

      pop(): T | null {
        if (this.size === 0) {
          return null
        }
        const res = this.arr[this.size - 1]
        this.arr[this.size - 1] = null
        this._size--
        return res
      }

      private checkArrayLen() {
        if (this.size === this.arr.length) {
          const old = this.arr
          this.arr = Array(this.arr.length)
          this.arr.push(...old)
        }
      }

      push(item: T): void {
        this.checkArrayLen()
        this.arr[this._size] = item
        this._size++
      }

      shift(): T | null {
        if (this.size === 0) {
          return null
        }
        const old = this.arr
        const res = old[0]
        this.arr = Array(old.length)
        for (let i = 1; i < this.size; i++) {
          this.arr[i - 1] = old[i]
        }
        this._size--
        return res
      }

      unshift(item: T): void {
        this.checkArrayLen()
        const old = this.arr
        this.arr = Array(old.length)
        for (let i = 0; i < this.size; i++) {
          this.arr[i + 1] = old[i]
        }
        this.arr[0] = item
        this._size++
      }
    }

    const deque = new ResizingArrayDeque()
    expect(deque.isEmpty).toBeTruthy()
    deque.push(1)
    deque.push(2)
    deque.push(3)
    expect(deque.size).toBe(3)
    expect(deque.pop()).toBe(3)
    expect(deque.shift()).toBe(1)
    deque.unshift(1)
    expect(deque.size).toBe(2)
    expect(deque.shift()).toBe(1)
    expect(deque.shift()).toBe(2)
    expect(deque.shift()).toBeNull()
    expect(deque.isEmpty).toBeTruthy()
  })
})

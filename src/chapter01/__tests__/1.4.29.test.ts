/*
1.4.29　两个栈实现的 steque。用两个栈实现一个 steque（请见练习 1.3.32），使得每个 steque 操作所需的栈操均摊后为一个常数。
TODO 此处的实现是线性级别，需要优化
 */

import { IStack, LinkedStack } from '../Stack'
import { testStack } from './Stack.test'

interface ISteque<T> extends IStack<T> {
  dequeue(): T | null
}

class StequeWithTwoStack<T> implements ISteque<T> {
  private s1 = new LinkedStack<T>()
  private s2 = new LinkedStack<T>()

  get size(): number {
    return this.s1.size + this.s2.size
  }

  get isEmpty(): boolean {
    return this.size === 0
  }

  *[Symbol.iterator](): Iterator<T> {
    for (let t of this.s1) {
      yield t
    }
    for (let arr = [...this.s2], i = arr.length - 1; i >= 0; i--) {
      yield arr[i]
    }
  }

  dequeue(): T | null {
    if (this.size === 0) {
      return null
    }
    //需要时将 stack 转移
    if (this.s2.isEmpty) {
      while (!this.s1.isEmpty) {
        this.s2.push(this.s1.pop()!)
      }
    }
    return this.s2.pop()
  }

  pop(): T | null {
    if (this.isEmpty) {
      return null
    }
    //需要时将 stack 转移
    if (this.s1.isEmpty) {
      while (!this.s2.isEmpty) {
        this.s1.push(this.s2.pop()!)
      }
    }
    return this.s1.pop()
  }

  push(item: T): void {
    this.s1.push(item)
  }
}

it('1.4.29', () => {
  testStack(StequeWithTwoStack)
  const stack = new StequeWithTwoStack()
  expect(stack.dequeue()).toBeNull()
  stack.push(1)
  stack.push(2)
  stack.push(3)
  expect(stack.dequeue()).toBe(1)
  expect(stack.dequeue()).toBe(2)
  expect(stack.dequeue()).toBe(3)
  expect(stack.isEmpty).toBeTruthy()
})

/*
1.3.1　为 FixedCapacityStackOfStrings 添加一个方法 isFull()。
 */
import { IStack } from '../Stack'

it('1.3.1', () => {
  /**
   * 大小固定的栈
   */
  class FixedCapacityStack<T> implements IStack<T> {
    private len: number = 0
    private arr = Array(this.maxLength)

    constructor(private maxLength: number) {
    }

    get isEmpty(): boolean {
      return this.len === 0
    }

    get size(): number {
      return this.len
    }

    pop(): T | null {
      if (this.len === 0) {
        return null
      }
      this.len--
      const res = this.arr[this.len]
      this.arr[this.len] = null
      return res
    }

    push(item: T): void {
      if (this.isFull) {
        throw new Error('数组越界')
      }
      this.arr[this.len] = item
      this.len++
    }

    get isFull() {
      return this.len === this.maxLength
    }

    * [Symbol.iterator]() {
      for (let i = this.arr.length - 1; i >= 0; i--) {
        yield this.arr[i]
      }
    }
  }


  const stack = new FixedCapacityStack(2)
  expect(stack.isEmpty).toBeTruthy()
  stack.push(1)
  stack.push(2)
  expect(() => stack.push(3)).toThrowError()
  expect(stack.isFull).toBeTruthy()
  expect(stack.pop()).toBe(2)
  expect(stack.size).toBe(1)
  expect(stack.pop()).toBe(1)
  expect(stack.isEmpty).toBeTruthy()
})

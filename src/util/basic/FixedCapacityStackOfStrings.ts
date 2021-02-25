/**
 * 大小固定的栈
 */
import { IStack } from './Stack'

export class FixedCapacityStack<T> implements IStack<T> {
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
}

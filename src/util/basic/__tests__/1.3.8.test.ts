/*
1.3.8　给定以下输入，给出 DoublingStackOfStrings 的数组的内容和大小。

it was - the best - of times - - - it was - the - -

答：
12,22,12,22,34,24,34,44,34,24,12,22,34,24,34,24,12
 */

import { IStack } from '../Stack'

it('1.3.8', () => {
  class DoublingStack<T> implements IStack<T> {
    private arr: (T | null)[]
    private _size = 0
    private _len: number

    constructor(len: number) {
      this.arr = Array(len)
      this._len = len
    }

    get size() {
      return this._size
    }

    get isEmpty() {
      return this._size === 0
    }

    pop(): T | null {
      const i = this._size - 1
      if (i < 0) {
        return null
      }
      if (i <= Math.floor(this.len / 4)) {
        this._len = Math.floor(this.len / 2)
        this.arr = this.arr.slice(0, this._len)
      }
      this._size = i
      const res = this.arr[i]
      this.arr[i] = null
      return res
    }

    push(item: T): void {
      if (this._size >= this.len) {
        this.arr = [...this.arr, ...Array(this.len).fill(null)]
        this._len *= 2
      }
      this.arr[this._size] = item
      this._size++
    }

    get len() {
      return this._len
    }

    *[Symbol.iterator]() {
      for (let i = this.arr.length - 1; i >= 0; i--) {
        yield this.arr[i]!
      }
    }
  }

  const stack = new DoublingStack(2)
  const arr = 'it was - the best - of times - - - it was - the - -'.split(' ')
  const res = arr.reduce((res, s) => {
    if (s === '-') {
      stack.pop()
    } else {
      stack.push(s)
    }
    res.push([stack.size, stack.len])
    return res
  }, [] as [number, number][])
  console.log(res.map((v) => v.join('')).join(','))
})

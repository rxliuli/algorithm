/*
3.1.2　开发一个符号表的实现 ArrayST，使用（无序）数组来实现我们的基本 API。
*/

import { ST } from 'src/util/ST'
import { testBasicSt } from '../test/testBasicSt'

class ArrayST<K, V> implements ST<K, V> {
  private arr: [K, V][] = []
  put(key: K, val: V): void {
    this.delete(key)
    this.arr.push([key, val])
  }
  get(key: K) {
    for (let item of this.arr) {
      if (item[0] === key) {
        return item[1]
      }
    }
    return null
  }
  delete(key: K): void {
    for (let i = 0; i < this.arr.length; i++) {
      const item = this.arr[i]
      if (item[0] === key) {
        this.arr = this.arr.slice(0, i).concat(this.arr.slice(i + 1))
        return
      }
    }
  }
  contains(key: K): boolean {
    for (let item of this.arr) {
      if (item[0] === key) {
        return true
      }
    }
    return false
  }
  isEmpty(): boolean {
    return this.arr.length === 0
  }
  get size() {
    return this.arr.length
  }
  *[Symbol.iterator]() {
    for (let item of this.arr) {
      yield item
    }
  }
}
it('3.1.2', () => {
  const st = new ArrayST<number, number>()
  testBasicSt(st)
})

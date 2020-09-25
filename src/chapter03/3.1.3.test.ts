/*
3.1.3　开发一个符号表的实现 OrderedSequentialSearchST，使用有序链表来实现我们的有序符号表 API。
*/

import { ST } from 'src/util/ST'

interface KVNode<K, V> {
  key: K
  val: V
  prev: KVNode<K, V> | null
  next: KVNode<K, V> | null
}

class OrderedSequentialSearchST<K, V> implements ST<K, V> {
  private _size = 0
  private _first: KVNode<K, V> | null = null
  put(key: K, val: V): void {
    for (let node = this._first; !!node; node = node!.next) {
      if (key === node.key) {
        node.val = val
        return
      }
      if (key > node.key) {
        const temp = node.next
        node.next = {
          key,
          val,
          prev: node,
          next: temp,
        }
        if (temp) {
          temp.prev = node.next
        }
        return
      }
    }
    const temp = this._first
    this._first = {
      key,
      val,
      prev: null,
      next: temp,
    }
    if (temp) {
      temp!.prev = this._first
    }
  }
  get(key: K) {
    for (let node = this._first; !!node && key <= node.key; node = node!.next) {
      if (node.key === key) {
        return node.val
      }
    }
    return null
  }
  delete(key: K): void {
    for (let node = this._first; !!node && key <= node.key; node = node!.next) {
      if (node.key === key) {
        if (node.prev) {
          node.prev.next = node.next
        } else {
          this._first = node.next
        }
        return
      }
    }
  }
  contains(key: K): boolean {
    return this.get(key) !== null
  }
  isEmpty(): boolean {
    return this._size === 0
  }
  get size() {
    return this._size
  }
  *[Symbol.iterator]() {
    for (let node = this._first; !!node; node = node!.next) {
      yield [node.key, node.val] as [K, V]
    }
  }
}

it('3.1.3', () => {
  const st = new OrderedSequentialSearchST<number, number>()
  st.put(3, 3)
  st.put(1, 1)
  st.put(2, 2)
  console.log(Array.from(st))
})

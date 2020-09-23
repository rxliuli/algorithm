import { readFile, writeJson } from 'fs-extra'
import path from 'path'
import { rank } from '../util/rank'
import { sort } from '../util/sort'

describe('测试实现符号表', () => {
  interface ST<K, V> {
    /**
     * 将键值对存入表中（若值为空则将键 key 从表中删除）
     */
    put(key: K, val: V): void
    /**
     * 获取键 key 对应的值（若键 key 不存在则返回 null）
     */
    get(key: K): T
    /**
     * 	从表中删去键 key（及其对应的值）
     */
    delete(key: K): void
    /**
     * 键 key 在表中是否有对应的值
     * @param Key
     * @param key
     */
    contains(key: K): boolean
    /**
     * 表是否为空
     */
    isEmpty(): boolean
    /**
     * 表中的键值对数量
     */
    readonly size: number
    /**
     * 表中的所有键的集合
     */
    [Symbol.iterator](): Generator<[K, V]>
  }
  function testBasicSt(st: ST<number, number>) {
    st.put(1, 1)
    st.put(2, 2)
    st.put(3, 3)
    expect(st.size).toBe(3)
    expect(st.isEmpty()).toBeFalsy()
    expect(sort(Array.from(st), ([k]) => k)).toEqual([
      [1, 1],
      [2, 2],
      [3, 3],
    ])
    st.put(3, 4)
    expect(st.get(3)).toBe(4)
    expect(st.get(1)).toBe(1)
    expect(st.get(2)).toBe(2)
    expect(st.get(4)).toBeNull()
    st.delete(3)
    expect(sort(Array.from(st), ([k]) => k)).toEqual([
      [1, 1],
      [2, 2],
    ])
    st.delete(1)
    st.delete(2)
    expect(st.get(1)).toBeNull()
    expect(st.isEmpty()).toBeTruthy()
  }
  describe('链表实现', () => {
    interface KVNode<K, V> {
      key: K
      val: V
      next: KVNode<K, V> | null
    }

    class SequentialSearchST<K, V> implements ST<K, V> {
      protected first: KVNode<K, V> | null = null
      protected _size = 0
      /**
       * 插入是常数时间的操作
       * 由于插入到头部，会导致遍历顺序是插入顺序的倒序
       * @param key
       * @param val
       */
      put(key: K, val: V): void {
        this.delete(key)
        const first: KVNode<K, V> = {
          key,
          val,
          next: this.first,
        }
        this.first = first
        this._size++
      }
      /**
       * 获取是线性时间
       * @param key
       */
      get(key: K): V | null {
        for (const [k, v] of this) {
          if (key === k) {
            if (v === null) {
              this.delete(key)
              return null
            }
            return v
          }
        }
        return null
      }
      /**
       * 删除是线性时间
       * @param key
       */
      delete(key: K): void {
        if (this._size === 0) {
          return
        }
        let prev: KVNode<K, V> | null = null
        for (let node of this.iterator()) {
          if (node.key === key) {
            if (prev === null) {
              this.first = node.next
            } else {
              prev!.next = node.next
            }
            node.next = null
            this._size--
            return
          }
          prev = node
        }
      }
      /**
       * 基于 {@method get} 方法
       * @param key
       */
      contains(key: K): boolean {
        return this.get(key) !== null
      }
      isEmpty(): boolean {
        return this._size === 0
      }
      get size(): number {
        return this._size
      }
      protected *iterator() {
        for (let node = this.first; !!node; node = node.next) {
          yield node
        }
      }
      *[Symbol.iterator]() {
        for (let node of this.iterator()) {
          yield [node.key, node.val] as [K, V]
        }
      }
    }
    it('基本示例', () => {
      testBasicSt(new SequentialSearchST<number, number>())
    })
    it('测试 put 时查找的成本', async () => {
      class SequentialSearchST2<K, V> extends SequentialSearchST<K, V> {
        private _count: number[] = []
        put(key: K, val: V): void {
          this._count.push(0)
          this._delete(key)
          const first: KVNode<K, V> = {
            key,
            val,
            next: this.first,
          }
          this.first = first
          this._size++
        }
        _delete(key: K): void {
          if (this._size === 0) {
            return
          }
          let prev: KVNode<K, V> | null = null
          for (let node of this.iterator()) {
            this._count[this._count.length - 1]++
            if (node.key === key) {
              if (prev === null) {
                this.first = node.next
              } else {
                prev!.next = node.next
              }
              node.next = null
              this._size--
              return
            }
            prev = node
          }
        }

        get count() {
          return this._count
        }
      }
      const st = new SequentialSearchST2<string, string>()
      const text = await readFile(
        path.resolve(__dirname, './asset/data/tale.txt'),
        {
          encoding: 'utf-8',
        },
      )
      const wordList = text.split(' ').filter((i) => i.trim() !== '')
      console.log(wordList.length)
      wordList.slice(0, 10).forEach((word) => st.put(word, word))
      console.log(st.count.reduce((res, v) => res + v, 0))
      await writeJson(
        path.resolve(__dirname, './asset/data/tale.resp.json'),
        st.count,
      )
    })
  })
  describe('有序数组实现', () => {
    class BinarySearchST<K, V> implements ST<K, V> {
      private kvList: [K, V][] = []
      put(key: K, val: V): void {
        const idx = this.rank(key)
        if (idx === -1) {
          this.kvList.push([key, val])
          return
        }
        this.kvList[idx][1] = val
      }
      get(key: K): V | null {
        const idx = this.rank(key)
        if (idx === -1) {
          return null
        }
        return this.kvList[idx][1]
      }
      delete(key: K): void {
        const idx = this.rank(key)
        if (idx === -1) {
          return
        }
        this.kvList = this.kvList
          .slice(0, idx)
          .concat(this.kvList.slice(idx + 1))
      }
      contains(key: K): boolean {
        return this.rank(key) !== -1
      }
      isEmpty(): boolean {
        return this.kvList.length === 0
      }
      private rank(key: K): number {
        return rank(this.kvList, key, ([k]) => k)
      }
      get size() {
        return this.kvList.length
      }
      *[Symbol.iterator]() {
        for (let item of this.kvList) {
          yield item
        }
      }
    }
    it('基本示例', () => {
      testBasicSt(new BinarySearchST<number, number>())
    })
  })
})

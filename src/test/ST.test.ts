import { readFile, writeJson } from 'fs-extra'
import path from 'path'
import { SequentialSearchST } from '../util/SequentialSearchST'
import { BinarySearchST } from '../util/BinarySearchST'
import { testBasicSt } from './testBasicSt'

describe('测试实现符号表', () => {
  describe('链表实现', () => {
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
    it('基本示例', () => {
      testBasicSt(new BinarySearchST<number, number>())
    })
    it('插入重复值测试', () => {
      const st = new BinarySearchST<string, number[]>()
      st.put('A+', [])
      st.put('A+', [1])
      expect(st.get('A+')).toEqual([1])
      st.put('A', [])
      expect(st.get('A')).toEqual([])
      expect(st.size).toBe(2)
    })
  })
})

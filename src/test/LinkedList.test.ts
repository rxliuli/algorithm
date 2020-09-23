import { UnidirectionalLinkedNode } from '../util/UnidirectionalLinkedNode'

describe('测试链表', () => {
  describe('测试单向链表', () => {
    class UnidirectionalLinkedList<T> {
      private _size: number = 0
      private _first: UnidirectionalLinkedNode<T> | null = null
      private _last: UnidirectionalLinkedNode<T> | null = null

      get first() {
        const first = this._first
        if (!first) {
          return null
        }
        return first.val
      }

      insertFirst(val: T): void {
        const temp = this._first
        this._first = {
          val,
          next: temp,
        }
        this._size++
        if (this._size === 1) {
          this._last = this._first
        }
      }

      removeFirst(): void {
        if (!this._first) {
          return
        }
        this._first = this._first.next
        this._size--
        if (this._size === 0) {
          this._last = this._first
        }
      }

      get last() {
        const last = this._last
        if (!last) {
          return null
        }
        return last.val
      }

      insertLast(val: T): void {
        const last = {
          val,
          next: null,
        }
        const temp = this._last
        if (temp) {
          temp.next = last
        }
        this._last = last
        this._size++
        if (this._size === 1) {
          this._first = this._last
        }
      }

      removeLast(): void {
        if (this._size === 0) {
          return
        }
        if (this._first === this._last) {
          this._first = null
          this._last = null
          this._size = 0
          return
        }
        let curr: UnidirectionalLinkedNode<T> = this._first!
        let prev: UnidirectionalLinkedNode<T> | null = null
        while (curr.next) {
          prev = curr
          curr = curr.next
        }
        if (prev) {
          prev.next = null
          this._last = prev
          this._size--
        }
        if (this._size === 0) {
          this._first = this._last
        }
      }

      get(idx: number): T | null {
        if (idx < 0) {
          throw new Error('idx not less than 0')
        }
        let i = 0
        for (const v of this) {
          if (i === idx) {
            return v
          }
          i++
        }
        return null
      }

      /**
       * 将指定值插入到指定位置上，其余节点向后移动一位
       * @param idx
       * @param val
       */
      insert(idx: number, val: T): void {
        if (idx < 0 || (idx > 0 && idx >= this.size)) {
          return
        }
        if (idx === 0) {
          this.insertFirst(val)
          return
        }
        let i = 0
        for (const node of this.iterator()) {
          if (i === idx - 1) {
            const next = node.next
            node.next = {
              val,
              next,
            }
            this._size++
            break
          }
          i++
        }
      }

      private *iterator() {
        for (let node = this._first; !!node; node = node.next) {
          yield node
        }
      }

      *[Symbol.iterator]() {
        for (const node of this.iterator()) {
          yield node.val
        }
      }

      get size() {
        return this._size
      }
    }

    it('测试使用 Node 节点', () => {
      const first: UnidirectionalLinkedNode<number> = { val: 1, next: null }
      const second: UnidirectionalLinkedNode<number> = { val: 2, next: null }
      const third: UnidirectionalLinkedNode<number> = { val: 3, next: null }
      first.next = second
      second.next = third
    })
    it('测试基本的链表实现的列表', () => {
      const linkedList = new UnidirectionalLinkedList()
      expect(linkedList.first).toBeNull()
      expect(linkedList.last).toBeNull()
      linkedList.insertFirst(1)
      expect(linkedList.first).toBe(1)
      expect(linkedList.last).toBe(1)
      linkedList.removeFirst()
      expect(linkedList.first).toBeNull()
      expect(linkedList.last).toBeNull()
      linkedList.insertLast(2)
      expect(linkedList.last).toBe(2)
      expect(linkedList.first).toBe(2)
      linkedList.removeLast()
      expect(linkedList.first).toBeNull()
      expect(linkedList.last).toBeNull()
      expect(Array.from(linkedList)).toEqual([])
    })
    it('测试尾部操作', () => {
      const linkedList = new UnidirectionalLinkedList()
      linkedList.insertLast(1)
      linkedList.insertLast(2)
      linkedList.insertLast(3)
      expect(linkedList.size).toBe(3)
      expect(linkedList.last).toBe(3)
      linkedList.removeLast()
      expect(linkedList.size).toBe(2)
      expect(linkedList.last).toBe(2)
      linkedList.removeLast()
      expect(linkedList.last).toBe(1)
      expect(linkedList.last).toBe(1)
    })
    it('测试迭代器', () => {
      const linkedList = new UnidirectionalLinkedList()
      linkedList.insertLast(1)
      linkedList.insertLast(2)
      linkedList.insertLast(3)
      expect(Array.from(linkedList)).toEqual([1, 2, 3])
    })
    it('测试任意位置插入', () => {
      const linkedList = new UnidirectionalLinkedList()
      linkedList.insert(0, 1)
      linkedList.insert(0, 2)
      linkedList.insert(0, 3)
      expect(Array.from(linkedList)).toEqual([3, 2, 1])
      linkedList.insert(1, 4)
      expect(linkedList.get(1)).toBe(4)
      linkedList.insert(2, 5)
      expect(linkedList.get(2)).toBe(5)
    })
  })
})

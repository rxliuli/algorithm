/*
3.1.1 编写一段程序，创建一张符号表并建立字母成绩和数值分数的对应关系，如下表所示。从标准输
入读取一系列字母成绩，计算并打印 GPA（字母成绩对应的分数的平均值）。
| A+   | A    | A-   | B+   | B    | B-   | C+   | C    | C-   | D    | F    |
| ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| 4.33 | 4.00 | 3.67 | 3.33 | 3.00 | 2.67 | 2.33 | 2.00 | 1.67 | 1.00 | 0.00 |
 */
describe('3.1.1', () => {
  describe('单向链表', () => {
    interface Node<T> {
      val: T
      next: Node<T> | null
    }

    interface BaseLinkedList<T> {
      put(idx: number, val: T): void

      get(idx: number): void

      first: T | null

      insertFirst(val: T): void

      removeFirst(): void

      last: T | null

      insertLast(val: T): void

      removeLast(): void
    }

    class UnidirectionalLinkedList<T> implements BaseLinkedList<T> {
      private _size: number = 0
      private _first: Node<T> | null = null
      private _last: Node<T> | null = null

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
        let curr: Node<T> = { next: this._first } as any
        let prev: Node<T> | null = null
        while (curr.next) {
          prev = curr
          curr = curr.next
        }
        if (prev) {
          prev.next = null
          this._size--
        }
        if (this._size === 0) {
          this._first = this._last
        }
      }

      get(idx: number): void {}

      put(idx: number, val: T): void {}

      *[Symbol.iterator]() {
        let res = { next: this._first } as Node<T>
        while (res.next) {
          yield res.next.val
          res = res.next
        }
      }
    }

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
      console.log(Array.from(linkedList))
    })
  })
})

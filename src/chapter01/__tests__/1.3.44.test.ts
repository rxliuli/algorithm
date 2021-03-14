/*
1.3.44　文本编辑器的缓冲区。为文本编辑器的缓冲区设计一种数据类型并实现表 1.3.13 中的 API。

　　　表 1.3.13　文本缓冲区的 API

Public class Buffer
             Buffer()	创建一块空缓冲区
      void   insert(char c)	在光标位置插入字符 c
      char   delete()	删除并返回光标位置的字符
      void   left(int k)	将光标向左移动 k 个位置
      void   right(int k)	将光标向右移动 k 个位置
       int   size()	缓冲区中的字符数量
　　　提示：使用两个栈。
 */

import { LinkedStack } from '../Stack'
import { Class } from 'type-fest'

/**
 * 文本缓冲区的 API
 */
interface ITextBuffer {
  /**
   * 在光标位置插入字符 c
   */
  insert(c: string): void

  /**
   * 删除并返回光标位置的字符
   */
  delete(): string | null

  /**
   * 将光标向左移动 k 个位置
   */
  left(k: number): void

  /**
   * 将光标向右移动 k 个位置
   */
  right(k: number): void

  /**
   * 缓冲区中的字符数量
   */
  size: number
  /**
   * 当前光标位置
   */
  cursor: number
}

class TextBufferForArray implements ITextBuffer {
  //TODO 这里本应使用 DoubleLinkedList 实现
  private list: string[] = []
  private _cursor = 0

  get cursor() {
    return this._cursor
  }

  get size(): number {
    return this.list.length
  }

  delete(): string | null {
    return this.list.splice(this._cursor, 1)[0] ?? null
  }

  insert(c: string): void {
    this.list.splice(this._cursor, 0, c)
    this._cursor++
  }

  left(k: number): void {
    this._cursor = Math.max(0, this._cursor - k)
  }

  right(k: number): void {
    this._cursor = Math.min(this.list.length - 1, this._cursor + k)
  }
}

class TextBufferForStack implements ITextBuffer {
  private leftStack = new LinkedStack<string>()
  private rightStack = new LinkedStack<string>()

  get cursor() {
    return this.leftStack.size
  }

  get size(): number {
    return this.leftStack.size + this.rightStack.size
  }

  delete(): string | null {
    return this.rightStack.pop()
  }

  insert(c: string): void {
    this.leftStack.push(c)
  }

  left(k: number): void {
    for (let i = 0; i < k && !this.leftStack.isEmpty; i++) {
      this.rightStack.push(this.leftStack.pop()!)
    }
  }

  right(k: number): void {
    for (let i = 0; i < k && !this.rightStack.isEmpty; i++) {
      this.leftStack.push(this.rightStack.pop()!)
    }
  }
}

describe('1.3.44', () => {
  function testTextBuffer(clazz: Class<ITextBuffer>) {
    const buffer = new clazz()
    expect(buffer.cursor).toBe(0)
    buffer.insert('h')
    buffer.insert('e')
    buffer.insert('l')
    buffer.insert('l')
    buffer.insert('o')
    expect(buffer.cursor).toBe(5)
    expect(buffer.delete()).toBe(null)
    buffer.left(10)
    expect(buffer.cursor).toBe(0)
    expect(buffer.delete()).toBe('h')
    expect(buffer.size).toBe(4)
    buffer.right(buffer.size - 1)
    expect(buffer.delete()).toBe('o')
  }

  it('使用双向链表实现', () => {
    testTextBuffer(TextBufferForArray)
  })
  it('使用两个栈实现', () => {
    testTextBuffer(TextBufferForStack)
  })
})

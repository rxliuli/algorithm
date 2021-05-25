/*
2.1.14　出列排序。说说你会如何将一副扑克牌排序，限制条件是只能查看最上面的两张牌，交换最上面的两张牌，或是将最上面的一张牌放到这摞牌的最下面。

答：
实际上是选择排序，遍历一圈找到最小的扔到最下面
 */

import { RandomUtil } from '../../chapter01/RandomUtil'
import { sortBy } from '@liuli-util/array'

describe('2.1.14', () => {
  class PlayingCards {
    constructor(private arr: number[]) {}

    get first() {
      return this.arr[0]
    }

    get second() {
      return this.arr[1]
    }

    exchange() {
      if (this.len < 2) {
        return
      }
      ;[this.arr[0], this.arr[1]] = [this.arr[1], this.arr[0]]
    }

    insert() {
      if (this.len < 2) {
        return
      }
      this.arr.push(this.arr.shift()!)
    }

    toArray() {
      return [...this.arr]
    }

    get len() {
      return this.arr.length
    }
  }

  describe('测试数据结构', () => {
    it('基本示例', () => {
      const playingCards = new PlayingCards([1, 2, 3])
      expect(playingCards.len).toBe(3)
      expect(playingCards.first).toBe(1)
      expect(playingCards.second).toBe(2)
      playingCards.exchange()
      expect(playingCards.first).toBe(2)
      expect(playingCards.second).toBe(1)
      playingCards.insert()
      expect(playingCards.toArray()).toEqual([1, 3, 2])
    })
    it('测试数组为空', () => {
      const playingCards = new PlayingCards([])
      expect(playingCards.len).toBe(0)
      expect(playingCards.first).toBeUndefined()
      expect(playingCards.second).toBeUndefined()
      playingCards.exchange()
      playingCards.insert()
      expect(playingCards.len).toBe(0)
    })
    it('测试循环', () => {
      const arr = [1, 2, 3]
      const playingCards = new PlayingCards(arr)
      playingCards.insert()
      playingCards.insert()
      playingCards.insert()
      expect(playingCards.toArray()).toEqual(arr)
    })
  })

  describe('按照选择排序的思路实现', () => {
    /**
     * 基本思路是每次遍历都找到剩余数组中最大的数，然后将之与之前已经找到的最大的数全部扔到后面，循环往复，直到遍历每一个元素
     * @link https://photos.google.com/photo/AF1QipMIsKr72ypkgP9U5XiS9XZqUGJFxtDyPYSB9fE6
     * @param pc
     */
    function sortOfSelection(pc: PlayingCards) {
      for (let i = 0; i < pc.len; i++) {
        const count = i + 1
        for (let j = 0; j < pc.len - count; j++) {
          if (pc.first > pc.second) {
            pc.exchange()
          }
          pc.insert()
        }
        for (let j = 0; j < count; j++) {
          pc.insert()
        }
      }
      return pc
    }

    it('基本测试', () => {
      const arr = RandomUtil.array(100)
      expect(sortOfSelection(new PlayingCards(arr)).toArray()).toEqual(
        sortBy(arr),
      )
    })
  })
})

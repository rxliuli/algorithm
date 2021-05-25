/*
2.1.13　纸牌排序。说说你会如何将一副扑克牌按花色排序（花色顺序是黑桃、红桃、梅花和方片），限制条件是所有牌都是背面朝上排成一列，而你一次只能翻看两张牌或者交换两张牌（保持背面朝上）。

答：
插入排序和选择排序都是每次对比、交换两个元素，所以都可以
 */
import { RandomUtil } from '../../chapter01/RandomUtil'
import { sortBy } from '@liuli-util/array'

it('2.1.13', () => {
  type Card = 1 | 2 | 3 | 4

  function sortOfInsert(arr: Card[]): Card[] {
    for (let i = 1; i < arr.length; i++) {
      //每次只对比两张牌
      for (let j = i - 1; arr[j] > arr[j + 1] && j >= 0; j--) {
        //每次只交换两张牌
        ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
      }
    }
    return arr
  }

  const arr = RandomUtil.array(100, () => RandomUtil.integer(1, 5) as Card)
  expect(sortOfInsert(arr)).toEqual(sortBy(arr))
})

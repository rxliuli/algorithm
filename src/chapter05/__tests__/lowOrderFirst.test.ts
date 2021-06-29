import { sortBy } from '@liuli-util/array'
import { RandomUtil } from '../../chapter01/RandomUtil'
import { Random } from 'mockjs'
import { ArrayUtil } from '../../chapter01/ArrayUtil'
import { sortByCount } from './keyIndexCount.test'

describe('低位优先', () => {
  // function sortByW(arr: string[], w: number) {
  //   const len = arr.length
  //   const aux = new Array(len)
  //   //这里其实就是默认已知可能出现的字符都在 0-256 之间了
  //   const R = 256
  //   const count = new Array(R).fill(0)
  //   //统计频率
  //   for (let s of arr) {
  //     count[s.charCodeAt(w)]++
  //   }
  //   // console.log(count['5'.charCodeAt(0)])
  //   //将频率转换为下标
  //   for (let i = 1; i < count.length; i++) {
  //     count[i] += count[i - 1]
  //   }
  //   //复制到 aux
  //   for (let s of arr) {
  //     aux[count[s.charCodeAt(w) - 1]++] = s
  //   }
  //   // console.log(aux)
  //   //回写到 arr
  //   for (let i = 0; i < len; i++) {
  //     arr[i] = aux[i]
  //   }
  //   return arr
  // }

  /**
   * 低位优先的字符串排序
   * 其实想法是将低位排序之后，再排序高位的，那么高位相同的字符串低位仍然是有序的，只不过与高位排序不同之处在于排序的顺序不同，优先保证同一高位的低位有序罢了
   * @link https://photos.google.com/photo/AF1QipO8yxfvYG1ZAyOuULJoD-i4w3R8dTOukKGTCAaj
   * @param arr
   * @param W
   */
  function sortByLowOrderFirst(arr: string[], W: number) {
    let res = arr
    for (let w = W - 1; w >= 0; w--) {
      res = sortByCount(res, (s) => s.charCodeAt(w), 256)
    }
    return res
  }

  it('基本示例', () => {
    const arr = ['5413', '4628', '1907', '3825']
    const res = sortByLowOrderFirst([...arr], 4)
    console.log(res)
    expect(res).toEqual(sortBy(arr))
  })
  it('随机数据测试', () => {
    const w = 10
    const arr = RandomUtil.array(100, () =>
      RandomUtil.array(w, () =>
        String.fromCharCode(Random.integer(46, 256)),
      ).join(''),
    )
    expect(sortByLowOrderFirst([...arr], w)).toEqual(sortBy(arr))
  })
})

describe('扑克牌排序', () => {
  enum CardColorEnum {
    /**
     * 红桃
     */
    Hearts = 1,
    /**
     * 方块
     */
    Cube,
    /**
     * 梅花
     */
    PlumFlower,
    /**
     * 黑桃
     */
    Spades,
  }

  enum CardValueEnum {
    $A = 1,
    $2,
    $3,
    $4,
    $5,
    $6,
    $7,
    $8,
    $9,
    $10,
    $J,
    $Q,
    $K,
  }

  interface Card {
    color: CardColorEnum
    value: CardValueEnum
  }

  /**
   * 排序扑克牌
   * 基本思路
   * 将之按照值分成 13 堆，再根据花色分成四堆
   * @param cards
   */
  function sortCard(cards: Card[]) {
    let res = sortByCount(cards, (card) => card.value, 13)
    // console.log('value: ', res)
    res = sortByCount(res, (card) => card.color, 4)
    // console.log('color: ', res)
    return res
  }

  it('基本示例', () => {
    const cards: Card[] = [
      { color: CardColorEnum.Cube, value: CardValueEnum.$3 },
      { color: CardColorEnum.Cube, value: CardValueEnum.$4 },
      { color: CardColorEnum.Cube, value: CardValueEnum.$A },
      { color: CardColorEnum.Cube, value: CardValueEnum.$2 },
    ]

    expect(sortCard(cards)).toEqual(
      sortBy(cards, (item) => item.color * 100 + item.value),
    )
  })
  it('生成一副完整的扑克牌测试', () => {
    const cards = RandomUtil.array(4, (i) =>
      RandomUtil.array(
        13,
        (k) =>
          ({
            color: ((i + 1) as unknown) as CardColorEnum,
            value: ((k + 1) as unknown) as CardValueEnum,
          } as Card),
      ),
    ).flat()
    const shuffle = [...ArrayUtil.shuffle(cards)]
    expect(shuffle).not.toEqual(cards)
    expect(sortCard(shuffle)).toEqual(cards)
  })
})

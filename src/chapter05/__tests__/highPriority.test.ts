import { RandomUtil } from '../../chapter01/RandomUtil'
import { Random } from 'mockjs'
import { sortBy } from '@liuli-util/array'

describe('高位优先', () => {
  function getKey(s: string, w: number) {
    if (s.length <= w) {
      return 1
    } else {
      return s.charCodeAt(w) + 2
    }
  }

  /**
   * 排序指定区间，该区间的高位必须相同
   * @link https://photos.google.com/photo/AF1QipPu66OAja7I8r-xPPb-9qUMUIruESO-V4pa_tDb
   * @param arr
   * @param aux
   * @param l
   * @param r
   * @param w
   */
  function sortRange(
    arr: string[],
    aux: string[],
    l: number,
    r: number,
    w: number,
  ) {
    const R = 256
    if (l >= r) {
      return
    }
    //这里 +2 的原因是首位必须是 0，第一位被用作保留当前字符串已经结束的情况，例如 w=0 时的空白字符串
    const count = new Array(R + 2).fill(0)
    for (let i = l; i <= r; i++) {
      const s = arr[i]
      // console.log(s, getKey(s, w))
      count[getKey(s, w)]++
    }
    // console.log(count)
    const backup = [...count]
    for (let i = 1; i < count.length; i++) {
      count[i] += count[i - 1]
    }
    // console.log(count)
    for (let i = l; i <= r; i++) {
      const s = arr[i]
      // console.log(s, count[getKey(s, w) - 1])
      aux[l + count[getKey(s, w) - 1]++] = arr[i]
    }
    for (let i = l; i <= r; i++) {
      arr[i] = aux[i]
    }
    //递归继续往下找
    for (let i = 0; count[i] <= r - l; i++) {
      const li = l + count[i]
      const ri = l + count[i + 1] - 1
      // if (l === 1 && r === 2) {
      //   console.log(li, ri, count, backup)
      // }
      // console.log(li, ri, backup[i + 1])
      sortRange(arr, aux, li, ri, w + 1)
    }
    // console.log(count)

    // console.log(arr)
  }

  /**
   * 高位优先的字符串排序
   * 按照高位，然后将相同的字符继续排序子数组
   * @param arr
   */
  function sortByHighPriority(arr: string[]) {
    sortRange(arr, new Array(arr.length), 0, arr.length - 1, 0)
    return arr
  }

  it('基本示例', () => {
    const arr = ['13579', '', '2468', '13596', '13575']
    sortRange(arr, new Array(arr.length), 0, 4, 0)
    console.log(arr)
  })
  it('测试随机数据', () => {
    const arr = RandomUtil.array(100, () =>
      RandomUtil.array(Random.integer(0, 10), () =>
        String.fromCharCode(Random.integer(46, 256)),
      ).join(''),
    )

    // const arr = ['', '4ÎÎhÙw/', '4ÊóºÌk']
    const res = sortByHighPriority([...arr])
    // console.log(res)
    const expectRes = sortBy(arr)
    // console.log(expectRes)
    expect(res).toEqual(expectRes)
  })
})

/*
1.1.30 数组练习。编写一段程序，创建一个 N×N 的布尔数组 a[][]。其中当 i 和 j 互质时（没有相同
因子），a[i][j] 为 true，否则为 false。
 */
/*
答案：
两个函数，一个判断两个数是否互质，另一个生成数组
 */

import { gcd } from '../util/gcd'

it('1.1.30', () => {
  function gen(num: number) {
    const res: boolean[][] = []
    for (let i = 0; i < num; i++) {
      res[i] = []
      for (let j = 0; j < num; j++) {
        res[i][j] = gcd(i, j) === 1
      }
    }
    return res
  }
  expect(gen(4)).toEqual([
    [false, true, false, false],
    [true, true, true, true],
    [false, true, false, true],
    [false, true, true, false],
  ])
})

/*
1.1.13 编写一段代码，打印出一个 M 行 N 列的二维数组的转置（交换行和列）。
 */

/*
答案
交换行与列
 */

import { max } from '../util/max'

describe('1.1.13', () => {
  it('暴力解法', () => {
    function rowToCol<T>(arr: T[][]) {
      const maxLen = max(arr.map((a) => a.length))
      const res = [] as T[][]
      for (let i = 0; i < maxLen; i++) {
        res.push([])
        for (let j = 0; j < arr.length; j++) {
          res[i][j] = arr[j][i]
        }
      }
      return res
    }

    console.log(rowToCol([[1], [1, 2], [1, 2, 3]]))
  })
  it('高阶函数', () => {
    function rowToCol<T>(arr: T[][]) {
      return Array(max(arr.map((a) => a.length)))
        .fill(0)
        .map(function (_col, i) {
          return arr.map(function (row) {
            return row[i]
          })
        })
    }

    console.log(rowToCol([[1], [1, 2], [1, 2, 3]]))
  })
})

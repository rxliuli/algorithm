/*
1.1.11 编写一段代码，打印出一个二维布尔数组的内容。其中，使用 * 表示真，空格表示假。打印出
行号和列号。
 */

/*
答案：
首先想到的肯定是在第一行之前打印列，每一次外层循环之前打印行，但实际中发现了第一行之前打印列需要知道二维数组的最大列数
 */

import { rand } from '../util/rand'
import { max } from '../util/max'

it('1.1.11', () => {
  let s = ''
  function foo(arr: boolean[][]) {
    const len = max(arr.map((a) => a.length))
    s += ' '
    for (let i = 0; i < len; i++) {
      s += i
    }
    s += '\n'
    for (let i = 0; i < arr.length; i++) {
      const element = arr[i]
      s += i
      for (let j = 0; j < element.length; j++) {
        s += element[j] ? '*' : ' '
      }
      s += '\n'
    }
    return s
  }
  const res = foo(
    Array(10)
      .fill(0)
      .map(() =>
        Array(10)
          .fill(0)
          .map(() => rand(10) % 2 === 0),
      ),
  )

  console.log(res)
})

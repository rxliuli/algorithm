/*
1.1.21 编写一段程序，从标准输入按行读取数据，其中每行都包含一个名字和两个整数。然后用
printf() 打印一张表格，每行的若干列数据包括名字、两个整数和第一个整数除以第二个整数
的结果，精确到小数点后三位。可以用这种程序将棒球球手的击球命中率或者学生的考试分数
制成表格。
 */

/*
答案：
本质上还是格式化的问题
 */

import { sizeof } from '../util/sizeof'

describe('1.1.21', () => {
  it('基本解法', () => {
    function format(num: number | string, maxLen: number) {
      const s = num.toString()
      return s.padEnd(maxLen - (sizeof(s) - s.length), ' ')
    }
    function printf(data: [string, number, number][]) {
      const maxLenObject = data.reduce(
        (res, [name, i, k]) => ({
          name: Math.max(sizeof(name.toString()), res.name),
          i: Math.max(sizeof(i.toString()), res.i),
          k: Math.max(sizeof(k.toString()), res.k),
          r: Math.max(sizeof((i / k).toFixed(2)), res.r),
        }),
        { name: 0, i: 0, k: 0, r: 0 },
      )
      return data
        .map(([name, i, k]) => [
          format(name, maxLenObject.name),
          format(i, maxLenObject.i),
          format(k, maxLenObject.k),
          format((i / k).toFixed(2), maxLenObject.r),
        ])
        .map((row) => row.join(', '))
        .join('\n')
    }
    console.log(
      printf([
        ['liuli', 1, 2],
        ['零', 1, 3],
        ['亚当-夏娃', 10, 34],
      ]),
    )
  })
})

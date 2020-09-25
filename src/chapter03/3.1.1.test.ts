import { BinarySearchST } from '../util/BinarySearchST'

/*
3.1.1 编写一段程序，创建一张符号表并建立字母成绩和数值分数的对应关系，如下表所示。从标准输
入读取一系列字母成绩，计算并打印 GPA（字母成绩对应的分数的平均值）。
| A+   | A    | A-   | B+   | B    | B-   | C+   | C    | C-   | D    | F    |
| 4.33 | 4.00 | 3.67 | 3.33 | 3.00 | 2.67 | 2.33 | 2.00 | 1.67 | 1.00 | 0.00 |
 */
it('3.1.1', () => {
  interface Record {
    // 字母
    letter: string
    // 分数
    fraction: number
  }
  function f(records: Record[]) {
    const res = records.reduce((map, record) => {
      const k = record.letter
      const v = record.fraction
      if (!map.contains(k)) {
        map.put(k, [])
      }
      map.get(k)!.push(v)
      return map
    }, new BinarySearchST<string, number[]>())
    return Array.from(res).reduce((res, [k, v]) => {
      res.put(k, v.reduce((res, v) => res + v, 0) / v.length)
      return res
    }, new BinarySearchST<string, number>())
  }
  const res = f([
    { letter: 'A+', fraction: 4.33 },
    { letter: 'A+', fraction: 4 },
    { letter: 'A', fraction: 4.0 },
    { letter: 'A-', fraction: 3.67 },
    { letter: 'B+', fraction: 3.33 },
    { letter: 'B', fraction: 3.0 },
    { letter: 'B-', fraction: 2.67 },
    { letter: 'C+', fraction: 2.33 },
    { letter: 'C', fraction: 2.0 },
    { letter: 'C-', fraction: 1.67 },
    { letter: 'D', fraction: 1.0 },
    { letter: 'F', fraction: 0.0 },
  ])
  console.log(res)
})

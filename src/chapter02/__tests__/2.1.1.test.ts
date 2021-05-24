/*
2.1.1　按照算法 2.1 所示轨迹的格式给出选择排序是如何将数组 E A S Y Q U E S T I O N 排序的。

| i  | min |
| -- | --- |
| 0  | 1   |
| 1  | 1   |
| 2  | 6   |
| 3  | 9   |
| 4  | 11  |
| 5  | 10  |
| 6  | 11  |
| 7  | 7   |
| 8  | 11  |
| 9  | 11  |
| 10 | 10  |
 */

import { markdownTable } from '@liuli-util/markdown-table'

export function sortOfSelection<T>(
  arr: T[],
): [res: T[], locus: [i: number, min: number, arr: T[]][]] {
  const locus: [i: number, min: number, arr: T[]][] = []

  for (let i = 0; i < arr.length - 1; i++) {
    let min = i
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[min]) {
        min = j
      }
    }
    locus.push([i, min, [...arr]])
    ;[arr[i], arr[min]] = [arr[min], arr[i]]
  }
  return [arr, locus]
}

it('2.1.1', () => {
  const [, locus] = sortOfSelection('E A S Y Q U E S T I O N'.split(' '))

  console.log(markdownTable([['i', 'min'], ...locus]))
})

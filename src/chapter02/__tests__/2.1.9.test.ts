/*
2.1.9　按照算法 2.3 所示轨迹的格式给出希尔排序是如何将数组 E A S Y S H E L L S O R T Q U E S T I O N 排序的。

答：
| i   | j   | 0   | 1   | 2   | 3   | 4   | 5   | 6   | 7   | 8   | 9   | 10  | 11  | 12  | 13  | 14  | 15  | 16  | 17  | 18  | 19  | 20  |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 15  | 2   | E   | A   | S   | Y   | S   | H   | E   | L   | L   | S   | O   | R   | T   | Q   | U   | E   | S   | T   | I   | O   | N   |
| 16  | 3   | E   | A   | E   | Y   | S   | H   | E   | L   | L   | S   | O   | R   | T   | Q   | U   | S   | S   | T   | I   | O   | N   |
| 7   | 3   | E   | A   | E   | S   | S   | H   | E   | L   | L   | S   | O   | R   | T   | Q   | U   | S   | Y   | T   | I   | O   | N   |
| 8   | 4   | E   | A   | E   | L   | S   | H   | E   | S   | L   | S   | O   | R   | T   | Q   | U   | S   | Y   | T   | I   | O   | N   |
| 11  | 7   | E   | A   | E   | L   | L   | H   | E   | S   | S   | S   | O   | R   | T   | Q   | U   | S   | Y   | T   | I   | O   | N   |
| 13  | 9   | E   | A   | E   | L   | L   | H   | E   | R   | S   | S   | O   | S   | T   | Q   | U   | S   | Y   | T   | I   | O   | N   |
| 18  | 14  | E   | A   | E   | L   | L   | H   | E   | R   | S   | Q   | O   | S   | T   | S   | U   | S   | Y   | T   | I   | O   | N   |
| 14  | 10  | E   | A   | E   | L   | L   | H   | E   | R   | S   | Q   | O   | S   | T   | S   | I   | S   | Y   | T   | U   | O   | N   |
| 19  | 15  | E   | A   | E   | L   | L   | H   | E   | R   | S   | Q   | I   | S   | T   | S   | O   | S   | Y   | T   | U   | O   | N   |
| 15  | 11  | E   | A   | E   | L   | L   | H   | E   | R   | S   | Q   | I   | S   | T   | S   | O   | O   | Y   | T   | U   | S   | N   |
| 11  | 7   | E   | A   | E   | L   | L   | H   | E   | R   | S   | Q   | I   | O   | T   | S   | O   | S   | Y   | T   | U   | S   | N   |
| 20  | 16  | E   | A   | E   | L   | L   | H   | E   | O   | S   | Q   | I   | R   | T   | S   | O   | S   | Y   | T   | U   | S   | N   |
| 16  | 12  | E   | A   | E   | L   | L   | H   | E   | O   | S   | Q   | I   | R   | T   | S   | O   | S   | N   | T   | U   | S   | Y   |
| 12  | 8   | E   | A   | E   | L   | L   | H   | E   | O   | S   | Q   | I   | R   | N   | S   | O   | S   | T   | T   | U   | S   | Y   |
| 1   | 0   | E   | A   | E   | L   | L   | H   | E   | O   | N   | Q   | I   | R   | S   | S   | O   | S   | T   | T   | U   | S   | Y   |
| 5   | 4   | A   | E   | E   | L   | L   | H   | E   | O   | N   | Q   | I   | R   | S   | S   | O   | S   | T   | T   | U   | S   | Y   |
| 4   | 3   | A   | E   | E   | L   | H   | L   | E   | O   | N   | Q   | I   | R   | S   | S   | O   | S   | T   | T   | U   | S   | Y   |
| 6   | 5   | A   | E   | E   | H   | L   | L   | E   | O   | N   | Q   | I   | R   | S   | S   | O   | S   | T   | T   | U   | S   | Y   |
| 5   | 4   | A   | E   | E   | H   | L   | E   | L   | O   | N   | Q   | I   | R   | S   | S   | O   | S   | T   | T   | U   | S   | Y   |
| 4   | 3   | A   | E   | E   | H   | E   | L   | L   | O   | N   | Q   | I   | R   | S   | S   | O   | S   | T   | T   | U   | S   | Y   |
| 8   | 7   | A   | E   | E   | E   | H   | L   | L   | O   | N   | Q   | I   | R   | S   | S   | O   | S   | T   | T   | U   | S   | Y   |
| 10  | 9   | A   | E   | E   | E   | H   | L   | L   | N   | O   | Q   | I   | R   | S   | S   | O   | S   | T   | T   | U   | S   | Y   |
| 9   | 8   | A   | E   | E   | E   | H   | L   | L   | N   | O   | I   | Q   | R   | S   | S   | O   | S   | T   | T   | U   | S   | Y   |
| 8   | 7   | A   | E   | E   | E   | H   | L   | L   | N   | I   | O   | Q   | R   | S   | S   | O   | S   | T   | T   | U   | S   | Y   |
| 7   | 6   | A   | E   | E   | E   | H   | L   | L   | I   | N   | O   | Q   | R   | S   | S   | O   | S   | T   | T   | U   | S   | Y   |
| 6   | 5   | A   | E   | E   | E   | H   | L   | I   | L   | N   | O   | Q   | R   | S   | S   | O   | S   | T   | T   | U   | S   | Y   |
| 14  | 13  | A   | E   | E   | E   | H   | I   | L   | L   | N   | O   | Q   | R   | S   | S   | O   | S   | T   | T   | U   | S   | Y   |
| 13  | 12  | A   | E   | E   | E   | H   | I   | L   | L   | N   | O   | Q   | R   | S   | O   | S   | S   | T   | T   | U   | S   | Y   |
| 12  | 11  | A   | E   | E   | E   | H   | I   | L   | L   | N   | O   | Q   | R   | O   | S   | S   | S   | T   | T   | U   | S   | Y   |
| 11  | 10  | A   | E   | E   | E   | H   | I   | L   | L   | N   | O   | Q   | O   | R   | S   | S   | S   | T   | T   | U   | S   | Y   |
| 19  | 18  | A   | E   | E   | E   | H   | I   | L   | L   | N   | O   | O   | Q   | R   | S   | S   | S   | T   | T   | U   | S   | Y   |
| 18  | 17  | A   | E   | E   | E   | H   | I   | L   | L   | N   | O   | O   | Q   | R   | S   | S   | S   | T   | T   | S   | U   | Y   |
| 17  | 16  | A   | E   | E   | E   | H   | I   | L   | L   | N   | O   | O   | Q   | R   | S   | S   | S   | T   | S   | T   | U   | Y   |
 */

import { markdownTable } from '@liuli-util/markdown-table'
import { red } from 'ansi-colors'

export function sortOfShell<T>(
  arr: T[],
): [res: T[], locus: [i: number, j: number, arr: T[]][]] {
  const locus: [i: number, j: number, arr: T[]][] = []
  let len = arr.length
  let h = 1
  while (h < len / 3) h = 3 * h + 1 // 1, 4, 13, 40, 121, 364, 1093, ...
  while (h >= 1) {
    // 将数组变为h有序
    for (let i = h; i < len; i++) {
      // 将 a[i] 插入到 a[i-h], a[i-2*h], a[i-3*h]... 之中
      for (let j = i; j >= h && arr[j] < arr[j - h]; j -= h) {
        locus.push([j, j - h, [...arr]])
        ;[arr[j], arr[j - h]] = [arr[j - h], arr[j]]
      }
    }
    h = Math.floor(h / 3)
  }
  return [arr, locus]
}

it('2.1.9', () => {
  const arr = 'E A S Y S H E L L S O R T Q U E S T I O N'.split(' ')
  const [, locus] = sortOfShell(arr)
  console.log(
    markdownTable([
      [
        'i',
        'j',
        ...Array(arr.length)
          .fill(0)
          .map((_, i) => i),
      ],
      ...locus.map(([i, j, arr]) => [
        i,
        j,
        ...arr.map((v, index) => {
          if (index === i || index === j) {
            return red(v)
          }
          return v
        }),
      ]),
    ]),
  )
})

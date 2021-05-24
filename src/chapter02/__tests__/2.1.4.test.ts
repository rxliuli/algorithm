/*
2.1.4　按照算法 2.2 所示轨迹的格式给出插入排序是如何将数组 E A S Y Q U E S T I O N 排序的。
 */

import { showSparkly } from '../../__tests__/sparkly.test'

export function sortOfInsert<T>(
  arr: T[],
): [res: T[], locus: [i: number, j: number, arr: T[]][]] {
  const locus: [i: number, curr: number, arr: T[]][] = []
  for (let i = 1; i < arr.length; i++) {
    for (let j = i - 1; arr[j] > arr[j + 1] && j >= 0; j--) {
      locus.push([i, j, [...arr]])
      ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
    }
  }
  return [arr, locus]
}

it('2.1.4', async () => {
  const [res, locus] = sortOfInsert(
    '7546289103'.split('').map((s) => Number.parseInt(s)),
  )
  await showSparkly([...locus.map(([, , arr]) => arr), res])
})

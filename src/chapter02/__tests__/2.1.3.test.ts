/*
2.1.3　构造一个含有 N 个元素的数组，使选择排序（算法 2.1）运行过程中 a[j] < a[min]（由此 min 会不断更新）成功的次数最大。

答：
需要让 min 不断更新，不断更新取决于当前最小的比下个仍然更小

感觉上可以使用动态规划生成一个最坏情况的数组
 */

it('2.1.3', () => {
  function gen(len: number): number[] {
    return Array(len)
      .fill(0)
      .map((_, i) => len - i - 1)
  }

  function sortOfSelection<T>(
    arr: T[],
  ): [res: T[], locus: [i: number, min: number, arr: T[]][]] {
    const locus: [i: number, min: number, arr: T[]][] = []

    for (let i = 0; i < arr.length - 1; i++) {
      let min = i
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[j] < arr[min]) {
          min = j
          locus.push([i, min, [...arr]])
        }
      }
      ;[arr[i], arr[min]] = [arr[min], arr[i]]
    }
    return [arr, locus]
  }

  const arr = gen(12)
  const [, locus] = sortOfSelection(arr)
  //恰好是比较次数的一半
  expect(Math.pow(arr.length, 2) / 2 / 2).toBe(locus.length)
})

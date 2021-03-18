/*
1.4.19　矩阵的局部最小元素。给定一个含有 N^2 个不同整数的 N\times N 数组 a[]。设计一个运行时间和 N 成正比的算法来找出一个局部最小元素：满足 a[i][j]<a[i+1][j]、a[i][j]<a[i][j+1]、a[i][j]<a[i-1][j] 以及 a[i][j]<a[i][j-1] 的索引 i 和 j。程序的运行时间在最坏情况下应该和 N 成正比。
TODO 暂时想不到
 */
describe('1.4.19', () => {
  it('基本实现', () => {
    function f(a: number[][]): [number, number] | null {
      for (let i = 1; i < a.length - 1; i++) {
        for (let j = 1; j < a.length - 1; j++) {
          const v = a[i][j]
          if (
            v < a[i + 1][j] &&
            v < a[i][j + 1] &&
            v < a[i - 1][j] &&
            v < a[i][j - 1]
          ) {
            return [i, j]
          }
        }
      }
      return null
    }

    expect(f([])).toBeNull()
    expect(
      f([
        [1, 3, 3],
        [2, 1, 5],
        [1, 7, 3],
      ]),
    ).toEqual([1, 1])
  })
})

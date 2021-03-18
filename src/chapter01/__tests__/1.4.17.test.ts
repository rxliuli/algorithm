/*
1.4.17　最遥远的一对（一维）。编写一个程序，给定一个含有 N 个 double 值的数组 a[]，在其中找到一对最遥远的值：两者之差（绝对值）最大的两个数。程序在最坏情况下所需的运行时间应该是线性级别的。
 */

describe('1.4.17', () => {
  function testF(f: (arr: number[]) => [number, number]) {
    expect(f([2, 1, 3, 5, 3])).toEqual([1, 5])
    expect(() => f([])).toThrowError()
  }

  it('双重循环', () => {
    function f(arr: number[]): [number, number] {
      if (arr.length < 2) {
        throw new Error('数组至少需要两个元素')
      }
      let diff: number | null = null
      const res: [number, number] = Array(2) as any
      for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
          const num = Math.abs(arr[i] - arr[j])
          if (diff === null || num > diff) {
            diff = num
            res[0] = arr[i]
            res[1] = arr[j]
          }
        }
      }
      return res
    }

    testF(f)
  })
  it('使用一次循环', () => {
    function f(arr: number[]): [number, number] {
      if (arr.length < 2) {
        throw new Error('数组至少需要两个元素')
      }

      let [min, max] = arr
      for (let i = 0; i < arr.length; i++) {
        const v = arr[i]
        if (v < min) {
          min = v
        } else if (v > max) {
          max = v
        }
      }
      return [min, max]
    }

    testF(f)
  })
  it('要求两个数的顺序', () => {
    // TODO 股票什么时候买入、卖出是最赚钱的
  })
})

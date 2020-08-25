/*
1.1.15 编写一个静态方法 histogram()，接受一个整型数组 a[] 和一个整数 M 为参数并返回一个大小
为M的数组，其中第i个元素的值为整数i在参数数组中出现的次数。如果a[]中的值均在0到M-1
之间，返回数组中所有元素之和应该和 a.length 相等。
 */

/*
答案：
基本思路是初始化一个值全部为 0 的新数组，然后遍历原数组，为新数组的每个下标插入合适的值，本质上应该是分组操作。
 */

describe('1.1.15', () => {
  it('', () => {
    function histogram(arr: number[], m: number): number[] {
      const res = Array(m).fill(0)
      for (let n of arr) {
        if (n <= res.length - 1) {
          res[n]++
        }
      }
      return res
    }
    expect(histogram([1, 2, 3], 3)).toEqual([0, 1, 1])
    expect(histogram([1, 1, 1], 3)).toEqual([0, 3, 0])
  })
})

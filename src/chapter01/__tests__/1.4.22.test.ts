/*
1.4.22　仅用加减实现的二分查找（Mihai Patrascu）。编写一个程序，给定一个含有 N 个不同 int 值的按照升序排列的数组，判断它是否含有给定的整数。只能使用加法和减法以及常数的额外内存空间。程序的运行时间在最坏情况下应该和 \log N 成正比。

　　　答：用斐波纳契数代替 2 的幂（二分法）进行查找。用两个变量保存F_k 和 F_{k-1} 并在 [i,i+F_k] 之间查找。在每一步中，使用减法计算 F_{k-2}，检查 i+F_{k-2} 处的元素，并根据结果将搜索范围变为 [i,i+F_{k-2}] 或是 [i+F_{k-2},i+F_{k-2}+F_{k-1}]。

TODO 待定
 */

describe('1.4.22', () => {
  it('官方解法', () => {
    function f(i: number): number {
      if (i === 0) {
        return 0
      }
      if (i === 1) {
        return 1
      }
      return f(i - 1) + f(i - 2)
    }

    /**
     * 基本思路
     *
     * 使用 k 保存当前斐波那契数的值
     * 使用 l,r 表示搜索范围
     * 对比 l 与 v
     * 如果 l === v，则返回 l
     * 如果 l < v，将搜索范围变为 [r, r+f(k-1)]
     * 如果 l > v，将搜索范围变为 [l-f(k-2), l]
     * 同时重新设置 k
     * @param arr
     * @param v
     */
    function searchByFib(arr: number[], v: number): number {
      let k = 1

      function inner(l: number, r: number): number {
        if (l === r) {
          return -1
        }
        if (arr[l] === v) {
          return l
        } else if (arr[l] < v) {
          return inner(r, r + f(--k))
        } else {
          return inner(l - f((k -= 2)), l)
        }
      }

      return inner(f(0), f(k))
    }

    const arr1 = [1, 2, 3, 4]
    console.log(searchByFib(arr1, 2))
    // arr1.forEach((v, i) => expect(f(arr1, v)).toBe(i))
    // console.log(f(arr1, 5))

    // const arr2 = sortBy(uniqueBy(RandomUtil.array(10)))
    // sortBy(arr2).forEach((v, i) => {
    //   const res = f(arr2, v)
    //   if (res !== i) {
    //     console.log(res, i, v)
    //   }
    //   return expect(res).toBe(i)
    // })
  })
})

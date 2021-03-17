/*
1.4.10　修改二分查找算法，使之总是返回和被查找的键匹配的索引最小的元素（且仍然能够保证对数级别的运行时间）。
答案：
基本思路
在原本二分搜索的基础上，如果找到了值，确定当前搜索区域左侧 [l, i) 是否还有值，如果没有则返回当前值 i，否则继续搜索左侧区域 [l, i] 直到左侧区域没有值为止，即 l=i
 */

it('1.4.10', () => {
  function f(arr: number[], v: number): number {
    function f(l: number, r: number): number {
      if (l > r) {
        return -1
      }
      const i = Math.floor((l + r) / 2)
      if (arr[i] === v) {
        if (l === i) {
          return i
        }
        return f(l, i)
      } else if (arr[i] > v) {
        return f(l, i - 1)
      } else {
        return f(i + 1, r)
      }
    }

    return f(0, arr.length - 1)
  }

  expect(f(Array(1).fill(0), 0)).toBe(0)
  expect(f(Array(2).fill(0), 0)).toBe(0)
  expect(f(Array(3).fill(0), 0)).toBe(0)
  expect(f(Array(4).fill(0), 0)).toBe(0)
  expect(f(Array(5).fill(0), 0)).toBe(0)
  expect(f([1, 2, 3, 4], 0)).toBe(-1)
})

/*
1.4.24　扔鸡蛋。假设你面前有一栋 N 层的大楼和许多鸡蛋，假设将鸡蛋从 F 层或者更高的地方扔下鸡蛋才会摔碎，否则则不会。首先，设计一种策略来确定 F 的值，其中扔 lgN 次鸡蛋后摔碎的鸡蛋数量为 lgN，然后想办法将成本降低到 2lgF。
 */

describe('1.4.24', () => {
  it('二分搜索', () => {
    /**
     * 基本思路
     * 边界条件：当前的值不大于，但 +1 的值大于
     * 迭代条件：没有满足条件的话继续在指定范围中查找
     * @param n
     * @param isGreater
     */
    function f(n: number, isGreater: (i: number) => boolean): number {
      function inner(l: number, r: number): number {
        if (l > r) {
          return -1
        }
        const i = Math.floor((l + r) / 2)
        if (!isGreater(i)) {
          if (isGreater(i + 1)) {
            return i
          }
          return inner(i + 1, r)
        }
        return inner(l, i - 1)
      }

      return inner(1, n)
    }

    expect(f(100, (i) => i > 23)).toBe(23)
    expect(f(100, (i) => i > 1)).toBe(1)
  })
  it('将摔碎的鸡蛋数量降至 2lgF', () => {
    // TODO 吾辈猜应该是要用动态规划，但确实没怎么看懂 xd
  })
})

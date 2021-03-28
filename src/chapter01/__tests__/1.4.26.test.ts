/*
1.4.26　三点共线。假设有一个算法，接受平面上的 N 个点并能够返回在同一条直线上的三个点的组数。证明你能够用这个算法解决 3-sum 问题。强烈提示：使用代数证明当且仅当 a+b+c=0 时 ({\rm a},{\rm a}^3)、({\rm b},{\rm b}^3) 和 ({\rm c},{\rm c}^3) 在同一条直线上。
TODO 待定
 */

type Pos = { x: number; y: number }

describe('1.4.26', () => {
  function isEqual(p1: Pos, p2: Pos): boolean {
    return p1.x === p2.x && p1.y === p2.y
  }

  function isLine(args: [Pos, Pos, Pos]) {
    const [p1, p2, p3] = args
    if (isEqual(p1, p2) || isEqual(p1, p3) || isEqual(p2, p3)) {
      return true
    }
    if (p1.y === p2.y && p2.y === p3.y) {
      return true
    }
    const v1 = Math.abs((p1.x - p2.x) / (p1.y - p2.y))
    const v2 = Math.abs((p1.x - p3.x) / (p1.y - p3.y))
    const v3 = Math.abs((p2.x - p3.x) / (p2.y - p3.y))
    return v1 === v2 && v2 === v3
  }

  function expectThreeSum(arr: Pos[]): [Pos, Pos, Pos][] {
    const res: [Pos, Pos, Pos][] = []
    for (let i = 0; i < arr.length; i++) {
      for (let j = i + 1; j < arr.length; j++) {
        for (let k = j + 1; k < arr.length; k++) {
          const args = [arr[i], arr[j], arr[k]] as [Pos, Pos, Pos]
          if (isLine(args)) {
            res.push(args)
          }
        }
      }
    }
    return res
  }

  describe('暴力解法', () => {
    it('测试 isLine', () => {
      expect(
        isLine([
          { x: -1, y: -1 },
          { x: 0, y: 0 },
          { x: 1, y: 1 },
        ]),
      ).toBeTruthy()
      expect(
        isLine([
          { x: -1, y: -1 },
          { x: 0, y: 0 },
          { x: 1, y: 2 },
        ]),
      ).toBeFalsy()
      expect(
        isLine([
          { x: 0, y: 0 },
          { x: 0, y: 0 },
          { x: 1, y: 1 },
        ]),
      ).toBeTruthy()
      expect(
        isLine([
          { x: -1, y: 0 },
          { x: 0, y: 0 },
          { x: 1, y: 0 },
        ]),
      ).toBeTruthy()
    })
    it('测试 expectThreeSum', () => {
      const arr = [
        { x: -1, y: -1 },
        { x: 0, y: 0 },
        { x: 1, y: 1 },
        { x: -2, y: -3 },
        { x: 1, y: 3 },
      ]
      expect(expectThreeSum(arr)).toEqual([
        [arr[0], arr[1], arr[2]],
        [arr[0], arr[3], arr[4]],
      ])
    })
  })
})

/*
1.5.15　二项树。请证明，对于加权 quick-union 算法，在最坏情况下树中每一层的节点数均为二项式系数。在这种情况下，计算含有 N=2^n 个节点的树中节点的平均深度。

加权 quick-union 算法的特点是在最坏情况下可以保持节点数量比与树的高度是 log2，在 1.5.14 进行了测试

参考推导图: https://photos.google.com/photo/AF1QipNN971kuYaNWHOQCUg_fB3ekDLX73akWyaWiX5I
按照数学推导来说：假设节点数量为 n，树的高度为 h，那么平均深度是 n/h，替换掉 n/log2(n)+1
按照编程的方式来实现便是暴力计算的事情了，可以用来验证推导的结论
 */

import { RandomUtil } from '../RandomUtil'
import { groupBy, segmentation } from '@liuli-util/array'
import { UFWithWeightedQuickUnion } from '../UF'
import { UFUtil } from '../UFUtil'
import { treeToList } from '@liuli-util/tree'
import { Node } from './1.5.9.test'

describe('1.5.15', () => {
  /**
   * 生成一个最坏情况下 quick-union 每层的节点数量列表
   * height| count array
   * 1 | 1
   * 2 | 1,1
   * 3 | 1,2,1
   * 4 | 1,3,4,3,1
   * @param height
   */
  function genNodeCountList(height: number): number[] {
    /**
     * 计算下一层的数组
     * @param arr
     */
    function f(arr: number[]): number[] {
      const res: number[] = [arr[0]]
      for (let i = 1; i < arr.length; i++) {
        res[i] = arr[i - 1] + arr[i]
      }
      res.push(arr[arr.length - 1])
      return res
    }

    let res = [1]
    for (let i = 0; i < height - 1; i++) {
      res = f(res)
    }
    return res
  }

  it('测试计算每层的节点数量', () => {
    const height = RandomUtil.integer(100)
    expect(genNodeCountList(height).reduce((a, b) => a + b) / height).toBe(
      Math.pow(2, height - 1) / height,
    )
  })
  describe('生成一颗最坏情况的树', () => {
    /**
     * 生成操作列表
     */
    function genOpList(count: number) {
      let temp = Array(count)
        .fill(0)
        .map((_, i) => [i * 2, i * 2 + 1] as [number, number])
      const res = [...temp]
      while (temp.length > 1) {
        temp = segmentation(temp, 2).map(([[, a], [, b]]) => {
          return [a, b]
        })
        res.push(...temp)
      }
      return res
    }

    function genTree(height: number) {
      const n = Math.pow(2, height - 1)
      const uf = new UFWithWeightedQuickUnion(n)
      const opList = genOpList(n)
      opList.forEach(([p, q]) => uf.union(p, q))
      return UFUtil.convertTree(uf.idList)
    }

    function computeNodeCountList(tree: Node[]): number[] {
      const list = treeToList(tree, {
        id: 'id',
        children: 'children',
        path: 'path' as const,
      })
      const map = groupBy(list, (item) => item.path.length)
      return [...map].map(([, v]) => v.length)
    }

    it('对比 genNodeCountList 与 computeNodeCountList', () => {
      const height = RandomUtil.integer(1, 10)
      const tree = genTree(height)
      expect(computeNodeCountList(tree)).toEqual(genNodeCountList(height))
    })
    it('测试 genOpList 出现的堆栈溢出错误', () => {
      //genOpList 不支持比 2^16 更大的数
      expect(() => genOpList(Math.pow(2, 18))).toThrowError()
    })
    it('使用递归的 genOpList', () => {
      /**
       * 虽然使用了递归，但由于是二分分割不断缩小，所以实际上栈的层级并不会很大
       * @param num
       */
      function genOpList(num: number) {
        const res: [number, number][] = []

        function f(arr: number[]) {
          if (arr.length <= 2) {
            res.push(arr as [number, number])
            return
          }

          const temp: number[] = []
          for (let i = 0; i < arr.length; i += 2) {
            const v = arr[i]
            temp.push(v)
            const next = arr[i + 1]
            if (next) {
              res.push([v, next])
            }
          }

          f(temp)
        }

        f(
          Array(num)
            .fill(0)
            .map((_, i) => i),
        )

        return res
      }

      console.log(genOpList(7))
      const height = RandomUtil.integer(1, 10)
      const tree = genTree(height)
      expect(computeNodeCountList(tree)).toEqual(genNodeCountList(height))
    })
    /**
     * 这种数字的有趣之处在于可以让树生成的略微扭曲，最后一个节点会直接挂到根上
     */
    it('找到一个满足每次除都除不尽，直到除到 2 为止的数字', () => {
      /**
       * 检查一个数字是否满足每次除都除不尽，直到除到 2 为止
       * @param n
       */
      function check(n: number): boolean {
        function isOdd(n: number): boolean {
          return n % 2 === 1
        }

        function f(n: number): boolean {
          if (n === 2) {
            return true
          }
          if (!isOdd(n)) {
            return false
          }
          return f(Math.ceil(n / 2))
        }

        if (n <= 2) {
          return false
        }
        return f(n)
      }

      console.log(check(5))
      const arr = RandomUtil.array(100, (i) => i + 1).filter(check)
      console.log(arr.slice(0, 10))

      /**
       * 生成一个上面的函数需要的数字
       * @param n
       */
      function gen(n: number): number {
        function f(n: number): number {
          if (n === 2) {
            return n
          }
          return f(n - 1) * 2 - 1
        }

        if (n < 0) {
          throw new Error()
        }
        return f(n + 3)
      }

      /**
       * 通过数学推导的方式得到了下面的实现，一个是递归 - 1，一个是计算幂值 + 1，但结果相等，挺神奇的
       * @link https://photos.google.com/photo/AF1QipOSaFYy7eJRmjV1YXMOCsN4g9BRJozogc5_b0md
       * @param n
       */
      function gen2(n: number): number {
        return Math.pow(2, n + 1) + 1
      }

      console.log(gen(0))
      console.log(gen2(0))
      arr.forEach((v, i) => {
        expect(gen(i)).toBe(v)
        expect(gen2(i)).toBe(v)
      })
    })
  })
})

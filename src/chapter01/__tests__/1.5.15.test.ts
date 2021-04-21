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
      const height = RandomUtil.integer(10)
      const tree = genTree(height)
      expect(computeNodeCountList(tree)).toEqual(genNodeCountList(height))
    })
    it('测试 genOpList 出现的堆栈溢出错误', () => {
      //genOpList 不支持比 2^16 更大的数
      console.log(Math.pow(2, 10))
    })
  })
})

/*
2.1.37　部分有序。编写一个测试用例，生成部分有序的数组，包括：

95% 有序，其余部分为随机值；
所有的元素和它们的正确位置的距离都不超过 10；
5% 的元素随机分布在整个数组中，剩下的数据都是有序的。
　　　评估并验证这些输入数据对本节讨论的算法的性能的影响。

答：
第一个和第三个有什么区别么？
TODO 验证待定
*/

import { RandomUtil } from '../../chapter01/RandomUtil'
import { segmentation, sortBy } from '@liuli-util/array'
import { SortUtil } from '../SortUtil'

describe('2.1.37', () => {
  it('95% 有序，其余部分为随机值', () => {
    /**
     * 排序时随机让某些元素返回随机的主键
     * @param len
     * @param sort
     */
    function gen(len: number, sort: typeof sortBy) {
      const builder = RandomUtil.builder([
        [95, (i: number) => i],
        [5, () => RandomUtil.integer(len)],
      ])
      return sort(RandomUtil.array(len), builder)
    }

    /**
     * 获取顺序错误的元素数量
     * @param arr
     */
    function getDescCount(arr: number[]) {
      let res = 0
      for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] > arr[i + 1]) {
          res++
        }
      }
      return res
    }

    const len = 1000
    //TODO 实际结果基本上都是超过了 5%，大概在 15%~50% 之间
    console.log(getDescCount(gen(len, sortBy)))
    console.log(getDescCount(gen(len, SortUtil.sortOfBinary)))
    console.log(getDescCount(gen(len, SortUtil.sortOfInsert)))
    console.log(getDescCount(gen(len, SortUtil.sortOfSelection)))
    console.log(getDescCount(gen(len, SortUtil.sortOfShell)))
  })
  it('所有的元素和它们的正确位置的距离都不超过 10', () => {
    /**
     * 先排序然后 10 个一组乱序最后拼接
     * TODO 这个还真没想到更随机的方法
     * @param len
     */
    function gen(len: number) {
      return segmentation(sortBy(RandomUtil.array(len)), 10)
        .map((arr) => sortBy(arr, () => Math.random()))
        .flat()
    }

    console.log(gen(10))
  })
  it('5% 的元素随机分布在整个数组中，剩下的数据都是有序的', () => {})
})

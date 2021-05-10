/*
1.5.24　适用于 Erdös-Renyi 模型的快速算法。在练习 1.5.23 的测试中增加加权 quick-union 算法和使用路径压缩的加权 quick-union 算法。你能分辨出这两种算法的区别吗？

TODO 大致上运行时间比约等于 1，路径加权算法要快一点，但微不足道
 */

import { RandomUtil } from '../RandomUtil'
import { countTime } from '@liuli-util/test'
import { erdosRenyi } from './1.5.17.test'
import {
  UFWithWeightedQuickUnion,
  UFWithWeightedQuickUnionPathCompression,
} from '../UF'
import { markdownTable } from '@liuli-util/markdown-table'

it('1.5.24', () => {
  const res = RandomUtil.array(1000, (i) => i + 1 + 2).map((len) => {
    const quickFindTime = countTime(
      () => erdosRenyi(len, UFWithWeightedQuickUnion).length,
    )
    const quickUnionTime = countTime(
      () => erdosRenyi(len, UFWithWeightedQuickUnionPathCompression).length,
    )
    return [len, quickUnionTime === 0 ? 1 : quickFindTime / quickUnionTime] as [
      number,
      number,
    ]
  })

  console.log('平均值: ', res.reduce((res, v) => res + v[1], 0) / res.length)
  console.log(markdownTable([['len', 'scale'], ...res]))
})

/*
1.5.21　Erdös-Renyi 模型。使用练习 1.5.17 的用例验证这个猜想：得到单个连通分量所需生成的整数对数量为 ~1/2NlnN。

TODO 看起来实际数据与猜想的比例为 ~1.1
 */

import { RandomUtil } from '../RandomUtil'
import { erdosRenyi } from './1.5.17.test'
import { markdownTable } from 'markdown-table'

describe('1.5.21', () => {
  it('测试 erdosRenyi', () => {
    const res = RandomUtil.array(10, (i) => (i + 1) * 10).map((len) => {
      return [len, erdosRenyi(len).length] as [number, number]
    })
    console.log(markdownTable([['i', 'count'], ...res]))
  })
  it('测试公式', () => {
    const res = RandomUtil.array(10, (i) => (i + 1) * 10).map((len) => {
      const res = (1 / 2) * len * Math.floor(Math.log(len))
      return [len, res] as const
    })
    console.log(res)
  })
  it('测试公式的命中率', () => {
    const res = RandomUtil.array(1000, (i) => i + 2).map((len) => {
      const real = erdosRenyi(len).length
      const compute = Math.floor((1 / 2) * len * Math.log(len))
      return [len, real, compute, compute === 0 ? 1 : real / compute] as const
    })
    const sum = res.reduce((res, v) => res + v[3], 0)
    console.log(sum / res.length)
  })
})

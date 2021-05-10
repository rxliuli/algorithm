/*
1.5.22　Erdös-Renyi 模型的倍率实验。开发一个性能测试用例，从命令行接受一个int 值 T 并进行 T 次以下实验：使用练习 1.5.17 的用例生成随机连接，和我们的开发用例一样使用 UnionFind 来检查触点的连通性，不断循环直到所有触点均相互连通。对于每个 N，打印出 N 值和平均所需的连接数以及前后两次运行时间的比值。使用你的程序验证正文中的猜想：quick-find 算法和 quick-union 算法的运行时间是平方级别的，加权 quick-union 算法则接近线性级别。

TODO 实际测试时运行时间并没有到平方级别，可能还和其他因素有关
 */

import { erdosRenyi } from './1.5.17.test'
import {
  UFWithQuickFind,
  UFWithQuickUnion,
  UFWithWeightedQuickUnion,
} from '../UF'
import { RandomUtil } from '../RandomUtil'
import { markdownTable } from '@liuli-util/markdown-table'

describe('1.5.22', () => {
  it('测试 quick find', () => {
    const res = RandomUtil.array(10, (i) => (i + 1) * 50).map((len) => {
      return [
        len,
        erdosRenyi(len, UFWithQuickFind).length,
        erdosRenyi(len, UFWithQuickUnion).length,
        erdosRenyi(len, UFWithWeightedQuickUnion).length,
      ] as [number, number, number, number]
    })

    console.log(
      markdownTable([
        [
          'len',
          'UFWithQuickFind',
          'UFWithQuickUnion',
          'UFWithWeightedQuickUnion',
        ],
        ...res,
      ]),
    )
  })
})

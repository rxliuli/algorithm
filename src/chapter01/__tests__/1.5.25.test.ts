/*
1.5.25　随机网格的倍率测试。开发一个性能测试用例，从命令行接受一个 int 值T 并进行T 次以下实验：使用练习 1.5.18 的用例生成一个 N×N 的随机网格，所有连接的方向随机且排列随机。和我们的开发用例一样使用 UnionFind 来检查触点的连通性，不断循环直到所有触点均相互连通。对于每个N，打印出 N 值和平均所需的连接数以及前后两次运行时间的比值。使用你的程序验证正文中的猜想：quick-find 算法和 quick-union 算法的运行时间是平方级别的，加权 quick-union 算法则接近线性级别。注意：随着N 值加倍，网格中触点的数量会乘 4，因此平方级别的算法的运行时间会变为原来的 16 倍，线性级别的算法的运行时间则变为原来的 4 倍。

TODO 实际测试中并没有 16 倍。。。
 */

import {
  IUF,
  UFWithQuickFind,
  UFWithQuickUnion,
  UFWithWeightedQuickUnion,
  UFWithWeightedQuickUnionPathCompression,
} from '../UF'
import { RandomGrid } from './1.5.18.test'
import { RandomUtil } from '../RandomUtil'
import { countTime } from '@liuli-util/test'
import { markdownTable } from '@liuli-util/markdown-table'
import { Class } from 'type-fest'

it('1.5.25', () => {
  const res = RandomUtil.array(10, (i) => (i + 1) * 10).map((len) => {
    const f = (UF: Class<IUF>) => countTime(() => new RandomGrid(UF).main(len))
    const timeOfUFWithQuickFind = f(UFWithQuickFind)
    const timeOfUFWithQuickUnion = f(UFWithQuickUnion)
    const timeOfUFWithWeightedQuickUnion = f(UFWithWeightedQuickUnion)
    const timeOfUFWithWeightedQuickUnionPathCompression = f(
      UFWithWeightedQuickUnionPathCompression,
    )

    return [
      len,
      timeOfUFWithQuickFind,
      timeOfUFWithQuickUnion,
      timeOfUFWithWeightedQuickUnion,
      timeOfUFWithWeightedQuickUnionPathCompression,
    ] as [number, number, number, number, number]
  })
  console.log(
    markdownTable([
      [
        'len',
        'UFWithQuickFind',
        'UFWithQuickUnion',
        'UFWithWeightedQuickUnion',
        'UFWithWeightedQuickUnionPathCompression',
      ],
      ...res,
    ]),
  )
})

import {
  IUF,
  UFWithQuickFind,
  UFWithQuickUnion,
  UFWithWeightedQuickUnion,
  UFWithWeightedQuickUnionPathCompression,
} from '../UF'
import { readFile } from 'fs-extra'
import path from 'path'
import { Class } from 'type-fest'
import { segmentation } from '@liuli-util/array'

describe('测试 UF', () => {
  function testF(clazz: Class<IUF>) {
    const uf = new clazz(10)
    expect(uf.count()).toBe(10)
    expect(uf.connected(1, 2)).toBeFalsy()
    uf.union(1, 2)
    expect(uf.connected(1, 2)).toBeTruthy()
    expect(uf.find(1)).toBe(2)
    expect(uf.count()).toBe(9)

    //测试同一个数字
    expect(uf.connected(3, 3)).toBeTruthy()
  }

  it('测试 UFWithQuickFind', () => {
    testF(UFWithQuickFind)
  })
  it('测试 UFWithQuickUnion', () => {
    testF(UFWithQuickUnion)
  })
  it('测试 UFWithWeightedQuickUnion', () => {
    testF(UFWithWeightedQuickUnion)
  })
  it.skip('测试 UFWithWeightedQuickUnionPathCompression', () => {
    testF(UFWithWeightedQuickUnionPathCompression)
  })
})
describe('性能测试', () => {
  async function testF(
    clazz: Class<IUF>,
    count: number,
    testArr: [number, number][],
  ) {
    await new Promise<void>((resolve, reject) => {
      setTimeout(reject, 10_000)

      const uf = new clazz(count)
      testArr.forEach(([p, q]) => {
        if (uf.connected(p, q)) {
          return
        }
        uf.union(p, q)
        //打印对性能影响较大
        // console.log('p-q: ', p, q)
      })
      resolve()
    })
  }

  /**
   * 有意思的是在一般情况 UFWithQuickUnion 比 UFWithWeightedQuickUnion 更快，但在一些特殊情况时，UFWithWeightedQuickUnion 能保证性能（倒不如说反而更快）
   * 另外理论上应该更快的 UFWithWeightedQuickUnionPathCompression 其实更慢了，在几种情况下都是
   */
  describe('一般情况', () => {
    let testArr: [number, number][], count: number
    beforeAll(async () => {
      const text = await readFile(
        path.resolve('C:\\Users\\rxliuli\\Downloads\\largeUF.txt'),
        { encoding: 'utf-8' },
      )
      const [_count, ...arr] = text.split('\n')
      testArr = arr
        .map(
          (s) =>
            s.split(' ').map((s) => Number.parseInt(s)) as [number, number],
        )
        .slice(0, 200_000)
      count = Number.parseInt(_count)
    })
    it.skip('测试 UFWithQuickFind', async () => {
      await testF(UFWithQuickFind, count, testArr)
    })
    it('测试 UFWithQuickUnion', async () => {
      await testF(UFWithQuickUnion, count, testArr)
    })
    it('测试 UFWithWeightedQuickUnion', async () => {
      await testF(UFWithWeightedQuickUnion, count, testArr)
    })
    it('测试 UFWithWeightedQuickUnionPathCompression', async () => {
      await testF(UFWithWeightedQuickUnionPathCompression, count, testArr)
    })
  })
  describe('UFWithQuickUnion 最坏情况', () => {
    //UFWithQuickUnion 的最坏情况
    const count = 200_000
    const testArr = Array(count)
      .fill(0)
      .map((_, i) => [0, i] as [number, number])
    it.skip('测试 UFWithQuickUnion', async () => {
      await testF(UFWithQuickUnion, count, testArr)
    })
    it('测试 UFWithWeightedQuickUnion', async () => {
      await testF(UFWithWeightedQuickUnion, count, testArr)
    })
    it('测试 UFWithWeightedQuickUnionPathCompression', async () => {
      await testF(UFWithWeightedQuickUnionPathCompression, count, testArr)
    })
  })
  describe('UFWithWeightedQuickUnion 的最坏情况', () => {
    const c = Math.pow(2, 16)
    let count = c * 2
    let testArr: [number, number][]
    beforeAll(() => {
      let temp = Array(count)
        .fill(0)
        .map((_, i) => [i * 2, i * 2 + 1] as [number, number])
      testArr = temp
      while (temp.length > 1) {
        temp = segmentation(temp, 2).map(([[, a], [, b]]) => {
          return [a, b]
        })
        testArr.push(...temp)
      }
      console.log('testArr.length: ', testArr.length)
    })
    it('测试 UFWithQuickUnion', async () => {
      await testF(UFWithQuickUnion, count, testArr)
    })
    it('测试 UFWithWeightedQuickUnion', async () => {
      await testF(UFWithWeightedQuickUnion, count, testArr)
    })
    it('测试 UFWithWeightedQuickUnionPathCompression', async () => {
      await testF(UFWithWeightedQuickUnionPathCompression, count, testArr)
    })
  })
})

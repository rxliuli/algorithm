import sparkly from 'sparkly'
import { AsyncArray, wait } from '@liuli-util/async'
import { RandomUtil } from '../chapter01/RandomUtil'

export async function showSparkly(data: number[][]) {
  await AsyncArray.forEach(data, async (row) => {
    console.clear()
    console.log(sparkly(row))
    await wait(500)
  })
}

describe('测试 sparkly', () => {
  it.skip('生成一个基本柱状图表', () => {
    const array = RandomUtil.array(10, () => RandomUtil.array(10))
    showSparkly(array)
    console.log(sparkly([0, 3, 5, 8, 4, 3, 4, 10]))
  })
})

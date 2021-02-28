/*
1.3.2　给定以下输入，java Stack 的输出是什么？

it was - the best - of times - - - it was - the - -

注: 单词代表 push, - 代表 pop

答案：应该是
 */

import { Stack } from '../Stack'
import { groupBy } from '@liuli-util/array'

describe('1.3.2', () => {
  const arr = 'it was - the best - of times - - - it was - the - -'.split(' ')
  it('使用 Stack 解决', () => {
    const stack = new Stack()
    arr.forEach((s) => {
      if (s === '-') stack.pop()
      else stack.push(s)
    })
    expect(stack.size).toBe(1)
  })
  it('用分组解决', () => {
    const map = groupBy(arr, (s) => s === '-')
    const dictList = map.get(false)!
    const lessList = map.get(true)!
    const res = dictList.slice(0, dictList.length - lessList.length)
    expect(res.length).toBe(1)
  })
})

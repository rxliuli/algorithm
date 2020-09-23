import { ArrayList } from '../util/ArrayList'

describe('测试 ArrayList', () => {
  it('基本示例', () => {
    const list = new ArrayList<number>()
    list.add(1)
    list.add(2)
    list.add(3)
    console.log(list[0])
    expect(Array.from(list)).toEqual([1, 2, 3])
    list.insert(1, 4)
    expect(Array.from(list)).toEqual([1, 4, 2, 3])
    list.set(1, 5)
    expect(list.get(1)).toBe(5)
    list.remove(2)
    list.remove(1)
    list.remove(0)
    list.remove(0)
    expect(list.length).toBe(0)
  })
})

import { Bag, IBag, LinkedBag } from '../Bag'
import { Class } from 'type-fest'

describe('测试 Bag', () => {
  function testBag(Bag: Class<IBag<number>>) {
    const bag = new Bag()
    expect(bag.isEmpty).toBeTruthy()
    bag.add(1)
    bag.add(2)
    bag.add(3)
    expect(bag.size).toBe(3)
    expect(bag.isEmpty).toBeFalsy()
    expect([...bag]).not.toContainEqual([1, 2, 3])
  }

  it('测试 Bag', () => {
    testBag(Bag)
  })
  it('测试 LinkedBag', () => {
    testBag(LinkedBag)
  })
})

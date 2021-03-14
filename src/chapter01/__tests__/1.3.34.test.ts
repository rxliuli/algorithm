/*
1.3.34　随机背包。随机背包能够存储一组元素并支持表 1.3.10 中的 API：

　　　表 1.3.10　泛型随机背包的 API

public class RandomBag<Item> implements Iterable<Item>
             RandomBag()	创建一个空随机背包
   boolean   isEmpty()	背包是否为空
       int   size()	背包中的元素数量
      void   add(Item item)	添加一个元素
　　　编写一个RandomBag 类来实现这份API。请注意，除了形容词随机之外，这份API 和 Bag 的API 是相同的，这意味着迭代应该随机访问背包中的所有元素（对于每次迭代，所有的 N! 种排列出现的可能性均相同）。提示：用数组保存所有元素并在迭代器的构造函数中随机打乱它们的顺序。

TODO 应该有某种更好的方式
 */

import { IBag } from '../Bag'
import { ArrayUtil } from '../ArrayUtil'

class RandomBag<T> implements IBag<T> {
  private arr: T[] = []
  private _size = 0

  get isEmpty(): boolean {
    return this.size === 0
  }

  get size(): number {
    return this._size
  }

  *[Symbol.iterator](): Iterator<T> {
    const iter = ArrayUtil.shuffle(this.arr)
    for (let item of iter) {
      yield item
    }
  }

  add(item: T): void {
    this.arr.push(item)
    this._size++
  }
}

it('1.3.34', () => {
  const bag = new RandomBag<number>()
  bag.add(0)
  bag.add(1)
  bag.add(2)
  console.log([...bag])
})

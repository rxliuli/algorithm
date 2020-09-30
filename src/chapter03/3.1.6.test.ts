/*
3.1.6　用输入中的单词总数 W 和不同单词总数 D 的函数给出 FrequencyCounter 调用的 put() 和 get() 方法的次数。
*/
/*
答案：基本思路是利用 Map 结构保存 string=>number，然后默认第一次初始化为 0，然后逐渐累加即可。
TODO 没太看懂两者之间有什么关联
大致上就是每次插入单词，然后计数而已
*/

import { OrderedSequentialSearchST } from '../util/OrderedSequentialSearchST'
import { start } from 'repl'

class FrequencyCounter<K> {
  private st = new OrderedSequentialSearchST<K, number>()
  add(k: K) {
    this.st.put(k, this.get(k) + 1)
  }
  get(k: K): number {
    return this.st.get(k) || 0
  }

  *[Symbol.iterator]() {
    for (let item of this.st) {
      yield item
    }
  }
}

it.skip('3.1.6', () => {
  const fc = new FrequencyCounter()
  fc.add('start')
  fc.add('start')
  fc.add('start')
  fc.add('stop')
  fc.add('stop')
  fc.add('stop')
  fc.add('stop')
  fc.add('stop')
  fc.add('stop')
  console.log(fc.get('stop'))
  console.log(Array.from(fc))
  console.log(Array.from(fc).reduce((res, [, v]) => Math.max(res, v), 0))
})

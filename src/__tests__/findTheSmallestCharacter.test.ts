import { groupBy, sortBy } from '@liuli-util/array'

describe('找最多出现最小的字符', () => {
  it('高阶函数', () => {
    function f(str: string): string {
      const arr = str.split('')
      return sortBy(
        [...groupBy(arr, (v) => v)],
        ([k, v]) => -(v.length * arr.length - k.charCodeAt(0)),
      )[0][0]
    }

    console.log(f('abcda'))
    console.log(f('babcda'))
  })
  it('优化到 O(n) 级别', () => {
    function f(str: string): string {
      const map = groupBy([...str], (s) => s)
      let res = { k: str[0], length: map.get(str[0])!.length }
      for (let [k, v] of map) {
        if (v.length > res.length || (v.length === v.length && k < res.k)) {
          res = { k, length: v.length }
        }
      }
      return res.k
    }

    console.log(f('abcda'))
    console.log(f('babcda'))
  })
  it('for', () => {
    function f(str: string): string {
      const sortStr = sortBy([...str]).join('')
      let res = sortStr[0]
      let temp = sortStr[0]
      let resC = 0
      let tempC = 0

      function setRes() {
        if (tempC > resC) {
          res = temp
          resC = tempC
        }
      }

      for (let s of sortStr) {
        if (s === temp) {
          tempC++
        } else {
          setRes()
          temp = s
          tempC = 1
        }
      }
      setRes()
      return res
    }

    console.log(f('abcda'))
    console.log(f('babcda'))
  })
})

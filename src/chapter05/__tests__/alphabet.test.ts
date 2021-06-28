describe('测试字母表', () => {
  /**
   * 根据 s 中的字符创建一张新的字母表
   */
  interface IAlphabet {
    /**
     * 获取字母表中索引位置的字符
     */
    toChar(index: number): string

    /**
     * 获取 c 的索引，在 0 到 ![R-1](http://private.codecogs.com/gif.latex?R-1) 之间
     * @param c
     */
    toIndex(c: string): number

    /**
     * c 在字母表之中吗
     * @param c
     */
    contains(c: string): boolean

    /**
     * 基数（字母表中的字符数量）
     */
    R(): number

    /**
     * 表示一个索引所需的比特数
     */
    lgR(): number

    /**
     * 将 s 转换为 ![R](http://private.codecogs.com/gif.latex?R) 进制的整数
     * @param s
     */
    toIndices(s: string): number[]

    /**
     * 将 ![R](http://private.codecogs.com/gif.latex?R) 进制的整数转换为基于该字母表的字符串
     * @param indices
     */
    toChars(indices: number[]): string
  }

  class Alphabet implements IAlphabet {
    private readonly cs: string[]
    constructor(s: string) {
      this.cs = s.split('')
    }

    R(): number {
      return this.cs.length
    }

    contains(c: string): boolean {
      return this.toIndex(c) !== -1
    }

    lgR(): number {
      throw new Error('no impl')
    }

    toChar(index: number): string {
      return this.cs[index]
    }

    toChars(indices: number[]): string {
      let res = ''
      for (let index of indices) {
        res += this.toChar(index)
      }
      return res
    }

    toIndex(c: string): number {
      return this.cs.indexOf(c)
    }

    toIndices(s: string): number[] {
      const len = s.length
      const res = new Array(len)
      for (let i = 0; i < len; i++) {
        res[i] = this.toIndex(s[i])
      }
      return res
    }
  }

  it('基本示例', () => {
    const alphabet = new Alphabet('abcde')
    expect(alphabet.toIndex('a')).toBe(0)
    expect(alphabet.contains('f')).toBeFalsy()
    expect(alphabet.R()).toBe(5)
    expect(alphabet.toChar(alphabet.toIndex('a'))).toBe('a')
    expect(alphabet.toChar(alphabet.toIndex('a'))).toBe('a')
    const str = 'ccddd'
    expect(alphabet.toChars(alphabet.toIndices(str))).toBe(str)
  })

  it('测试 count 方法', () => {
    function count(str: string, alphabet: IAlphabet) {
      const count = Array(alphabet.R()).fill(0)
      for (let s of str) {
        if (alphabet.contains(s)) {
          count[alphabet.toIndex(s)]++
        }
      }
      return count
    }

    const alphabet = new Alphabet('abcde')
    const res = count('abeacadabea!', alphabet)
    res.forEach((v, i) => {
      console.log(alphabet.toChar(i), v)
    })
  })
})

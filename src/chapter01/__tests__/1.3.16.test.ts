/*
1.3.16　使用 1.3.1.5 节中的 readInts() 作为模板为 Date 编写一个静态方法 readDates()，从标准输入中读取由练习 1.2.19 的表格所指定的格式的多个日期并返回一个它们的数组。
 */

interface BasicDate {
  year: number
  month: number
  day: number

  toString(): string
}

class SmallDate implements BasicDate {
  constructor(public year: number, public month: number, public day: number) {}

  toString(): string {
    return `${this.year}-${this.month}-${this.day}`
  }
}

class SmartDate implements BasicDate {
  constructor(public year: number, public month: number, public day: number) {
    SmartDate.validate(this)
  }

  toString(): string {
    return `${this.year}-${this.month}-${this.day}`
  }

  static validate(date: BasicDate) {
    const { year: y, month: m, day: d } = date
    if (m < 1 || m > 12) {
      throw new Error('月份不在 1 到 12 之间')
    }
    switch (m) {
      case 1:
      case 3:
      case 5:
      case 7:
      case 8:
      case 10:
      case 12:
        if (d < 0 || d > 31) {
          throw new Error('日期不在 1 到 31 之间')
        }
        break
      case 4:
      case 6:
      case 9:
      case 11:
        if (d < 0 || d > 30) {
          throw new Error('日期不在 1 到 30 之间')
        }
        break
      case 2:
        const n = y % 4 === 0 ? 1 : 0
        if (d < 0 || d > 28 + n) {
          throw new Error('日期不在 1 到 30 之间')
        }
        break
    }
  }

  private static parseDate(str: string): BasicDate {
    const [mStr, dStr, yStr] = str.split('/')
    if (mStr === undefined || dStr === undefined || yStr === undefined) {
      throw new Error('格式错误')
    }
    const m = Number.parseInt(mStr)
    const d = Number.parseInt(dStr)
    const y = Number.parseInt(yStr)
    if (!Number.isInteger(m) || !Number.isInteger(d) || !Number.isInteger(y)) {
      throw new Error('不是数字')
    }
    return new SmartDate(y, m, d)
  }

  static readDates(arr: string[]): BasicDate[] {
    return arr.map(SmartDate.parseDate)
  }
}

it('1.3.16', () => {
  const res = SmartDate.readDates(['5/22/2020', '2/28/2021'])
  expect(res.map((s) => s.toString())).toEqual(['2020-5-22', '2021-2-28'])

  expect(() => new SmartDate(2021, 2, 29)).toThrowError()
  expect(() => new SmartDate(2021, 13, 1)).toThrowError()
})

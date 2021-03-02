import { gcd } from './gcd'

interface IRational {
  /**
   * 该数与 b 之和
   */
  plus(b: IRational): IRational

  /**
   * 该数与 b 之差
   */
  minus(b: IRational): IRational

  /**
   * 该数与 b 之积
   */
  times(b: IRational): IRational

  /**
   * 该数与 b 之商
   */
  divides(b: IRational): IRational

  /**
   * 该数与 that 相等吗
   */
  equals(that: IRational): boolean

  /**
   * 对象的字符串表示
   */
  toString(): string
}

export class Rational implements IRational {
  public readonly numerator: number
  public readonly denominator: number

  constructor(numerator: number, denominator: number) {
    if (!Number.isInteger(numerator) || !Number.isInteger(denominator)) {
      throw new Error('分子与分母必须都是整数')
    }
    if (denominator === 0) {
      throw new Error('分母不能为 0')
    }
    const v = gcd(Math.abs(numerator), Math.abs(denominator))
    if (v > 1) {
      numerator /= v
      denominator /= v
    }
    this.numerator = numerator
    this.denominator = denominator
  }

  plus(b: Rational): Rational {
    return new Rational(
      this.numerator * b.denominator + this.denominator * b.numerator,
      this.denominator * b.denominator,
    )
  }

  minus(b: Rational): Rational {
    return new Rational(
      this.numerator * b.denominator - this.denominator * b.numerator,
      this.denominator * b.denominator,
    )
  }

  times(b: Rational): Rational {
    return new Rational(
      this.numerator * b.numerator,
      this.denominator * b.denominator,
    )
  }

  divides(b: Rational): Rational {
    return new Rational(
      this.numerator * b.denominator,
      this.denominator * b.numerator,
    )
  }

  equals(that: Rational): boolean {
    return (
      this.numerator === that.numerator && this.denominator === that.denominator
    )
  }

  toString(): string {
    return `${this.numerator}/${this.denominator}`
  }
}

export class NumberUtil {
  static fixed(i: number, fractionDigits: number) {
    return Number.parseFloat(i.toFixed(fractionDigits))
  }
}

export class ArrayList<T> implements List<T>, ArrayLike<T> {
  private arr: T[] = []
  private size = 0
  private checkIdx(idx: any) {
    if (typeof idx !== 'number') {
      throw new Error('不支持的非数字的索引')
    }
    if (idx < 0 || idx >= this.size) {
      throw new Error(`下标越界, idx: ${idx}, len: ${this.size}`)
    }
  }
  get(idx: number) {
    this.checkIdx(idx)
    return this.arr[idx]
  }
  set(idx: number, val: T) {
    this.checkIdx(idx)
    this.arr[idx] = val
  }
  insert(idx: number, val: T) {
    this.checkIdx(idx)
    this.arr = this.arr.slice(0, idx).concat([val]).concat(this.arr.slice(idx))
    this.size++
  }
  add(val: T) {
    this.arr[this.size] = val
    this.size++
  }
  remove(idx: number) {
    this.checkIdx(idx)
    if (this.size === 0) {
      return
    }
    this.arr = this.arr.slice(0, idx).concat(this.arr.slice(idx + 1))
    this.size--
  }
  get length() {
    return this.size
  }
  *[Symbol.iterator]() {
    for (let i = 0; i < this.size; i++) {
      yield this.arr[i]
    }
  }
}

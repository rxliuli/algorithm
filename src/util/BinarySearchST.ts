import { ST } from '../util/ST'

export class BinarySearchST<K, V> implements ST<K, V> {
  private kvList: [K, V][] = []
  put(key: K, val: V): void {
    const idx = this.rank(key)
    if (this.kvList[idx] && this.kvList[idx][0] === key) {
      this.kvList[idx][1] = val
      return
    }
    this.kvList = this.kvList
      .slice(0, idx)
      .concat([[key, val]])
      .concat(this.kvList.slice(idx))
  }
  get(key: K): V | null {
    const idx = this.rank(key)
    if (this.kvList[idx] && this.kvList[idx][0] === key) {
      return this.kvList[idx][1]
    }
    return null
  }
  delete(key: K): void {
    const idx = this.rank(key)
    if (idx === -1) {
      return
    }
    this.kvList = this.kvList.slice(0, idx).concat(this.kvList.slice(idx + 1))
  }
  contains(key: K): boolean {
    const idx = this.rank(key)
    return this.kvList[idx] && this.kvList[idx][0] === key
  }
  isEmpty(): boolean {
    return this.kvList.length === 0
  }
  private rank(key: K): number {
    const arr = this.kvList
    const kFn = (kv: [K, V]) => kv[0]
    function fi(min: number, max: number): number {
      if (min > max) return min
      const mid = Math.floor(min + (max - min) / 2)
      if (key < kFn(arr[mid])) return fi(min, mid - 1)
      else if (key > kFn(arr[mid])) return fi(mid + 1, max)
      else return mid
    }
    return fi(0, arr.length - 1)
  }
  get size() {
    return this.kvList.length
  }
  *[Symbol.iterator]() {
    for (let item of this.kvList) {
      yield item
    }
  }
  toJSON() {
    return this.kvList.reduce((res, [k, v]) => {
      res[k] = v
      return res
    }, {} as any)
  }
}

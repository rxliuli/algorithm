export interface IUF {
  /**
   * 在 p 和 q 之间添加一条连接
   */
  union(p: number, q: number): void

  /**
   * p（0 到 ）所在的分量的标识符
   */
  find(p: number): number

  /**
   * 如果 p 和 q 存在于同一个分量中则返回 true
   * @deprecated 应该使用 {@link find}
   */
  connected(p: number, q: number): boolean

  /**
   * 连通分量的数量
   */
  count(): number
}

abstract class BaseUF implements IUF {
  public readonly idList: number[]

  constructor(protected _count: number) {
    this.idList = Array(_count)
    for (let i = 0; i < _count; i++) {
      this.idList[i] = i
    }
  }

  connected(p: number, q: number): boolean {
    return this.find(p) === this.find(q)
  }

  count(): number {
    return this._count
  }

  abstract union(p: number, q: number): void

  abstract find(p: number): number
}

export class UFWithQuickFind extends BaseUF {
  find(p: number): number {
    return this.idList[p]
  }

  union(p: number, q: number): void {
    const pId = this.find(p)
    const qId = this.find(q)
    if (pId === qId) {
      return
    }
    for (let i = 0, len = this.idList.length; i < len; i++) {
      if (this.idList[i] === pId) {
        this.idList[i] = qId
      }
    }
    this._count--
  }
}

export class UFWithQuickUnion extends BaseUF {
  /**
   * 最好情况是 1，最坏情况是 N
   * @param p
   */
  find(p: number): number {
    while (p !== this.idList[p]) {
      p = this.idList[p]
    }

    return p
  }

  /**
   * 最好情况是 1，最坏情况是 2N
   * @param p
   * @param q
   */
  union(p: number, q: number): void {
    const pId = this.find(p)
    const qId = this.find(q)
    if (pId === qId) {
      return
    }
    this.idList[pId] = qId
    this._count--
  }
}

export class UFWithWeightedQuickUnion extends UFWithQuickUnion {
  protected readonly sz: number[]

  constructor(_count: number) {
    super(_count)

    this.sz = new Array(_count)
    for (let i = 0; i < _count; i++) {
      this.sz[i] = 1
    }
  }

  union(p: number, q: number) {
    let pId = this.find(p)
    let qId = this.find(q)
    if (pId === qId) {
      return
    }
    if (this.sz[pId] > this.sz[qId]) {
      ;[pId, qId] = [qId, pId]
    }
    this.idList[pId] = qId
    this.sz[qId] += this.sz[pId]
    this._count--
  }
}

export class UFWithWeightedQuickUnionPathCompression extends UFWithWeightedQuickUnion {
  find(p: number): number {
    while (p !== this.idList[p]) {
      this.idList[p] = this.idList[this.idList[p]]
      p = this.idList[p]
    }
    return p
  }
}

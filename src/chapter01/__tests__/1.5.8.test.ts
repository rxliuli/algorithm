/*
1.5.8　用一个反例证明 quick-find 算法中的 union() 方法的以下直观实现是错误的：

```java
public void union(int p, int q)
{
   if (connected(p, q)) return;
   // 将p 的分量重命名为q 的分量
   for (int i = 0; i < id.length; i++)
       if (id[i] == id[p]) id[i] = id[q];
   count--;
}

```
 */

import { UFWithQuickFind } from '../UF'

class UF extends UFWithQuickFind {
  union(p: number, q: number): void {
    if (this.connected(p, q)) {
      return
    }
    // 将p 的分量重命名为q 的分量
    for (let i = 0; i < this.idList.length; i++) {
      if (this.idList[i] == this.idList[p]) {
        this.idList[i] = this.idList[q]
      }
    }
    this._count--
  }
}

it('1.5.8', () => {})

/*
2.2.11　改进。实现 2.2.2 节所述的对归并排序的三项改进：加快小数组的排序速度，检测数组是否已经有序以及通过在递归中交换参数来避免数组复制。

@link ./sort.test.ts#sortOfMergeEnhance

TODO 待定
 */

describe('2.2.11', () => {
  function merge(
    arr: number[],
    aux: number[],
    l: number,
    r: number,
    middle: number,
  ) {
    let i = l,
      j = middle + 1
    for (let k = l; k <= r; k++) {
      if (i > middle) {
        arr[k] = aux[j++]
      } else if (j > r) {
        arr[k] = aux[i++]
      } else if (aux[i] < aux[j]) {
        arr[k] = aux[i++]
      } else {
        arr[k] = aux[j++]
      }
    }
    return arr
  }

  function sort(arr: number[], aux: number[], l: number, r: number): number[] {
    if (r == l) {
      arr[l] = aux[l]
      return arr
    }
    const m = l + Math.floor((r - l) / 2)
    ;[arr, aux] = [aux, arr]
    sort(arr, aux, l, m)
    sort(arr, aux, m + 1, r)
    ;[arr, aux] = [aux, arr]
    merge(arr, aux, l, r, m)
    return aux
  }

  function sortOfMerge(arr: number[]) {
    const aux: number[] = []
    sort(arr, aux, 0, arr.length - 1)
    return arr
  }

  it('测试 merge', () => {
    expect(merge([6, 2, 3, 0], [2, 6, 0, 3], 0, 3, 1)).toEqual([0, 2, 3, 6])
    console.log(merge([7, 5, 4], [5, 7, 4], 0, 2, 1))
  })
  it('测试 sort', () => {
    // console.log(sort([], 0, 1, [2, 1]))
    // console.log(sort([], 0, 9, [5, 6, 7, 8, 9, 0, 1, 2, 3, 4]))
    console.log(sort([], [7, 5, 4], 0, 2))
  })
  // console.log(sortOfMerge([7, 5, 4, 6, 2, 8, 9, 1, 0, 3]))
})

/**
 * 检查多个数组是否完全相等
 * @param lists
 */
export function checkArrayEquals(lists: number[][]) {
  let len = lists[0].length
  for (let i = 1; i < lists.length; i++) {
    if (len !== lists[i].length) {
      return false
    }
  }
  for (let i = 0; i < len; i++) {
    let temp = lists[0][i]
    for (let j = 1; j < lists.length; j++) {
      if (lists[j][i] !== temp) {
        return false
      }
    }
  }
  return true
}

const zhCharRegex = /[^\u0000-\u00ff]/g

/**
 * 计算字符串长度，一个汉字的长度为 2
 */
export function sizeof(str: string) {
  return str.replace(zhCharRegex, '  ').length
}

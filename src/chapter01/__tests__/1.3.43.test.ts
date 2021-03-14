/*
1.3.43　文件列表。文件夹就是一列文件和文件夹的列表。编写一个程序，从命令行接受一个文件夹名作为参数，打印出该文件夹下的所有文件并用递归的方式在所有子文件夹的名下（缩进）列出其下的所有文件。提示：使用队列，并参考 java.io.File。

TODO 没看懂和队列有什么关系
 */

import { readdir, stat } from 'fs-extra'
import path from 'path'
import { AsyncArray } from '@liuli-util/async'

describe('1.3.43', () => {
  it('使用嵌套对象', async () => {
    interface FileInfo {
      name: string
      children?: FileInfo[]
    }

    async function scan(filePath: string): Promise<FileInfo> {
      const info = await stat(filePath)
      const name = path.basename(filePath)
      if (info.isFile()) {
        return { name }
      }
      const fileNameList = await readdir(filePath)
      return {
        name,
        children: await AsyncArray.map(fileNameList, (name) =>
          scan(path.resolve(filePath, name)),
        ),
      }
    }

    const fileInfo = await scan(path.resolve(__dirname, '../'))
    console.log(JSON.stringify(fileInfo, null, 2))
  })
})

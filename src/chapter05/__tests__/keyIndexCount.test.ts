import { sortBy } from '@liuli-util/array'

it('键索引计数法', () => {
  interface User {
    name: string
    group: number
  }

  function sortUser(users: User[], R: number) {
    const count = new Array(R + 1).fill(0)
    //统计频率
    for (let user of users) {
      count[user.group]++
    }
    // console.log(count)
    //将频率转换为下标数组
    for (let i = 1; i < count.length; i++) {
      count[i] += count[i - 1]
    }
    // console.log(count)
    //按照下标将数组分组
    const res = new Array(users.length)
    for (let user of users) {
      //这步其实做了很多操作
      //获取当前分组的下标，然后写入，最后将分组的下标+1
      res[count[user.group - 1]++] = user
    }
    // console.log(res)
    return res
  }

  const R = 4
  // const users = RandomUtil.array(
  //   10,
  //   () =>
  //     ({
  //       name: Random.cname(),
  //       group: Random.integer(1, R),
  //     } as User),
  // )
  const users = [
    { name: '崔平', group: 3 },
    { name: '毛艳', group: 4 },
    { name: '周磊', group: 2 },
    { name: '孔秀兰', group: 1 },
    { name: '廖娟', group: 3 },
    { name: '黎磊', group: 1 },
    { name: '任敏', group: 2 },
    { name: '彭磊', group: 3 },
    { name: '于超', group: 1 },
    { name: '唐霞', group: 2 },
  ]
  expect(sortUser(users, R)).toEqual(sortBy(users, (item) => item.group))
})

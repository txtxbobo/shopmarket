import {request} from "./request"

export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}

export function getHomeGoods(type, page) {
  return request({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}
// 函数调用 -> 压入函数栈(保存函数调用过程中所有变量)
// 函数调用结束 -> 弹出函数栈(释放函数所有的变量)

/*
将一个数组添加到另一个数组里面
  let totalNums = []
  const nums1 = [20, 11, 222]
  const num2 = [111, 22, 333]
  for (let n of nums) {
    totalNums.push(n)
}
*/

// totalNums.push(...nums1)
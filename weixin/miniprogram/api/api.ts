/*
 * @Author: lzx
 * @Date: 2021-10-29 13:42:13
 * @LastEditors: lzx
 * @LastEditTime: 2022-06-27 16:15:33
 * @Description: Fuck Bug
 * @FilePath: \reconsitution_talk_vant\utils\api\api.js
 */
import request from "./request.js"

// 测试接口-用于测试封装方法可用性
export function testFun () {
  //这里调用request.js里面封装的请求方法
  return request({
    url: "/login",
    method: 'post',
    data: {
      account: '0001',
      password: '123456',
    }
  })
}
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
    url: "/test",
    method: 'get',
  })
}

export function registerApi (data:any) {
  //这里调用request.js里面封装的请求方法
  return request({
    url: "user/register",
    method: 'post',
    data
  })
}
export function loginApi (data:any) {
  //这里调用request.js里面封装的请求方法
  return request({
    url: "login",
    method: 'post',
    data
  })
}
export function getUserInfoApi () {
  //这里调用request.js里面封装的请求方法
  return request({
    url: "user/info",
    method: 'get',
  })
}
export function getPushApi () {
  //这里调用request.js里面封装的请求方法
  return request({
    url: "push/get",
    method: 'get',
  })
}
export function getInformApi () {
  //这里调用request.js里面封装的请求方法
  return request({
    url: "inform/get",
    method: 'get',
  })
}
export function getTopicApi () {
  //这里调用request.js里面封装的请求方法
  return request({
    url: "topic/get",
    method: 'get',
  })
}
export function updateApi (data:any) {
  //这里调用request.js里面封装的请求方法
  return request({
    url: "user/update",
    method: 'post',
    data
  })
}
export function searchApi (data:any) {
  //这里调用request.js里面封装的请求方法
  return request({
    url: "push/search?search="+data,
    method: 'get',
  })
}

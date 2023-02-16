/*
 * @Author: lzx
 * @Date: 2023-02-16 09:02:15
 * @LastEditors: lzx
 * @LastEditTime: 2023-02-16 09:05:52
 * @Description: Fuck Bug
 * @FilePath: \medical\admin\src\api\api.ts
 */
import request from './requst'
/**
 * @description 用户登录
 * @param {Object} data,
 **/
export async function loginFun (data) {
  return await request({
    url: '/login',
    method: 'post',
    data
  })
}
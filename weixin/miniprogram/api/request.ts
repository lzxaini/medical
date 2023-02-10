/*
 * @Author: lzx
 * @Date: 2023-02-10 13:41:08
 * @LastEditors: lzx
 * @LastEditTime: 2023-02-10 13:41:08
 * @Description: Fuck Bug
 * @FilePath: \talk_vant\utils\api\request.js
 */
//导入请求的域名
import { baseURL } from './config.js'

export default function request(options:any) {
  wx.showLoading({
    title: "请稍候...",
    mask: true //遮蔽层
  });
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseURL + options.url,
      method: options.method || 'post',
      data: options.data || null,
      header: {
        'content-type': 'application/json', // 默认值
        'Authorization': wx.getStorageSync('sessionToken') || ''
      },
      success(res) {
        // 此处可以根据状态码resolve
        resolve(res.data)
      },
      fail(err) {
        let msg = '网络错误,请重试';
        if (err.errno === 5 || err.errMsg.indexOf('time out') != -1) {
          msg = "网络超时,请重试"
        }
        wx.showToast({
          title: msg,
          icon: 'none'
        })
        reject(msg)
      }
    })
  })
}
/*
 * @Author: lzx
 * @Date: 2023-02-16 08:51:46
 * @LastEditors: lzx
 * @LastEditTime: 2023-02-16 09:49:03
 * @Description: Fuck Bug
 * @FilePath: \medical\admin\src\api\requst.ts
 */
import axios from 'axios'
import errorCode from './errorCode'
import { message } from '../utils/resetMessage'
import { ElMessageBox } from 'element-plus'

// 创建axios实例
const service = axios.create({
  // @ts-ignore
  baseURL: import.meta.env.VITE_APP_API, // 配置的地址
  timeout: 30000, // 超时
  headers: {
    'content-type': 'application/json;charset=utf-8'
  }
});

// request拦截器
service.interceptors.request.use(config => {
  if (sessionStorage.getItem('token')) {
    // 在请求头加入token，名字要和后端接收请求头的token名字一样
    config.headers.token = sessionStorage.getItem('token')
  }
  // get请求映射params参数
  if (config.method === 'get' && config.params) {
    let url = config.url + '?';
    for (const propName of Object.keys(config.params)) {
      // @ts-ignore
      const value = config.params[propName];
      let part = encodeURIComponent(propName) + "=";
      if (value !== null && typeof (value) !== "undefined") {
        if (typeof value === 'object') {
          for (const key of Object.keys(value)) {
            let params = propName + '[' + key + ']';
            let subPart = encodeURIComponent(params) + "=";
            url += subPart + encodeURIComponent(value[key]) + "&";
          }
        } else {
          url += part + encodeURIComponent(value) + "&";
        }
      }
    }
    url = url.slice(0, -1);
    config.params = {};
    config.url = url;
  }
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(res => {
  // 可以通过res拿到后端返回的状态码，做些优化，此处省略
    return res.data;
  },
  error => {
    return error
  }
)

export default service

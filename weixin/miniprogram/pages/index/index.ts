// index.ts
// 获取应用实例
const app = getApp<IAppOption>()
import tool from '../../utils/tools'
import { testFun } from '../../api/api'
Page({
  data: {
  },
  onLoad() {
  },
  // 防抖
  test1: tool.debounce(function () {
    console.log('防抖')
  }, 2000),
  // 节流
  test2: tool.throttle(function () {
    console.log('节流')
  }, 2000),
  test3(){
    testFun().then((res:any) => {
      console.log('请求',res)
      wx.showToast({
        title: '请求成功！'
      })
    })
  }
})

// app.ts
// ts定义
interface IAppOption {
  globalData: {
    baseUrl: string,
  }
}
App<IAppOption>({
  globalData: {
    baseUrl: 'http://task.fxnws.com/api/', // 全局api
  },
  onLaunch() {
  },
})
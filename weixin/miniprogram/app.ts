// app.ts
// ts定义
interface IAppOption {
  globalData: {
    baseUrl: string,
  }
}
App<IAppOption>({
  globalData: {
    baseUrl: 'https://www.fastmock.site/mock/8c0f08a17c560d215bc0517532eb2531/testApi', // 全局api
  },
  onLaunch() {
  },
})
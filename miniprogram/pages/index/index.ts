// index.ts
// 获取应用实例
const app = getApp<IAppOption>()
import tool from '../../utils/tools'
import { testFun ,getPushApi,getInformApi} from '../../api/api'
Page({
  data: {
    searhContent:'',
    pushData:'',
    inform:''
  },

  onLoad() {

  },
 onShow(){
  this.getTabBar().init(0)
  this.getPush()
this.getInform()
 },
 getPush(){
  let that =this

  getPushApi().then((res:any)=>{
    console.log(res);
    this.setData({
      pushData:res.data
    })
  })

 },
 getInform(){
  getInformApi().then((res:any)=>{
    console.log(res);
    let length=res.data.length
    console.log(length,res.data,res.data[length-1]);
    
    this.setData({
      inform:res.data[length-1].messages
    })
  })
 },
 onChange(e:any) {
  this.setData({
    searhContent: e.detail,
  });
},
onSearch() {
  console.log(this.data.searhContent);
  wx.navigateTo({
    url:'/pages/searchList/searchList'+'?content='+this.data.searhContent
  })
},
goDetail(e:any){
  console.log(e);
  let {content,createTime,creator,id,illustration,likeNum,title,updateTime}=e.currentTarget.dataset.src
  let result={
    content,createTime,creator,id,illustration,likeNum,title,updateTime
  }
  let newResult =　 JSON.stringify(result);
  wx.navigateTo({
    url:'/pages/articleDetail/articleDetail'+'?result=' +newResult
  })
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

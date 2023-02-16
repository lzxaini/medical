// pages/searchList/searchList.ts
import {searchApi} from '../../api/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
     searchResult:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(opt) {
    console.log(opt);
    searchApi(opt.content).then((res:any)=>{
      console.log(res);
      this.setData({
        searchResult:res.data
      })
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
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})
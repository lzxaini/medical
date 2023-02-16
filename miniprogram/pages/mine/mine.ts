// pages/mine/mine.ts
import {getUserInfoApi} from '../../api/api'
Page({

  /**
   * 页面的初始数据
   */
  data: {
  avatorUrl:'',
  userName:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
  this.getUserInfo()
  },
getUserInfo(){
  getUserInfoApi().then((res:any)=>{
    console.log(res);
    this.setData({
      avatorUrl:res.data.headPortrait,
      userName:res.data.userName
    })
  })
},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },
 goback(){

  wx.redirectTo({
   url:"/pages/login/login"
  })
 },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.getTabBar().init(2)
    this.getUserInfo()

  },
  changeInfo(){
    wx.navigateTo({
      url:'/pages/updateInfo/updateInfo'
    })
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
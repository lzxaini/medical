// pages/login/login.ts
import {loginApi} from '../../api/api'
const md5 = require('../../utils/md5');
import Notify from '@vant/weapp/notify/notify';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: '',//用户名
    pwd:'',//密码
    showPwdError:'',//密码错误提示
    showUserError:''//用户名错误提示
  },
  login(){
    let that=this
    console.log(that.data.userName);
    console.log(that.data.pwd);
    loginApi({
      account: that.data.userName,
      password:md5.hexMD5(that.data.pwd)
    }).then((res:any)=>{
      console.log(res);
      if(res.code!==0){
        return Notify({ type: 'danger', message: res.message });
      }
      if(res.code==0){
        wx.setStorageSync('sessionToken',res.data)
        wx.redirectTo({
          url:'/pages/index/index'
        })
      }
    })
  },
  setUserName(e:any){
    this.setData({
      userName:e.detail
    })
  },
  goRegister(){
    wx.navigateTo({
      url:'/pages/register/register'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

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
    wx.hideHomeButton()
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
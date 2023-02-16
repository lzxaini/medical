// pages/login/login.ts
import Notify from '@vant/weapp/notify/notify';
import {registerApi} from '../../api/api'
import Dialog from '@vant/weapp/dialog/dialog';

const md5 = require('../../utils/md5');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fileList: [
    ],
    account:'',//账号
    userName: '',//用户名
    pwd:'',//密码
    confirmPwd:'',
    showPwdError:'',//密码错误提示
    showUserError:'',//用户名错误提示
    showAccountError:'',
    showConfirmPwdError:''
  },
  login(){
    console.log(
    );
   if(!this.data.account||!this.data.pwd||!this.data.confirmPwd||!this.data.userName){
   Notify({ type: 'warning', message: '请检查输入' });
   return
    }
   if(this.data.confirmPwd!==this.data.pwd){
   Notify({ type: 'warning', message: '密码与确认密码不一致' });
   return
   }
   if(this.data.fileList.length==0){
   Notify({ type: 'warning', message: '头像未上传' });
   return
   }
   console.log(this.data.fileList);
   
   let that =this
   wx.uploadFile({
    url: 'http://task.fxnws.com/api/upload/file', // 仅为示例，非真实的接口地址
    filePath: that.data.fileList[0].url,
    name: 'file',
    success(res) {
      
    console.log(res);
    let params={
      account:that.data.account,
      userName:that.data.userName,
      password:md5.hexMD5(that.data.pwd),
      headPortrait: JSON.parse(res.data).data, //头像  
      isAdmin: "0"
    }
    registerApi(params).then((res:any)=>{
      console.log(res);
      if(res.code===0)
      {
        Dialog.alert({
          message: '注册成功，点击确认去登陆',
        }).then(() => {
          wx.navigateTo({        //页面跳转
            url: '/pages/login/login',
          })
        });
    
      }
      else{
    
      }
    }).catch((err)=>{
      console.log(err);
      return  Notify({ type: 'danger', message: '服务异常' });
 
    })
    },
  });
   
  },
  delete(){
 this.setData({
   fileList:[]
 })
  },
  afterRead(event:any) {
   
    const { file } = event.detail;
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
   console.log(file);
   let arr =[]
   arr.push({
     url:file.url
   })
   this.setData({
     fileList:arr
   })
  },

  goLogin(){
    wx.navigateTo({        //页面跳转
      url: '/pages/login/login',
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
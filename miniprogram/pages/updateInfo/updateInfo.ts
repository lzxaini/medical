// pages/updateInfo/updateInfo.ts
// pages/login/login.ts
import Notify from '@vant/weapp/notify/notify';
import { updateApi, getUserInfoApi } from '../../api/api'
import Dialog from '@vant/weapp/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fileList: [
    ],
    userName: ''
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
    let that =this
    getUserInfoApi().then((res:any)=>{
      console.log(res);
      let result =res.data
      console.log(result);
      
      that.setData({
        userName:result.userName
      })
    })
  },
  afterRead(event: any) {

    const { file } = event.detail;
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    console.log(file);
    let arr = []
    arr.push({
      url: file.url
    })
    this.setData({
      fileList: arr
    })
    console.log(this.data.fileList);
    
  },
  delete() {
    this.setData({
      fileList: []
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },
  doUpdate() {
    console.log(this.data.fileList);
    let that =this
    if (that.data.fileList.length==0) {
     Notify({ type: 'warning', message: '头像未上传' });
     return 
    }
    if (that.data.userName==='') {
      Notify({ type: 'warning', message: '用户名不能为空' });
      return 
     }

       wx.uploadFile({
    url: 'http://task.fxnws.com/api/upload/file', // 仅为示例，非真实的接口地址
    filePath: that.data.fileList[0].url,
    name: 'file',
    success(res) {
      
    console.log(res);
    let params={
      userName:that.data.userName,
      headPortrait: that.data.fileList[0].url, //头像  
    }
    updateApi(params).then((res:any)=>{
      console.log(res);
      if(res.code===0)
      {
        Dialog.alert({
          message: '更改成功，确认返回',
        }).then(() => {
          wx.redirectTo({        //页面跳转
            url: '/pages/mine/mine',
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
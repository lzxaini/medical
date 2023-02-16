// pages/articleDetail/articleDetail.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
      title:'',
      cotent:'',
      creator:'',
      illustration:'',
      likeNum:'',
      createTime:'',
      updateTime:'',
      light:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(opt:any) {
   console.log(opt);
   let result =JSON.parse(opt.result)
   console.log(result);
    this.setData({
      title:result.title,
      content:result.content,
      creator:result.creator,
      illustration:result.illustration,
      likeNum:result.likeNum,
      createTime:result.createTime.split('T')[0],
      updateTime:result.updateTime.split('T')[0]
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
    wx.hideHomeButton()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },
  onClickLeft(){
    wx.navigateBack({
      delta:1
    })
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
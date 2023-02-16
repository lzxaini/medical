// components/tabBar/tabBar.ts
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    active:'home'
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onChange(event:any) {
      console.log(event);
      
      // event.detail 的值为当前选中项的索引
      this.setData({ active: event.detail });
      switch (this.data.active) {
        case 0 :
          wx.switchTab ({        //页面跳转
            url: '/pages/index/index',
          })
            break;  //停止执行，跳出switch
        case 1 :
          wx.switchTab ({        //页面跳转
            url: '/pages/answer/answer',
          })
            break;  //停止执行，跳出switch
        case 2 :
          wx.switchTab ({        //页面跳转
            url: '/pages/mine/mine',
          })

            break;  //停止执行，跳出switch
        default :  //上述条件都不满足时，默认执行的代码
            console.log("游客");
    }
    },
    init(active:any){
      this.setData({active:active})
    }
  }
})

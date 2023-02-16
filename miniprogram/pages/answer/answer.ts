//index.js
import { getTopicApi } from '../../api/api'
Page({
  data: {
    questions: [
      // {
      //   title: "你最喜欢的颜色是什么？",
      //   options: ["红色", "蓝色", "绿色", "黄色"],
      //   answer: 'A',
      //   image:'../../assets/images/logbg.jpg'
      // },
      // {
      //   title: "你最喜欢的食物是什么？",
      //   options: ["披萨", "汉堡", "寿司", "烤肉"],
      //   answer: 'B',
      // },
      // {
      //   title: "你喜欢什么类型的音乐？",
      //   options: ["摇滚", "流行", "嘻哈", "古典"],
      //   answer:'C',
      // },
    ],
    currentQuestionIndex: 0,
    currentAnswerIndex: null,
    currentQuestion: null,
    disableBtn: false,
    score:0,
    total:0
  },
  getTopic() {
    let that = this

    getTopicApi().then((res: any) => {
      console.log(res.data);

      that.setData({
        questions: res.data,
        total:res.data.length
      })
      console.log(that.data.questions);
      that.setData({
        currentQuestion: that.data.questions[that.data.currentQuestionIndex],
      });
      console.log(that.data.currentQuestion);
    })

  },
  onLoad: function () {


  },

  selectOption: function (e: any) {
    console.log(e);
    let that = this
    that.setData({
      currentAnswerIndex: e.detail,
      disableBtn: true
    });
    console.log(typeof that.data.currentQuestion.correct, typeof that.data.currentAnswerIndex);

      if(that.data.currentQuestion.correct===that.data.currentAnswerIndex){
        let data= that.data.score+1
        that.setData({
          score:data
        })

    }
  },

  nextQuestion: function () {
    const currentQuestionIndex = this.data.currentQuestionIndex;
    const currentAnswerIndex = this.data.currentAnswerIndex;
    let that = this
    that.setData({
      disableBtn:false
    })
    if (currentAnswerIndex === null) {
      wx.showToast({
        title: "请选择一个选项",
        icon: "none",
      });
      return;
    }

    if (currentQuestionIndex < this.data.questions.length - 1) {
      this.setData({
        currentQuestionIndex: currentQuestionIndex + 1,
        currentAnswerIndex: null,
        currentQuestion: this.data.questions[currentQuestionIndex + 1],
      });
      console.log(currentQuestionIndex,this.data.questions.length - 1);
      
    } else {
      console.log('结束');
      let that =this
      wx.showModal({
        title: "恭喜你",
        content: "你已经完成了所有的题目,共"+this.data.total+'道题目'+"答对"+this.data.score+'道题目',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            that.setData({
              currentQuestionIndex:0,
              currentAnswerIndex:''
            })
            that.getTopic()
            
          }
        },
      });
    }
  },

  prevQuestion: function () {
    const currentQuestionIndex = this.data.currentQuestionIndex;
    const currentAnswerIndex = this.data.currentAnswerIndex;

    // if (currentAnswerIndex === null) {
    //   wx.showToast({
    //     title: "请选择一个选项",
    //     icon: "none",
    //   });
    //   return;
    // }

    if (currentQuestionIndex > 0) {
      this.setData({
        currentQuestionIndex: currentQuestionIndex - 1,
        currentAnswerIndex: null,
        currentQuestion: this.data.questions[currentQuestionIndex - 1],
      });
    }
  },
  onShow() {
    this.getTabBar().init(1)
    this.getTopic()
  },

});
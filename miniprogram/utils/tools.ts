/*
* @Author: lzx
* @Date: 2022-05-06 13:33:43
* @LastEditors: lzx
* @LastEditTime: 2022-05-06 13:57:06
* @Description: Fuck Bug
* @FilePath: \reconsitution_talk_vant\utils\tool.js
*/
/*函数节流*/
const throttle = (fn:any, interval:number) => {
  let enterTime = 0; // 触发的时间
  let gapTime = interval || 500; // 间隔时间，如果interval不传，则默认300ms
  return function (this:any) {
    let context = this;
    let backTime:any = new Date(); // 第一次函数return即触发的时间
    if (backTime - enterTime > gapTime) {
      fn.call(context, arguments);
      enterTime = backTime; // 赋值给第一次触发的时间，这样就保存了第二次触发的时间
    }
  };
}

/*函数防抖*/
const debounce = (fn:any, interval:number) => {
  let timer:any;
  let gapTime:number = interval || 500; // 间隔时间，如果interval不传，则默认500ms
  return function (this:any) {
    clearTimeout(timer);
    let context = this;
    let args = arguments; // 保存此处的arguments，因为setTimeout是全局的，arguments不是防抖函数需要的。
    timer = setTimeout(function () {
      fn.call(context, args);
    }, gapTime);
  };
}

export default {
  throttle,
  debounce
};

// 说明
// 页面引入：import tool from '../../utils/tool'
// 调用示例：
// 防抖
// test1: tool.debounce(function () {
//   console.log('防抖')
// }, 5000)
// 节流
// test2: tool.throttle(function () {
//   console.log('节流')
// }, 5000)
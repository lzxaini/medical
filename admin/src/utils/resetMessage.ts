/*
 * @Author: lzx
 * @Date: 2023-02-16 08:53:31
 * @LastEditors: lzx
 * @LastEditTime: 2023-02-16 08:53:32
 * @Description: Fuck Bug
 * @FilePath: \medical\admin\src\utils\resetMessage.ts
 */
/* 重置message，防止重复点击重复弹出message弹框 */
import {
  ElMessage
} from 'element-plus'
let messageInstance:any = null
const resetMessage = (options:any) => {
  if (messageInstance) {
    messageInstance.close()
  }
  messageInstance = ElMessage(options)
};
['error', 'success', 'info', 'warning'].forEach(type => {
  resetMessage[type] = options => {
    if (typeof options === 'string') {
      options = {
        message: options
      }
    }
    options.type = type
    return resetMessage(options)
  }
})
export const message = resetMessage
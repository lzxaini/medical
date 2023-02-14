/*
 * @Author: lzx
 * @Date: 2023-02-11 13:47:52
 * @LastEditors: lzx
 * @LastEditTime: 2023-02-12 11:22:23
 * @Description: Fuck Bug
 * @FilePath: \medical\medical-service\routes\uploadFile.js
 */
var express = require('express');
var router = express.Router();
var multer = require('multer');
// 配置路径和文件名
var storage = multer.diskStorage({
  //上传文件到服务器的存储位置
  destination: 'public/uploads/',
  filename: function (req, file, callback) {
    var fileFormat = (file.originalname).split('.')
    var filename = new Date().getTime()
    callback(null, filename + "." + fileFormat[fileFormat.length - 1])
  }
})

var upload = multer({
  storage
})
// 上传图片
router.post('/file', upload.single('file'), function (req, res, next) {
  res.send({
    code: 0,
    data: 'http://task.fxnws.com/uploads/' + req.file.filename,
    message: '上传成功！'
  })
});
module.exports = router;


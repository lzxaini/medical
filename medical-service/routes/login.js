/*
 * @Author: lzx
 * @Date: 2023-02-11 13:47:52
 * @LastEditors: lzx
 * @LastEditTime: 2023-02-11 20:26:40
 * @Description: Fuck Bug
 * @FilePath: \medical\medical-service\routes\login.js
 */
var express = require('express');
var router = express.Router();
var connection = require('../db/config')
const { createToken } = require('../utils/jwtConfig')

// 获取用户信息
router.post('/', (req, res, next) => {
  let account = req.body.account // body传来的账号
  let password = req.body.password // body传来的密码
  connection.query('select * from user where account=? and password=?', [account, password], function (error, results, fields) {
    if (error) throw error // 错误抛出
    if (results.length > 0) {
      res.send({
        code: 0,
        data: createToken(results[0]),
        isAdmin: results[0].isAdmin,
        message: '登录成功！'
      })
    } else {
      res.send({
        code: 9999,
        data: null,
        message: '用户不存在或密码错误！'
      })
    }

  })
});
module.exports = router;

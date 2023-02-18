/*
 * @Author: lzx
 * @Date: 2023-02-11 13:47:52
 * @LastEditors: lzx
 * @LastEditTime: 2023-02-18 21:11:23
 * @Description: Fuck Bug
 * @FilePath: \medical\medical-service\routes\user.js
 */
var express = require('express');
var connection = require('../db/config')
var router = express.Router();

// 注册方法
function registerUser(params, res) {
  connection.query('INSERT INTO user VALUES (?,?,?,?,?,?,?,NOW(),NOW())', [0, params.account, params.password, params.userName, params.headPortrait, params.isAdmin, '0'], function (error, results, fields) {
    if (error) throw error // 错误抛出
    if (results && results.affectedRows > 0) {
      res.send({
        code: 0,
        data: null,
        message: '注册成功！'
      })
    } else {
      res.send({
        code: 9999,
        data: null,
        message: '注册失败！'
      })
    }
  })
}
// 注册接口
router.post('/register', function (req, res, next) {
  let params = {
    account: req.body.account,
    password: req.body.password,
    userName: req.body.userName,
    headPortrait: req.body.headPortrait,
    isAdmin: !req.body.isAdmin ? '0' : req.body.isAdmin
  }
  // 检测用户是否存在
  connection.query('select account from user where account=?', [req.body.account], function (error, results, fields) {
    if (error) throw error // 错误抛出
    if (results.length > 0) {
      res.send({
        code: 0,
        data: null,
        message: '当前账号已存在！'
      })
    } else {
      registerUser(params, res) // 注册用户
    }
  })
});
// 获取用户信息
router.get('/info', function (req, res, next) {
  // 检测用户是否存在
  connection.query('select account,userName,headPortrait,isAdmin,createTime,updateTime,status from user where account=?', [req.auth.account], function (error, results, fields) {
    if (error) throw error // 错误抛出
    if (results) {
      res.send({
        code: 0,
        data: results[0],
        message: '获取成功！'
      })
    } else {
      registerUser(params, res) // 注册用户
    }
  })
});
// 修改用户信息
router.post('/update', function (req, res, next) {
  let params = {
    userName: req.body.userName,
    headPortrait: req.body.headPortrait,
    isAdmin: req.body.isAdmin,
  }
  // sql语句，存在就修改，为空或者undefined就不修改
  let sql = `UPDATE user SET userName=if(${!params.userName}, userName, '${params.userName}'), headPortrait =if (${!params.headPortrait}, headPortrait, '${params.headPortrait}'), isAdmin =if (${!params.isAdmin}, isAdmin, '${params.isAdmin}'), updateTime=NOW() WHERE account='${req.auth.account}'`
  // 更新数据库
  connection.query(sql, function (error, results, fields) {
    if (error) throw error // 错误抛出
    if (results && results.affectedRows > 0) {
      res.send({
        code: 0,
        data: null,
        message: '修改成功！'
      })
    } else {
      res.send({
        code: 0,
        data: null,
        message: '修改失败！'
      })
    }
  })

});

// 查询用户列表
router.get('/list', function (req, res, next) {
  // 检测用户是否存在
  connection.query('select * from user', [], function (error, results, fields) {
    if (error) throw error // 错误抛出
    if (results.length > 0) {
      res.send({
        code: 0,
        data: results,
        message: '获取成功！'
      })
    } else {
      res.send({
        code: 0,
        data: null,
        message: '暂无数据或查询错误！'
      })
    }
  })
});

// 删除用户
router.get('/deleted', function (req, res, next) {
  if (!req.query.delId) {
    return res.send({
      code: 9999,
      data: null,
      message: '参数为空！'
    })
  }
  // 删除
  connection.query(`DELETE FROM user WHERE id=${req.query.delId}`, function (error, results, fields) {
    if (error) throw error // 错误抛出
    if (results && results.affectedRows > 0) {
      res.send({
        code: 0,
        data: null,
        message: '删除成功！'
      })
    } else if (results.affectedRows === 0) {
      res.send({
        code: 0,
        data: null,
        message: '数据不存在！'
      })
    } else {
      res.send({
        code: 0,
        data: null,
        message: '删除失败！'
      })
    }
  })

});
module.exports = router;

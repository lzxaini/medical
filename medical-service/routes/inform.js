/*
 * @Author: lzx
 * @Date: 2023-02-11 13:47:52
 * @LastEditors: lzx
 * @LastEditTime: 2023-02-14 15:05:33
 * @Description: Fuck Bug
 * @FilePath: \medical\medical-service\routes\inform.js
 */
var express = require('express');
var connection = require('../db/config')
var router = express.Router();

// 新增广播
router.post('/insert', function (req, res, next) {
  let params = {
    messages: req.body.messages,
    creator: req.auth.userName
  }
  let value = [0, params.messages, params.creator]
  connection.query('INSERT INTO inform VALUES(?,?,?,NOW(),NOW())', value, function (error, results, fields) {
    if (error) throw error // 错误抛出
    if (results) {
      res.send({
        code: 0,
        data: null,
        message: '新增成功！'
      })
    } else {
      res.send({
        code: 9999,
        data: null,
        message: '新增失败！'
      })
    }

  })
});

// 删除广播
router.get('/deleted', function (req, res, next) {
  if (!req.query.delId) {
    return res.send({
      code: 9999,
      data: null,
      message: '参数为空！'
    })
  }
  // 删除
  connection.query(`DELETE FROM inform WHERE id=${req.query.delId}`, function (error, results, fields) {
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

// 修改广播
router.post('/update', function (req, res, next) {
  if (!req.body.updateId) {
    return res.send({
      code: 9999,
      data: null,
      message: '参数为空！'
    })
  }
  let params = {
    updateId: req.body.updateId,
    messages: req.body.messages,
    creator: req.auth.userName
  }
  // sql语句，存在就修改，为空或者undefined就不修改
  let sql = `UPDATE inform SET messages=if(${!params.messages}, messages, '${params.messages}'), creator=if(${!params.creator}, creator, '${params.creator}'), updateTime=NOW() WHERE id=${params.updateId}`
  // 更新数据库
  connection.query(sql, function (error, results, fields) {
    if (error) throw error // 错误抛出
    if (results) {
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

// 查询所有广播
router.get('/get', function (req, res, next) {
  connection.query('select * from inform', [], function (error, results, fields) {
    if (error) throw error // 错误抛出
    if (results.length > 0) {
      res.send({
        code: 0,
        data: results,
        message: '查询成功！'
      })
    } else {
      res.send({
        code: 9999,
        data: null,
        message: '数据不存在或错误！'
      })
    }

  })
});
module.exports = router;

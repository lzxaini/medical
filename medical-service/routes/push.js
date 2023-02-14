/*
 * @Author: lzx
 * @Date: 2023-02-11 13:47:52
 * @LastEditors: lzx
 * @LastEditTime: 2023-02-14 13:52:47
 * @Description: Fuck Bug
 * @FilePath: \medical\medical-service\routes\push.js
 */
var express = require('express');
var connection = require('../db/config')
var router = express.Router();

// 新增推送
router.post('/insert', function (req, res, next) {
  let params = {
    title: req.body.title,
    content: req.body.content,
    illustration: req.body.illustration,
    likeNum: req.body.likeNum,
    creator: req.auth.userName
  }
  let value = [0, params.title, params.content, params.illustration, params.likeNum, params.creator]
  connection.query('INSERT INTO medicalinfo VALUES(?,?,?,?,?,?,NOW(),NOW())', value, function (error, results, fields) {
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

// 删除推送
router.get('/deleted', function (req, res, next) {
  if (!req.query.delId) {
    return res.send({
      code: 9999,
      data: null,
      message: '参数为空！'
    })
  }
  // 删除
  connection.query(`DELETE FROM medicalinfo WHERE id=${req.query.delId}`, function (error, results, fields) {
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

// 修改推送
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
    title: req.body.title,
    content: req.body.content,
    illustration: req.body.illustration,
    likeNum: req.body.likeNum,
    creator: req.auth.userName
  }
  // sql语句，存在就修改，为空或者undefined就不修改
  let sql = `UPDATE medicalinfo SET title=if(${!params.title}, title, '${params.title}'), content=if(${!params.content}, content, '${params.content}'), illustration=if(${!params.illustration}, illustration, '${params.illustration}'), likeNum=if(${!params.likeNum}, likeNum, '${params.likeNum}'), creator=if(${!params.creator}, creator, '${params.creator}'), updateTime=NOW() WHERE id='${params.updateId}'`
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

// 查询当日数据进行推送
router.get('/get', function (req, res, next) {
  connection.query('select * from medicalinfo where to_days(createTime) = to_days(now())', [], function (error, results, fields) {
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

// 模糊查询
router.get('/search', function (req, res, next) {
  if (!req.query.search) {
    return res.send({
      code: 9999,
      data: null,
      message: '查询条件不能为空！'
    })
  }
  connection.query(`SELECT * from medicalinfo where title like '%${req.query.search}%'`, [], function (error, results, fields) {
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

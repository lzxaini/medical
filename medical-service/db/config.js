const mysql = require('mysql')
let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '19982019',
  database: 'medical', //数据库名称
  port: '3306'
})
module.exports = connection
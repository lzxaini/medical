
const { expressjwt } = require("express-jwt") //从express-jwt中解构
const jwt = require("jsonwebtoken") // 导入jwt
var secretKey = "medical-node-service" // 密钥自己定义
// jwt中间件，拦截除去白名单外的路由
const authJwt = expressjwt({
  credentialsRequired: true,  // 设置为false就不进行校验了，游客也可以访问
  secret: secretKey, // 加密密钥，可换
  algorithms: ['HS256']
}).unless({
  path: ['/api/login', '/uploads', '/api/upload/file', '/api/user/register'] // 添加不需要token验证的路由 
})

// 拦截器
const tokenInterceptor = (err, req, res, next) => {
  if (req.path.startsWith('/uploads/')) { // 图片资源路径不拦截
    return next();
  }
  // 如果错误是由 token 解析失败导致的
  if (err.name === 'UnauthorizedError') {
    return res.send({
      status: 401,
      message: '无效的token'
    })
  }
  res.send({
    status: 500,
    message: '未知的错误'
  })
}

// 创建token
const createToken = (info) => {
  let params = {
    account: info.account,
    userName: info.userName,
    headPortrait: info.headPortrait,
    isAdmin: info.isAdmin
  }
  let token = 'Bearer ' + jwt.sign(params, secretKey, { expiresIn: '1d' });
  return token
}

module.exports = {
  authJwt,
  createToken,
  tokenInterceptor
}
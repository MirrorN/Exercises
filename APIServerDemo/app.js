/* 项目入口文件 */
import express from 'express'
import cors from 'cors'
import userRouter from './router/user.js'
import joi from 'joi'
import expressJWT from 'express-jwt'
import { jwtSecretKey } from './config.js'
import userinfoRouter from './router/userinfo.js'

/* 创建服务器 */
const app = express()

/* 配置 cors 跨域 */
app.use(cors())

/* 配置解析 application/x-www-form-urlencoded 格式的表单数据 */
app.use(express.urlencoded({ extended: false }))



/* 配置一个处理错误的全局中间件 */
app.use((req, res, next) => {
  // 为了方便错误处理 将 status 默认设置为 1
  res.cc = (err, status = 1) => {
    res.send({
      status,
      // err 可能是错误对象或者错误信息字符串
      message: err instanceof Error ? err.message : err
    })
  }
  next()
})

// 注意 进行 token 身份认证的时候需要用到 res.cc 方法响应错误信息 所以此处注册中间件的时候需在 错误处理中间件注册之后
/* 解析 token 字符串的中间件 unless 指定哪些路径不需要 token 身份认证 */
app.use(expressJWT({ secret: jwtSecretKey }).unless({ path: [/^\/api\//] }))

// 注册用户路由模块
app.use('/api', userRouter)

// 注册请求用户信息模块路由
app.use('/my', userinfoRouter)

// 注册获取文章类别路由模块
import artCateRouter from './router/artcate.js'
app.use('/my/article', artCateRouter)

// 全局错误级别中间件
app.use((err, req, res, next) => {
  // 验证失败导致的错误
  if (err instanceof joi.ValidationError) {
    // 注意类似的错误处理一定要 return 否则 连续调用两次 res.send() 会在服务器端报错
    return res.cc(err)
  }

  // token 身份认证失败错误
  if (err.name === 'UnauthorizedError') {
    return res.cc('身份认证失败！')
  }
  res.cc(err)
})

app.listen(3007, () => {
  console.log('Server running at http://127.0.0.1:3007')
})
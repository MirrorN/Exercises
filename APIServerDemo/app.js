/* 项目入口文件 */
import express from 'express'
import cors from 'cors'
import userRouter from './router/user.js'
import joi from 'joi'

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

// 注册用户路由模块
app.use('/api', userRouter)

// 全局错误级别中间件
app.use((err, req, res, next) => {
  // 验证失败导致的错误
  if (err instanceof joi.ValidationError) {
    // 注意类似的错误处理一定要 return 否则 连续调用两次 res.send() 会在服务器端报错
    return res.cc(err)
  }
  res.cc(err)
})

app.listen(3007, () => {
  console.log('Server running at http://127.0.0.1:3007')
})
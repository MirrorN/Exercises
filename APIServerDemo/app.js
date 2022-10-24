/* 项目入口文件 */
import express from 'express'
import cors from 'cors'
import userRouter from './router/user.js'
import joi from '@hapi/joi'

/* 创建服务器 */
const app = express()

/* 配置 cors 跨域 */
app.use(cors())

/* 配置解析 application/x-www-form-urlencoded 格式的表单数据 */
app.use(express.urlencoded({ extended: false }))

/* 配置全局中间件 用于发送错误信息
   向 res 挂载一个 cc() 函数 */
app.use((req, res, next) => {
  // status=0 表示成功 status=1 表示失败 此处默认为 1 
  res.cc = function (err, status = 1) {
    res.send({
      status,
      message: err instanceof Error ? err.message : err
    })
  }
  next()
})

// 全局错误级别中间件
app.use((err, req, res, next) => {
  if (err instanceof joi.ValidationError) {
    return res.cc(err)
  }
  res.cc(err)
})


// 注册用户路由模块
app.use('/api', userRouter)


app.listen(3007, () => {
  console.log('Server running at http://127.0.0.1:3007')
})
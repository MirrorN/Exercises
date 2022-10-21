/* 项目入口文件 */
import express from 'express'
import cors from 'cors'
import userRouter from './router/user.js'

/* 创建服务器 */
const app = express()

/* 配置 cors 跨域 */
app.use(cors())

/* 配置解析 application/x-www-form-urlencoded 格式的表单数据 */
app.use(express.urlencoded({ extended: false }))

// 注册用户路由模块
app.use('/api', userRouter)


app.listen(3007, () => {
  console.log('Server running at http://127.0.0.1:3007')
})
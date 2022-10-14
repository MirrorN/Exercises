/* 创建服务器 */
import express from 'express'
import cors from 'cors'
import userRouter from './router/user_router.js'

const app = express()
app.use(cors())
// 挂载路由
app.use('/api', userRouter)

app.listen(80, () => {
  console.log('server running at http://127.0.0.1')
})

/* 用户路由模块 */
import express from 'express'
// 按需导入
import { regUser, login } from '../router_handler/user.js'

const router = express.Router()

// 注册新用户处理
router.post('/reguser', regUser)

// 登录处理
router.post('/login', login)

// 采用默认导出方式
export default router
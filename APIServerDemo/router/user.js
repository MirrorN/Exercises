/* 用户路由模块 */
import express from 'express'
// 按需导入
import { regUser, login } from '../router_handler/user.js'

// 错误处理
import expressJoi from '@escook/express-joi'
import { reg_login_schema } from '../schema/user.js'

const router = express.Router()

// 注册新用户处理
router.post('/reguser', expressJoi(reg_login_schema), regUser)

// 登录处理
router.post('/login', expressJoi(reg_login_schema), login)

// 采用默认导出方式
export default router
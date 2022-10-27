/* 获取用户信息路由  */
import express from 'express'

const router = express.Router()

/* 挂载 */
// 导入处理函数
import { getUserinfo } from '../router_handler/userinfo.js'
router.get('/userinfo', getUserinfo)

export default router
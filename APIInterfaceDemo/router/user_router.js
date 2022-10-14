import express from 'express'

import { getAllUser } from '../controller/user_ctrl.js'

const router = new express.Router()
// 挂载路由
router.get('/user', getAllUser)

// 导出路由
export default router

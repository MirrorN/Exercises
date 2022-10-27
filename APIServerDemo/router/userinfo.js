/* 获取用户信息路由  */
import express from 'express'
import expressJoi from '@escook/express-joi'

// 导入验证规则
import { update_userinfo_schema, update_password_schema, update_avater_schema } from '../schema/user.js'

const router = express.Router()

/* 挂载获取用户信息的处理函数 - get */
import { getUserinfo } from '../router_handler/userinfo.js'
router.get('/userinfo', getUserinfo)

/* 挂载更新用户信息的处理函数 - post */
import { updateUserinfo } from '../router_handler/userinfo.js'
router.post('/userinfo', expressJoi(update_userinfo_schema), updateUserinfo)

/* 挂载更新用户密码处理函数 - post */
import { updatePassword } from '../router_handler/userinfo.js'
router.post('/updatepwd', expressJoi(update_password_schema), updatePassword)

/* 挂载更新用户头像处理函数 -post */
import { updateAvater } from '../router_handler/userinfo.js'
router.post('/update/avater', expressJoi(update_avater_schema), updateAvater)

export default router
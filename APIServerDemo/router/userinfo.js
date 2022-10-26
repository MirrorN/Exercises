/* 获取用户信息路由  */
import express from 'express'

const router = express.Router()

router.get('/userinfo', (req, res) => {
  res.send('用户信息')
})

export default router
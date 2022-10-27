/* 文章分类路由 */
import express from 'express'

const router = express.Router()

/* 获取文章类别 */
import { getArticleCates } from '../router_handler/artcate.js'
router.get('/cates', getArticleCates)

/* 新增文章类别 */
import { addArticleCates } from '../router_handler/artcate.js'
router.get('/addcates', addArticleCates)


export default router
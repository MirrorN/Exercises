/* 文章分类路由 */
import express from 'express'
import expressJoi from '@escook/express-joi'

const router = express.Router()

/* 获取文章类别 */
import { getArticleCates } from '../router_handler/artcate.js'
router.get('/cates', getArticleCates)

/* 新增文章类别 */
import { add_cate_schema } from '../schema/artcate.js'
import { addArticleCates } from '../router_handler/artcate.js'
router.post('/addcates', expressJoi(add_cate_schema), addArticleCates)

/* 根据Id删除文章类别 */
import { deleteCateById } from '../router_handler/artcate.js'
import { delete_cate_schema } from '../schema/artcate.js'
router.get('/deletecate/:id', expressJoi(delete_cate_schema), deleteCateById)


export default router
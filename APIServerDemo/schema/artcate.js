/* 文章类别数据验证 */
import joi from 'joi'

/* 增加文章分类的规则 */
const name = joi.string().required()
const alias = joi.string().alphanum().required()

export let add_cate_schema = {
  body: {
    name,
    alias,
  }
}

/* 按id删除文章分类的规则 */
const id = joi.number().integer().min(1).required()

export let delete_cate_schema = {
  params: {
    id,
  }
}


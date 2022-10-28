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

/* 根据id获取文章分类的规则 */
export let get_cate_schema = {
  params: {
    id,
  }
}

/* 根据id更新文章类别的规则 */
export let update_cate_schema = {
  body: {
    Id: id,
    name,
    alias,
  }
}


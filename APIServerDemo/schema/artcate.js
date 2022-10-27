/* 文章类别数据验证 */
import joi from 'joi'

const name = joi.string().required()
const alias = joi.string().alphanum().required()

export let add_cate_schema = {
  body: {
    name,
    alias,
  }
}
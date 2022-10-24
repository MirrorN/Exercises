import joi from '@hapi/joi'

/**
 * string() 值必须是字符串
 * alphanum() a-zA-Z0-9的字符串
 * min(length) 最小长度
 * max(length) 最大长度
 * required() 必填项 不能为 undefined
 * pattern(正则表达式) 值必须符合正则表达式的规则
 *  **/


// 用户名的验证规则
const username = joi.string().alphanum().min(1).max(10).required()

// 密码验证
const password = joi.string().pattern(/^[\S]{6,12}$/).required()

reg_login_schema = {
  body: {
    username,
    password,
  },
}

export reg_login_schema
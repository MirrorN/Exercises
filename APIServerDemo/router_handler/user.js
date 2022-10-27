/* 定义用户相关的路由处理函数 */
import db from '../db/index.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { jwtSecretKey, expiresIn } from '../config.js'



/* 按需导出 注册逻辑 */
export function regUser(req, res) {
  const userinfo = req.body
  // 1.检查注册信息是否合法
  // 这是手动进行验证的方式 可以使用第三方数据验证模块进行改进
  /* if (!userinfo.username || !userinfo.password) {
    // return res.send({ status: 1, message: '用户名或密码不能为空！' })
    return res.cc('用户名或密码不能为空！')
  } */

  /* 2.检测用户名是否已被占用 这里注意插入数据的逻辑应该写在查询语句的回调函数中（先查询，成功之后才插入数据） */
  const sql = 'select * from ev_users where username=?'
  db.query(sql, [userinfo.username], (err, results) => {
    if (err) {
      // return res.send({ status: 1, message: err.message })
      return res.cc(err)
    }
    if (results.length > 0) {
      // return res.send({ status: 1, message: '用户名已被占用！' })
      return res.cc('用户名已被占用！')
    }
    // 3.密码加密 bcryptjs.hashSync(明文密码，随机盐的长度)
    userinfo.password = bcrypt.hashSync(userinfo.password, 10)

    // 4.插入新用户
    const sqlInsert = 'insert into ev_users set ?'
    db.query(sqlInsert, { username: userinfo.username, password: userinfo.password }, (err, results) => {
      if (err) {
        // return res.send({ status: 1, message: err.message })
        return res.cc(err)
      }
      // 使用 affectedRows 判断是否插入数据成功
      if (results.affectedRows !== 1) {
        // return res.send({ status: 1, message: '注册失败，请重试！' })
        return res.send('注册失败，请重试！')
      }
      // res.send({ status: 0, message: '注册成功！' })
      res.cc('注册成功！', 0)
    })
  })
}

/* 登录逻辑 */
export function login(req, res) {
  const userinfo = req.body
  const sql = 'select * from ev_users where username=?'
  db.query(sql, userinfo.username, (err, results) => {
    if (err) {
      return res.cc(err)
    }
    // 没有查询到用户名  --- 注意 即使 return
    if (results.length !== 1) {
      return res.cc('登录失败！')
    }

    // 验证密码 --- 使用 bcrypt 生成加密后的字符串与数据库中存储的结果进行比较
    // 使用 bcrypt.compareSync() 方法进行对比
    const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)
    if (!compareResult) {
      return res.cc('密码错误！')
    }

    // TODO 登录成功 生成 token 字符串
    const user = { ...results[0], password: '', user_pic: '' }

    // 用户信息加密生成 token
    const tokenStr = jwt.sign(user, jwtSecretKey, { expiresIn: expiresIn })

    // 将 token 响应给 客户端
    res.send({
      status: 0,
      message: '登录成功！',
      // 注意 Bearer 后面有个空格
      token: 'Bearer ' + tokenStr
    })
  })
}


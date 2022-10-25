/* 定义用户相关的路由处理函数 */
import db from '../db/index.js'
import bcrypt from 'bcryptjs'



// 按需导出
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

export function login(req, res) {
  const userinfo = req.body
  const sql = 'select * from ev_users where username=?'
  db.query(sql, userInfo.username, (err, results) => {
    if (err) {
      return res.cc(err)
    }
    if (results.length !== 1) {
      return res.cc('登录失败！')
    }

    // 验证密码
    const compareResult = bcrypt.compareSync(userInfo.password, results[0].password)
    if (!compareResult) {
      return res.cc('登录失败！')
    }
  })
}


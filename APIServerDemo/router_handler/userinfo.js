/* 用户信息获取、更新、重置密码、更新头像的具体逻辑 */
import db from "../db/index.js";
import bcrypt from 'bcryptjs'

/* 获取用户信息处理函数 */
export function getUserinfo(req, res) {
  const sql = 'select id, username, nickname, email, user_pic from ev_users where id=?'
  // id 从 token 中获取 express-jwt 中间件会自动为 req 挂载user属性 该属性包含所有生成token的属性
  db.query(sql, req.user.id, (err, results) => {
    // sql 执行失败
    if (err) {
      return res.cc(err)
    }

    // 查询结果出错
    if (results.length !== 1) {
      return res.cc('获取用户信息失败！')
    }

    // 发送用户信息
    // sql 查询的结果是一个数组 因此要使用索引的方式返回第一个查询的对象
    res.send({
      status: 0,
      message: '获取用户信息成功！',
      data: results[0],
    })
  })
}


/* 更新用户信息的处理函数 */
export function updateUserinfo(req, res) {
  const sql = 'update ev_users set ? where id=?'
  console.log(req.body)
  db.query(sql, [req.body, req.body.id], (err, results) => {
    if (err) {
      return res.cc(err)
    }
    if (results.affectedRows !== 1) {
      return res.cc('更新用户信息失败！')
    }
    res.cc('修改用户信息成功！', 0)
  })
}


/* 重置用户密码处理函数 */
export function updatePassword(req, res) {
  // 1.查询用户是否存在
  const sql = 'select * from  ev_users where id=?'
  db.query(sql, req.user.id, (err, results) => {
    if (err) {
      return res.cc(err)
    }
    if (results.length !== 1) {
      return res.cc('用户不存在！')
    }
    // 2. 用户存在 判断提交的旧密码正确与否
    const compareResult = bcrypt.compareSync(req.body.oldPwd, results[0].password)
    if (!compareResult) {
      return res.cc('原始密码错误！')
    }
    // 3. 对新密码进行加密 随后保存到数据库中
    const newPwd = bcrypt.hashSync(req.body.newPwd, 10)
    const sqlUpdate = 'update ev_users set password=? where id=?'
    db.query(sqlUpdate, [newPwd, req.user.id], (err, results) => {
      if (err) {
        return res.cc(err)
      }
      if (results.affectedRows !== 1) {
        return res.cc('更新密码失败，请重试！')
      }
      res.cc('更新密码成功！', 0)
    })
  })
}

/* 更新用户头像处理函数 */
export function updateAvater(req, res) {
  const sql = 'update ev_users set user_pic=? where id=?'
  db.query(sql, [req.body.avater, req.user.id], (err, results) => {
    if (err) {
      return res.cc(err)
    }
    if (results.affectedRows !== 1) {
      return res.cc('更新头像失败！')
    }
    res.cc('更新头像成功', 0)
  })
}

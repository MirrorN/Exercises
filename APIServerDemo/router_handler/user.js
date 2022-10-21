/* 定义用户相关的路由处理函数 */
import db from '../db/index.js'

// 按需导出
export function regUser(req, res) {
  const userinfo = req.body
  // 检查注册信息是否合法
  if (!userinfo.username || !userinfo.password) {
    return res.send({ status: 1, message: '用户名或密码不能为空！' })
  }

  // 检测用户名是否已被占用
  const sql = 'select * from ev_users where username=?'
  db.query(sql, [userinfo.username], function (err, res) {
    if (err) {
      return res.send({ status: 1, message: err.message })
    }
    if (res.length > 0) {
      return res.send({ status: 1, message: '用户名已被占用！' })
    }
    // TODO: 用户名可用
  })
}

export function login(req, res) {
  res.send('login done.')
}


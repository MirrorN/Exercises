/* 用户信息获取、更新、重置密码、更新头像的具体逻辑 */
import db from "../db/index.js";


/* 获取用户信息处理 */
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
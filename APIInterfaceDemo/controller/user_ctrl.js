/* 用户查询 */
import db from '../db/index.js'

// 获取所有用户的列表数据 并按需导出
export async function getAllUser(req, res) {
  // query 方法返回的是 Promise 的实例对象 这里使用 async/await 进行简化
  // query 所得结果为[a, b]的形式 这里使用解构赋值的方式取得数组第一个元素
  try {
    const [row] = await db.query('select id, username, status from users')
    res.send({
      staus: 0,
      message: 'read user info done.',
      data: row,
    })
  } catch (error) {
    res.send({
      status: 1,
      message: 'read user info fail.',
      desc: error.message,
    })
  }
}

/* 文章类别处理函数 */
import db from '../db/index.js'

/* 获取文章类别 */
export function getArticleCates(req, res) {
  const sql = 'select * from ev_article_cate where is_delete=0 order by id asc'
  db.query(sql, (err, results) => {
    if (err) {
      return res.cc(err)
    }
    res.send({
      status: 0,
      data: results,
      message: '获取文章分类列表成功'
    })
  })
}

/* 新增文章类别 */
export function addArticleCates(req, res) {
  // 1. 查询类别名称是否已被占用
  const sql = 'select * from ev_article_cate where name=? or alias=?'
  db.query(sql, [req.body.name, req.body.alias], (err, results) => {
    if (err) {
      return res.cc(err)
    }
    if (results.length === 2) {
      return res.cc('分类名与别名被占用！请更换后重试！')
    }
    if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) {
      return res.cc('分类名与别名被占用！请重试！')
    }
    if (results.length === 1 && results[0].name === req.body.name) {
      return res.cc('分类名被占用！请重试！')
    }
    if (results.length === 1 && results[0].alias === req.body.alias) {
      return res.cc('别名被占用！请重试！')
    }

    // 2. 检测完毕后插入新类别
    const sqlInsert = 'insert into ev_article_cate set ?'
    db.query(sqlInsert, req.body, (err, results) => {
      if (err) {
        return res.cc(err)
      }
      if (results.affectedRows !== 1) {
        return res.cc('新增类别失败，请重试！')
      }
      res.cc('新增类别成功!', 0)
    })
  })
}
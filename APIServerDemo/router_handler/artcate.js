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
  res.send('新增文章类别')
  // const sql = 'insert into ev_artcile_cate set'
}
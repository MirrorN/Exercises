/* 数据库操作模块 */
import mysql from 'mysql2'

const pool = mysql.createPool({
  host: '127.0.0.1',
  port: 3306,
  database: 'my_dv_01',
  user: 'root',
  password: 'admin123',
})

// 默认导出一个支持 Promise API 的 pool
export default pool.promise()

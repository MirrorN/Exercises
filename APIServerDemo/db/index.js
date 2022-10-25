/* 数据库模块 */
import mysql from 'mysql'

const db = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'admin123',
  database: 'my_dv_01',
})

export default db
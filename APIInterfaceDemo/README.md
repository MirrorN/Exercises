## 案例需求

基于 MySQL 数据库 + Express 对外提供用户列表的 API 接口

主要应用知识点有：

- express、mysql2
- ES6 模块化方法
- Promise
- async/await

## 实现步骤

1. 创建项目基本结构
2. 创建基本服务器
3. 创建 db 数据库操作模块
4. 创建 user_ctrl 业务模块
5. 创建 user_router 路由模块

## 注意事项

### 启用 ES6 语法

使用 `npm init -y`初始化包配置管理文件，并在 `package.json` 中添加`"type":"module",`启用 ES6 语法

### 安装所需包

```
npm i express@4.17.1 mysql2@2.2.5
```


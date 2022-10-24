## README

Node.js 服务器案例

### 所需依赖

- express
- cors
- mysql
- bcryptjs  -- 密码加密
- @hapi/joi 第三方数据验证模块
- @escook/express-joi 自动表单数据验证

### 项目目录结构

- router：存放路由模块，只存放用户请求和处理函数之间的映射关系
- router_handler：存放路由处理函数，存放每个路由对应的处理函数
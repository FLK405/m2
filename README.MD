# 材料测试分析方法体系研究及材料基因数据库的构建

## 项目结构

```bash
├── client # 前端
├── docs # 文档
├── README.MD # 项目说明
└── server # 后端
```

## 项目说明

-   后端语言使用 nodejs + typescript + express
-   前端使用原生的 webcomponents + typescript + vite
-   数据库使用 postgresql

## 项目初始化

一、 安装 postgresql，并创建名为 `material` 的数据库，创建用户 `material`，并设置密码为 `test123`，并且允许用户 `material` 远程连接数据库

```bash
# 安装 postgresql
sudo apt install postgresql
# 切换到 postgres 用户
sudo -u postgres
# 进入 psql
psql
# 创建数据库
CREATE DATABASE material;
# 创建用户
CREATE USER material WITH PASSWORD 'test123';
# 授予用户 `material` 对数据库 `material` 的全部权限
GRANT ALL PRIVILEGES ON DATABASE material TO material;
# 设置用户 `material` 为超级用户
ALTER USER material WITH SUPERUSER;
# 设置用户 `material` 可以登录
ALTER USER material WITH LOGIN;
# 退出 psql
\q
```

二、 项目启动说明

```bash
cd server
npm install

cd client
npm install
npm run dev

# 接下来按 F5 启动后端
```

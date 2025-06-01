# 用户管理

## 字段列表

### `roles` 表

-   `role_id`: 角色的唯一标识符 (SERIAL PRIMARY KEY)。
-   `role_name`: 角色名称 (例如：管理员, 研究员, 普通用户)，必须唯一 (VARCHAR(100) NOT NULL UNIQUE)。
-   `description`: 角色的详细描述和职责 (TEXT)。

### `users` 表

-   `user_id`: 用户的唯一标识符 (BIGSERIAL PRIMARY KEY)。
-   `username`: 用户的登录名，必须唯一 (VARCHAR(100) NOT NULL UNIQUE)。
-   `password_hash`: 用户密码的哈希存储值 (TEXT NOT NULL)。
-   `email`: 用户的电子邮件地址，如果提供则必须唯一 (VARCHAR(255) UNIQUE)。
-   `full_name`: 用户的全名 (VARCHAR(200))。
-   `role_id`: 外键，关联到用户所属的角色 (INT, REFERENCES roles(role_id))。
-   `is_active`: 账户是否激活 (BOOLEAN, 默认为 TRUE)。
-   `last_login_date`: 用户最后登录时间 (TIMESTAMP WITH TIME ZONE)。
-   `date_created`: 账户创建时间 (TIMESTAMP WITH TIME ZONE, 默认为 CURRENT_TIMESTAMP)。

## 数据库设计

```sql
-- PostgreSQL DDL for Roles and Users tables

-- Roles Table
DROP TABLE IF EXISTS roles CASCADE;
CREATE TABLE roles (
    role_id SERIAL PRIMARY KEY,
    role_name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT
);

COMMENT ON TABLE roles IS 'Stores user roles within the system.';
COMMENT ON COLUMN roles.role_id IS 'Unique identifier for the role.';
COMMENT ON COLUMN roles.role_name IS 'Name of the role (e.g., Administrator, Researcher, User). Should be unique.';
COMMENT ON COLUMN roles.description IS 'Detailed description of the role and its responsibilities.';

-- Users Table
DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
    user_id BIGSERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    email VARCHAR(255) UNIQUE,
    full_name VARCHAR(200),
    role_id INT,
    is_active BOOLEAN DEFAULT TRUE,
    last_login_date TIMESTAMP WITH TIME ZONE,
    date_created TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES roles(role_id)
);

COMMENT ON TABLE users IS 'Stores user account information.';
COMMENT ON COLUMN users.user_id IS 'Unique identifier for the user.';
COMMENT ON COLUMN users.username IS 'Login username for the user. Should be unique.';
COMMENT ON COLUMN users.password_hash IS 'Hashed password for user authentication.';
COMMENT ON COLUMN users.email IS 'Email address of the user. Should be unique if provided.';
COMMENT ON COLUMN users.full_name IS 'Full name of the user.';
COMMENT ON COLUMN users.role_id IS 'Foreign key referencing the role assigned to the user.';
COMMENT ON COLUMN users.is_active IS 'Flag indicating if the user account is active (TRUE) or inactive (FALSE). Defaults to TRUE.';
COMMENT ON COLUMN users.last_login_date IS 'Timestamp of the last successful login by the user.';
COMMENT ON COLUMN users.date_created IS 'Timestamp of when the user account was created. Defaults to the current timestamp.';
```

## 技术栈

### 后端

-   框架：Node.js + Express
-   数据库：PostgreSQL
-   ORM：Prisma
-   接口文档：Swagger/OpenAPI

### 前端

-   框架：Web Components
-   UI 组件：Lit Element
-   状态管理：Redux
-   请求库：Fetch API
-   构建工具：Vite

## API 设计

### 接口定义

```typescript
interface Role {
    role_id: number;
    role_name: string;
    description?: string;
}

interface User {
    user_id: number; // Changed from string to number to match BIGSERIAL
    username: string;
    password_hash?: string; // Typically not sent to client, or only on creation
    email?: string;
    full_name?: string;
    role_id: number;
    is_active?: boolean;
    last_login_date?: string; // ISO 8601 date string
    date_created?: string;  // ISO 8601 date string
    role?: Role; // Optional: for returning user with role details
}

// For User creation, password is required
interface CreateUserPayload {
    username: string;
    password_hash: string; // Or plain password, to be hashed by backend
    email?: string;
    full_name?: string;
    role_id: number;
    is_active?: boolean;
}

// For User update, all fields are optional
interface UpdateUserPayload {
    username?: string;
    password_hash?: string; // Or plain password
    email?: string;
    full_name?: string;
    role_id?: number;
    is_active?: boolean;
}
```

### 接口端点

#### Roles API
```
POST   /api/roles.create     // 创建新角色
POST   /api/roles.list       // 获取角色列表
POST   /api/roles.get        // 获取单个角色
POST   /api/roles.update     // 更新角色
POST   /api/roles.delete     // 删除角色
```

#### Users API
```
POST   /api/users.create     // 创建新用户
POST   /api/users.list       // 获取用户列表（支持分页和筛选）
POST   /api/users.get        // 获取单个用户
POST   /api/users.update     // 更新用户
POST   /api/users.delete     // 删除用户
POST   /api/users.login      // 用户登录
POST   /api/users.changePassword // 用户修改密码
```

## API 接口文档

### 1. 获取角色列表 (`/api/roles.list`)

```typescript
POST /api/roles.list

请求参数：
{
    page?: number (页码，默认1)
    pageSize?: number (每页数量，默认10)
    search?: string (按角色名称搜索，可选)
}

响应数据：
{
    total: number,
    items: Role[],
    page: number,
    pageSize: number
}
```

### 2. 获取单个角色 (`/api/roles.get`)

```typescript
POST /api/roles.get

请求参数：
{
    role_id: number
}

响应数据：
Role
```

### 3. 创建角色 (`/api/roles.create`)

```typescript
POST /api/roles.create

请求数据：
{
    role_name: string;
    description?: string;
}

响应数据：
{
    success: boolean,
    data: Role // The created role with role_id
}
```

### 4. 更新角色 (`/api/roles.update`)

```typescript
POST /api/roles.update

请求数据：
{
    role_id: number,
    data: Partial<Omit<Role, 'role_id'>>
}

响应数据：
{
    success: boolean,
    data: Role // The updated role
}
```

### 5. 删除角色 (`/api/roles.delete`)

```typescript
POST /api/roles.delete

请求参数：
{
    role_id: number
}

响应数据：
{
    success: boolean
}
```

### 6. 获取用户列表 (`/api/users.list`)

```typescript
POST /api/users.list

请求参数：
{
    page?: number (页码，默认1)
    pageSize?: number (每页数量，默认10)
    search?: string (按用户名或全名搜索，可选)
    role_id?: number (按角色ID筛选，可选)
    is_active?: boolean (按激活状态筛选，可选)
}

响应数据：
{
    total: number,
    items: User[], // password_hash should be excluded
    page: number,
    pageSize: number
}
```

### 7. 获取单个用户 (`/api/users.get`)

```typescript
POST /api/users.get

请求参数：
{
    user_id: number
}

响应数据：
User // password_hash should be excluded
```

### 8. 创建用户 (`/api/users.create`)

```typescript
POST /api/users.create

请求数据：
CreateUserPayload // Backend will hash the password

响应数据：
{
    success: boolean,
    data: User // The created user with user_id, password_hash excluded
}
```

### 9. 更新用户 (`/api/users.update`)

```typescript
POST /api/users.update

请求数据：
{
    user_id: number,
    data: UpdateUserPayload // Backend will hash password if provided
}

响应数据：
{
    success: boolean,
    data: User // The updated user, password_hash excluded
}
```

### 10. 删除用户 (`/api/users.delete`)

```typescript
POST /api/users.delete

请求参数：
{
    user_id: number
}

响应数据：
{
    success: boolean
}
```

### 11. 用户登录 (`/api/users.login`)
```typescript
POST /api/users.login

请求参数：
{
    username: string,
    password_hash: string // Or plain password, depending on backend expectation
}

响应数据：
{
    success: boolean,
    token?: string, // JWT or session token
    user?: User // User details, password_hash excluded
    message?: string
}
```

### 错误响应格式

```typescript
{
    error: {
        code: string, // e.g., "VALIDATION_ERROR", "NOT_FOUND", "UNAUTHORIZED"
        message: string
    }
}
```

## 开发步骤

1.  **数据库搭建**
    *   创建 PostgreSQL 数据库 (如果尚不存在)。
    *   执行 `db/user_management.sql` 脚本创建 `roles` 和 `users` 表。
    *   确认外键、索引和约束已正确设置。

2.  **后端开发 (Node.js + Express + Prisma)**
    *   初始化 Node.js 项目并安装 Express, Prisma, bcrypt (用于密码哈希) 等依赖。
    *   配置 Prisma 连接到 PostgreSQL 数据库，并根据 `user_management.sql` 生成 Prisma schema。
    *   为 `Roles` 和 `Users` 实现 CRUD (Create, Read, Update, Delete) 接口。
        *   `POST /api/roles.create`, `POST /api/roles.list`, `POST /api/roles.get`, `POST /api/roles.update`, `POST /api/roles.delete`
        *   `POST /api/users.create`, `POST /api/users.list`, `POST /api/users.get`, `POST /api/users.update`, `POST /api/users.delete`
    *   实现用户认证接口:
        *   `POST /api/users.login` (验证凭据, 生成 JWT 或 session token)。
        *   Password Hashing: 使用 bcrypt 对密码进行哈希和比较。
    *   添加参数验证和错误处理中间件。
    *   实现用户列表的分页和筛选功能。
    *   使用 Swagger/OpenAPI 自动生成或手动编写 API 文档。

3.  **前端开发 (Web Components + Lit Element)**
    *   初始化 Web Components 项目。
    *   开发用户管理页面组件 (例如 `user-management-view`)。
    *   开发角色管理组件 (例如 `role-management-view` 或集成到用户表单中)。
    *   实现用户列表展示组件 (支持分页、搜索、筛选)。
    *   实现用户创建/编辑表单组件 (包含角色选择)。
    *   实现角色创建/编辑表单组件。
    *   实现登录表单组件。
    *   添加数据验证逻辑。
    *   使用 Fetch API 调用后端接口。
    *   管理应用状态 (例如使用 Redux)，特别是用户认证状态。
    *   添加样式和交互效果。

4.  **测试和优化**
    *   后端：编写单元测试 (例如测试 Prisma 查询、服务逻辑) 和集成测试 (测试 API 端点)。
    *   前端：编写组件单元测试和端到端测试。
    *   进行性能测试和优化，例如数据库查询优化。
    *   关注安全性：防止 SQL 注入 (Prisma 有帮助), XSS, CSRF。确保密码安全存储。
    *   用户体验优化。

5.  **部署**
    *   选择合适的部署平台 (例如 Docker, Kubernetes, PaaS)。
    *   配置生产环境变量。
    *   设置 CI/CD 流水线。

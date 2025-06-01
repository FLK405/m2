# 系统工具

## 字段列表

### `system_help_docs` (系统帮助文档)

-   `id`: 帮助文档的唯一标识符 (SERIAL PRIMARY KEY)。
-   `topic`: 帮助文档的主题，必须唯一 (VARCHAR(200) NOT NULL UNIQUE)。
-   `content`: 帮助文档的完整内容 (TEXT NOT NULL)。
-   `last_updated`: 文档最后更新时间 (TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP)。
-   `updated_by`: 最后更新文档的用户或过程 (VARCHAR(100))。

## 数据库设计

```sql
-- PostgreSQL DDL for System Utilities tables

-- System Help Documents Table
DROP TABLE IF EXISTS system_help_docs CASCADE;
CREATE TABLE system_help_docs (
    id SERIAL PRIMARY KEY,
    topic VARCHAR(200) NOT NULL UNIQUE,
    content TEXT NOT NULL,
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_by VARCHAR(100)
);

COMMENT ON TABLE system_help_docs IS 'Stores system usage instructions and help documents.';
COMMENT ON COLUMN system_help_docs.id IS 'Unique identifier for the help document.';
COMMENT ON COLUMN system_help_docs.topic IS 'Topic of the help document, must be unique.';
COMMENT ON COLUMN system_help_docs.content IS 'Full content of the help document.';
COMMENT ON COLUMN system_help_docs.last_updated IS 'Timestamp when the document was last updated. Defaults to current timestamp.';
COMMENT ON COLUMN system_help_docs.updated_by IS 'User or process that last updated the document.';
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

### 接口定义 (TypeScript)

```typescript
interface SystemHelpDoc {
    id?: number; // SERIAL output, optional for input
    topic: string;
    content: string;
    last_updated?: string; // ISO 8601 date string, output
    updated_by?: string;
}
```

### 接口端点

```
POST   /api/systemHelpDocs.create     // 创建新帮助文档
POST   /api/systemHelpDocs.list       // 获取帮助文档列表 (可按主题筛选/搜索)
POST   /api/systemHelpDocs.get        // 获取单个帮助文档 (by id or topic)
POST   /api/systemHelpDocs.update     // 更新帮助文档
POST   /api/systemHelpDocs.delete     // 删除帮助文档
```

## API 接口文档

(Following the pattern of the template, detailing request/response for key endpoints.)

### 1. 创建帮助文档 (`/api/systemHelpDocs.create`)

```typescript
POST /api/systemHelpDocs.create

请求数据：
Omit<SystemHelpDoc, 'id' | 'last_updated'>

响应数据：
{
    success: boolean,
    data: SystemHelpDoc // The created document with id and last_updated
}
```

### 2. 获取帮助文档列表 (`/api/systemHelpDocs.list`)

```typescript
POST /api/systemHelpDocs.list

请求参数：
{
    page?: number;
    pageSize?: number;
    search_topic?: string; // Search by topic
}

响应数据：
{
    total: number,
    items: SystemHelpDoc[],
    page: number,
    pageSize: number
}
```

### 3. 获取单个帮助文档 (`/api/systemHelpDocs.get`)

```typescript
POST /api/systemHelpDocs.get

请求参数：
{
    id?: number;
    topic?: string; // Can fetch by either unique ID or unique topic
}

响应数据：
SystemHelpDoc
```

### 错误响应格式

```typescript
{
    error: {
        code: string, // e.g., "VALIDATION_ERROR", "NOT_FOUND"
        message: string
    }
}
```

## 开发步骤

1.  **数据库搭建**
    *   执行 `db/system_utils.sql` 脚本创建 `system_help_docs` 表。
    *   确认 `UNIQUE` 约束对 `topic` 列已生效。

2.  **后端开发 (Node.js + Express + Prisma)**
    *   更新 Prisma schema, `prisma generate`.
    *   为 `SystemHelpDoc` 实现 CRUD 接口.
    *   实现列表接口的筛选/搜索功能.
    *   参数验证, 错误处理, 分页.
    *   更新/生成 API 文档.

3.  **前端开发 (Web Components + Lit Element)**
    *   开发帮助文档管理界面 (可能在管理后台).
    *   实现列表展示，支持按主题搜索.
    *   开发表单用于创建/编辑帮助文档 (อาจจะใช้ Markdown editor สำหรับ content).

4.  **测试和优化**
    *   Backend & frontend tests.

5.  **部署**
    *   (As per template)

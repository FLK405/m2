# 文献与标准

## 字段列表

### `literature_standards` (文献与标准)

-   `id`: 文献/标准记录的唯一标识符 (BIGSERIAL PRIMARY KEY)。
-   `document_type`: 文档类型 (如 '文献', '标准', '测试方法', '行业规范') (VARCHAR(50) NOT NULL CHECK (...))。
-   `title_standard_no`: 文献标题或标准编号 (VARCHAR(500) NOT NULL)。
-   `authors_issuing_body`: 文献作者或标准发布机构 (VARCHAR(500))。
-   `publication_year_date`: 出版年份或具体日期 (VARCHAR(50))。
-   `journal_publisher_source`:期刊、出版社或来源 (VARCHAR(200))。
-   `keywords`: 关键词 (TEXT)。
-   `abstract_scope_description`: 文献摘要或标准范围描述 (TEXT)。
-   `file_path_url`: 文件路径或URL (VARCHAR(500))。
-   `entry_date`: 记录添加日期 (TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP)。
-   `added_by`: 数据录入人员 (VARCHAR(100))。
-   `remarks`: 备注 (TEXT)。

## 数据库设计

```sql
-- PostgreSQL DDL for Literature and Standards table

DROP TABLE IF EXISTS literature_standards CASCADE;
CREATE TABLE literature_standards (
    id BIGSERIAL PRIMARY KEY,
    document_type VARCHAR(50) NOT NULL CHECK (document_type IN ('文献', '标准', '测试方法', '行业规范')),
    title_standard_no VARCHAR(500) NOT NULL,
    authors_issuing_body VARCHAR(500),
    publication_year_date VARCHAR(50),
    journal_publisher_source VARCHAR(200),
    keywords TEXT,
    abstract_scope_description TEXT,
    file_path_url VARCHAR(500),
    entry_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    added_by VARCHAR(100),
    remarks TEXT
);

COMMENT ON TABLE literature_standards IS 'Stores information about literature, standards, test methods, and industry specifications.';
COMMENT ON COLUMN literature_standards.id IS 'Unique identifier for the document record.';
COMMENT ON COLUMN literature_standards.document_type IS 'Type of the document (e.g., 文献, 标准, 测试方法, 行业规范).';
COMMENT ON COLUMN literature_standards.title_standard_no IS 'Title of the literature or Standard number.';
COMMENT ON COLUMN literature_standards.authors_issuing_body IS 'Authors of the literature or issuing body of the standard.';
COMMENT ON COLUMN literature_standards.publication_year_date IS 'Year or specific date of publication/issue.';
COMMENT ON COLUMN literature_standards.journal_publisher_source IS 'Journal, publisher, or source of the document.';
COMMENT ON COLUMN literature_standards.keywords IS 'Keywords associated with the document.';
COMMENT ON COLUMN literature_standards.abstract_scope_description IS 'Abstract of the literature or scope/description of the standard.';
COMMENT ON COLUMN literature_standards.file_path_url IS 'Filesystem path or URL to the document.';
COMMENT ON COLUMN literature_standards.entry_date IS 'Timestamp when the record was added. Defaults to current timestamp.';
COMMENT ON COLUMN literature_standards.added_by IS 'User or process that added this record.';
COMMENT ON COLUMN literature_standards.remarks IS 'Additional notes or comments.';
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
type DocumentType = '文献' | '标准' | '测试方法' | '行业规范';

interface LiteratureStandard {
    id?: number; // BIGSERIAL output, optional for input
    document_type: DocumentType | string; // Allow other strings or enforce enum
    title_standard_no: string;
    authors_issuing_body?: string;
    publication_year_date?: string;
    journal_publisher_source?: string;
    keywords?: string; // Could be string[] if parsed
    abstract_scope_description?: string;
    file_path_url?: string;
    entry_date?: string; // ISO 8601 date string, output
    added_by?: string;
    remarks?: string;
}
```

### 接口端点

```
POST   /api/literatureStandards.create     // 创建新文献/标准记录
POST   /api/literatureStandards.list       // 获取记录列表 (支持分页, 筛选按类型、关键词等)
POST   /api/literatureStandards.get        // 获取单条记录 (by id)
POST   /api/literatureStandards.update     // 更新记录
POST   /api/literatureStandards.delete     // 删除记录
```

## API 接口文档

(Following the pattern of the template, detailing request/response for key endpoints.)

### 1. 创建文献/标准记录 (`/api/literatureStandards.create`)

```typescript
POST /api/literatureStandards.create

请求数据：
Omit<LiteratureStandard, 'id' | 'entry_date'>

响应数据：
{
    success: boolean,
    data: LiteratureStandard // The created record with id and entry_date
}
```

### 2. 获取文献/标准列表 (`/api/literatureStandards.list`)

```typescript
POST /api/literatureStandards.list

请求参数：
{
    page?: number;
    pageSize?: number;
    document_type?: DocumentType | string;
    keywords?: string; // Search within keywords
    search_text?: string; // General search on title, abstract, etc.
}

响应数据：
{
    total: number,
    items: LiteratureStandard[],
    page: number,
    pageSize: number
}
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
    *   执行 `db/literature_standards.sql` 脚本创建表。
    *   确认 `CHECK` 约束已生效。

2.  **后端开发 (Node.js + Express + Prisma)**
    *   更新 Prisma schema, `prisma generate`.
    *   为 `LiteratureStandard` 实现 CRUD 接口.
    *   实现强大的筛选逻辑 for `/api/literatureStandards.list` (类型, 关键词, 全文搜索等).
    *   参数验证, 错误处理, 分页.
    *   更新/生成 API 文档.

3.  **前端开发 (Web Components + Lit Element)**
    *   开发文献/标准管理页面.
    *   实现列表展示，支持筛选和搜索.
    *   开发表单用于创建/编辑记录, 包括文件上传或URL链接功能.

4.  **测试和优化**
    *   Backend & frontend tests.
    *   搜索功能性能优化.

5.  **部署**
    *   (As per template)

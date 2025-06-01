# 终端产品防弹性能

## 字段列表

### `end_products` (终端产品信息)

-   `product_id`: 终端产品的唯一标识符 (BIGSERIAL PRIMARY KEY)。
-   `product_name`: 产品名称 (如 XX型号防弹衣, YY型号头盔) (VARCHAR(200) NOT NULL)。
-   `manufacturer`: 产品制造商 (VARCHAR(200))。
-   `product_type`: 产品类型 (如 防弹衣, 防弹头盔, 防弹板) (VARCHAR(100))。
-   `protection_level_claimed`: 宣称防护等级 (如 NIJ IIIA, STANAG 2920) (VARCHAR(100))。
-   `structure_description_areal_density`: 产品结构描述、面密度等 (TEXT)。
-   `manufacturing_date`: 生产日期 (TIMESTAMP WITH TIME ZONE)。
-   `entry_date`: 记录添加日期 (TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP)。
-   `added_by`: 数据录入人员 (VARCHAR(100))。
-   `remarks`: 备注 (TEXT)。

### `ballistic_tests` (防弹性能测试)

-   `test_id`: 防弹测试的唯一标识符 (BIGSERIAL PRIMARY KEY)。
-   `product_id`: 外键，关联到被测产品 (BIGINT NOT NULL, REFERENCES end_products(product_id))。
-   `test_standard`: 测试标准 (如 NIJ 0101.06, STANAG 2920) (VARCHAR(100) NOT NULL)。
-   `test_date`: 测试日期 (TIMESTAMP WITH TIME ZONE)。
-   `testing_institution`: 测试机构 (VARCHAR(200))。
-   `test_location`: 测试地点 (VARCHAR(200))。
-   `projectile_type_full_spec`: 弹丸类型及详细规格 (如 9mm FMJ, 7.62x39mm MSC) (VARCHAR(200) NOT NULL)。
-   `projectile_mass_g`: 弹丸质量 (g) (DECIMAL(10,2))。
-   `impact_velocity_mps`: 冲击速度 (m/s) (DECIMAL(10,1))。
-   `v50_mps`: V50弹道极限值 (m/s) (DECIMAL(10,1))。
-   `backing_material_type`: 衬垫材料类型 (如 Roma Plastilina No.1) (VARCHAR(100))。
-   `backing_material_calibration_info`: 衬垫材料标定信息 (TEXT)。
-   `bfs_mm`: 背面凹陷深度 (mm) (DECIMAL(8,2))。
-   `penetration_result`: 穿透结果 (VARCHAR(50) CHECK (penetration_result IN ('Complete Penetration', 'Partial Penetration', 'No Penetration', 'Perforation')))。
-   `number_of_layers_penetrated`: 穿透层数 (针对软质防弹衣) (INTEGER)。
-   `number_of_shots`: 测试序列中的总射击次数 (INTEGER)。
-   `shot_pattern_placement`: 弹着点分布描述或图示 (TEXT)。
-   `angle_of_impact_degrees`: 着角 (度, 0度为垂直) (DECIMAL(8,1) DEFAULT 0)。
-   `environmental_conditions_test`: 测试时的环境条件 (如温度、湿度) (VARCHAR(200))。
-   `failure_analysis_observation`: 失效模式的观察与分析 (TEXT)。
-   `photos_videos_path`: 测试照片/视频路径 (可为JSON数组或逗号分隔的字符串) (TEXT)。
-   `test_report_path`: 完整测试报告路径 (VARCHAR(500))。
-   `entry_date`: 记录添加日期 (TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP)。
-   `added_by`: 数据录入人员 (VARCHAR(100))。
-   `remarks`: 备注 (TEXT)。

## 数据库设计

```sql
-- PostgreSQL DDL for End Products and Ballistic Tests tables

-- EndProducts Table
DROP TABLE IF EXISTS end_products CASCADE;
CREATE TABLE end_products (
    product_id BIGSERIAL PRIMARY KEY,
    product_name VARCHAR(200) NOT NULL,
    manufacturer VARCHAR(200),
    product_type VARCHAR(100),
    protection_level_claimed VARCHAR(100),
    structure_description_areal_density TEXT,
    manufacturing_date TIMESTAMP WITH TIME ZONE,
    entry_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    added_by VARCHAR(100),
    remarks TEXT
);

COMMENT ON TABLE end_products IS 'Stores information about terminal products like body armor, helmets, etc.';
COMMENT ON COLUMN end_products.product_id IS 'Unique identifier for the end product.';
COMMENT ON COLUMN end_products.product_name IS 'Name of the product (e.g., XX Model Vest, YY Model Helmet).';
COMMENT ON COLUMN end_products.manufacturer IS 'Manufacturer of the end product.';
COMMENT ON COLUMN end_products.product_type IS 'Type of product (e.g., Body Armor, Helmet, Ballistic Plate).';
COMMENT ON COLUMN end_products.protection_level_claimed IS 'Claimed protection level (e.g., NIJ IIIA, STANAG 2920).';
COMMENT ON COLUMN end_products.structure_description_areal_density IS 'Description of the product structure, areal density, etc.';
COMMENT ON COLUMN end_products.manufacturing_date IS 'Date when the product was manufactured.';
COMMENT ON COLUMN end_products.entry_date IS 'Timestamp when the record was added. Defaults to current timestamp.';
COMMENT ON COLUMN end_products.added_by IS 'User or process that added this record.';
COMMENT ON COLUMN end_products.remarks IS 'Additional notes or comments about the end product.';

-- Ballistic Tests Table
DROP TABLE IF EXISTS ballistic_tests CASCADE;
CREATE TABLE ballistic_tests (
    test_id BIGSERIAL PRIMARY KEY,
    product_id BIGINT NOT NULL,
    test_standard VARCHAR(100) NOT NULL,
    test_date TIMESTAMP WITH TIME ZONE,
    testing_institution VARCHAR(200),
    test_location VARCHAR(200),
    projectile_type_full_spec VARCHAR(200) NOT NULL,
    projectile_mass_g DECIMAL(10,2),
    impact_velocity_mps DECIMAL(10,1),
    v50_mps DECIMAL(10,1),
    backing_material_type VARCHAR(100),
    backing_material_calibration_info TEXT,
    bfs_mm DECIMAL(8,2), -- Backface Signature in mm
    penetration_result VARCHAR(50) CHECK (penetration_result IN ('Complete Penetration', 'Partial Penetration', 'No Penetration', 'Perforation')),
    number_of_layers_penetrated INTEGER,
    number_of_shots INTEGER,
    shot_pattern_placement TEXT,
    angle_of_impact_degrees DECIMAL(8,1) DEFAULT 0,
    environmental_conditions_test VARCHAR(200),
    failure_analysis_observation TEXT,
    photos_videos_path TEXT, -- Could be a JSON array of paths or comma-separated
    test_report_path VARCHAR(500),
    entry_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    added_by VARCHAR(100),
    remarks TEXT,
    FOREIGN KEY (product_id) REFERENCES end_products(product_id)
);

COMMENT ON TABLE ballistic_tests IS 'Stores results of ballistic tests performed on end products.';
COMMENT ON COLUMN ballistic_tests.test_id IS 'Unique identifier for the ballistic test.';
COMMENT ON COLUMN ballistic_tests.product_id IS 'Foreign key referencing the end product tested.';
COMMENT ON COLUMN ballistic_tests.test_standard IS 'Ballistic test standard used (e.g., NIJ 0101.06, STANAG 2920).';
COMMENT ON COLUMN ballistic_tests.test_date IS 'Date when the test was conducted.';
COMMENT ON COLUMN ballistic_tests.testing_institution IS 'Institution that performed the test.';
COMMENT ON COLUMN ballistic_tests.test_location IS 'Location where the test was performed.';
COMMENT ON COLUMN ballistic_tests.projectile_type_full_spec IS 'Full specification of the projectile used (e.g., 9mm FMJ, 7.62x39mm MSC).';
COMMENT ON COLUMN ballistic_tests.projectile_mass_g IS 'Mass of the projectile in grams (g).';
COMMENT ON COLUMN ballistic_tests.impact_velocity_mps IS 'Impact velocity of the projectile in meters per second (m/s).';
COMMENT ON COLUMN ballistic_tests.v50_mps IS 'V50 ballistic limit in meters per second (m/s), if applicable.';
COMMENT ON COLUMN ballistic_tests.backing_material_type IS 'Type of backing material used (e.g., Roma Plastilina No.1).';
COMMENT ON COLUMN ballistic_tests.backing_material_calibration_info IS 'Calibration information for the backing material.';
COMMENT ON COLUMN ballistic_tests.bfs_mm IS 'Backface Signature (BFS) or trauma depth in millimeters (mm).';
COMMENT ON COLUMN ballistic_tests.penetration_result IS 'Result of the impact (e.g., Complete Penetration, No Penetration).';
COMMENT ON COLUMN ballistic_tests.number_of_layers_penetrated IS 'Number of layers penetrated (especially for soft armor).';
COMMENT ON COLUMN ballistic_tests.number_of_shots IS 'Total number of shots in the test sequence for this sample.';
COMMENT ON COLUMN ballistic_tests.shot_pattern_placement IS 'Description or diagram of shot placement.';
COMMENT ON COLUMN ballistic_tests.angle_of_impact_degrees IS 'Angle of impact in degrees (0 for normal). Defaults to 0.';
COMMENT ON COLUMN ballistic_tests.environmental_conditions_test IS 'Environmental conditions during the test (e.g., temperature, humidity).';
COMMENT ON COLUMN ballistic_tests.failure_analysis_observation IS 'Observations and analysis of the failure mode.';
COMMENT ON COLUMN ballistic_tests.photos_videos_path IS 'Filesystem paths or URLs to photos/videos of the test (can be multiple, e.g., comma-separated or JSON).';
COMMENT ON COLUMN ballistic_tests.test_report_path IS 'Path to the full test report document.';
COMMENT ON COLUMN ballistic_tests.entry_date IS 'Timestamp when the record was added. Defaults to current timestamp.';
COMMENT ON COLUMN ballistic_tests.added_by IS 'User or process that added this record.';
COMMENT ON COLUMN ballistic_tests.remarks IS 'Additional notes or comments about the ballistic test.';
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
interface EndProduct {
    product_id?: number; // BIGSERIAL output, optional for input
    product_name: string;
    manufacturer?: string;
    product_type?: string;
    protection_level_claimed?: string;
    structure_description_areal_density?: string;
    manufacturing_date?: string; // ISO 8601 date string
    entry_date?: string; // ISO 8601 date string, output
    added_by?: string;
    remarks?: string;
}

type PenetrationResult = 'Complete Penetration' | 'Partial Penetration' | 'No Penetration' | 'Perforation';

interface BallisticTest {
    test_id?: number; // BIGSERIAL output, optional for input
    product_id: number; // Foreign key
    test_standard: string;
    test_date?: string; // ISO 8601 date string
    testing_institution?: string;
    test_location?: string;
    projectile_type_full_spec: string;
    projectile_mass_g?: number;
    impact_velocity_mps?: number;
    v50_mps?: number;
    backing_material_type?: string;
    backing_material_calibration_info?: string;
    bfs_mm?: number;
    penetration_result?: PenetrationResult;
    number_of_layers_penetrated?: number;
    number_of_shots?: number;
    shot_pattern_placement?: string;
    angle_of_impact_degrees?: number;
    environmental_conditions_test?: string;
    failure_analysis_observation?: string;
    photos_videos_path?: string; // Could be JSON array of strings
    test_report_path?: string;
    entry_date?: string; // ISO 8601 date string, output
    added_by?: string;
    remarks?: string;
}

// Composite interface for an EndProduct with its ballistic tests
interface EndProductWithBallisticTests extends EndProduct {
    ballistic_tests?: BallisticTest[];
}
```

### 接口端点

#### End Product API
```
POST   /api/endProducts.create     // 创建新终端产品记录
POST   /api/endProducts.list       // 获取终端产品记录列表
POST   /api/endProducts.get        // 获取单个终端产品记录 (by product_id)
POST   /api/endProducts.update     // 更新终端产品记录
POST   /api/endProducts.delete     // 删除终端产品记录
```

#### Ballistic Test API
```
POST   /api/endProducts/{product_id}/ballisticTests.add   // 为指定产品添加防弹测试记录
POST   /api/endProducts/{product_id}/ballisticTests.list  // 获取指定产品的所有防弹测试记录
POST   /api/ballisticTests/{test_id}.get                  // 获取特定防弹测试记录详情
POST   /api/ballisticTests/{test_id}.update               // 更新特定防弹测试记录
POST   /api/ballisticTests/{test_id}.delete               // 删除特定防弹测试记录

// Endpoint to get an end product with all its ballistic tests
POST   /api/endProducts/{product_id}/details.get
```

## API 接口文档

(Following the pattern of the template, detailing request/response for key endpoints.)

### 1. 创建终端产品记录 (`/api/endProducts.create`)

```typescript
POST /api/endProducts.create

请求数据：
Omit<EndProduct, 'product_id' | 'entry_date'>

响应数据：
{
    success: boolean,
    data: EndProduct // The created product with product_id and entry_date
}
```

### 2. 获取终端产品及其所有防弹测试 (`/api/endProducts/{product_id}/details.get`)
```typescript
POST /api/endProducts/{product_id}/details.get

请求路径参数:
product_id: number

响应数据：
EndProductWithBallisticTests
```

### 3. 为指定产品添加防弹测试记录 (`/api/endProducts/{product_id}/ballisticTests.add`)
```typescript
POST /api/endProducts/{product_id}/ballisticTests.add

请求路径参数:
product_id: number

请求数据:
Omit<BallisticTest, 'product_id' | 'test_id' | 'entry_date'>

响应数据：
{
    success: boolean,
    data: BallisticTest // Includes generated test_id
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
    *   执行 `db/terminal_product_ballistic_performance.sql` 脚本创建相关表。
    *   确认外键 (`product_id` in `ballistic_tests` to `end_products` table).

2.  **后端开发 (Node.js + Express + Prisma)**
    *   更新 Prisma schema, `prisma generate`.
    *   为 `EndProduct` 实现 CRUD 接口.
    *   为 `BallisticTest` 实现 CRUD (linked to an `EndProduct`).
    *   实现 `/api/endProducts/{product_id}/details.get` to fetch product with its tests.
    *   参数验证, 错误处理, 分页, 筛选.
    *   更新/生成 API 文档.

3.  **前端开发 (Web Components + Lit Element)**
    *   开发终端产品信息管理页面/组件。
    *   开发防弹测试记录展示和编辑组件.
    *   集成到终端产品详情视图.

4.  **测试和优化**
    *   Backend & frontend tests.
    *   Performance and UX optimization.

5.  **部署**
    *   (As per template)

# 树脂及界面性能

本模块目前包含树脂的拉伸性能以及纤维/树脂界面性能。原数据库设计中提及为树脂的其他力学性能（如弯曲、压缩、冲击、硬度）以及热性能创建类似表格的占位符，这些可在未来扩展此模块时添加。

## 字段列表

### `resin_tensile_properties` (树脂拉伸性能)

-   `test_id`: 树脂拉伸测试的唯一标识符 (BIGSERIAL PRIMARY KEY)。
-   `resin_id`: 外键，关联到被测树脂 (BIGINT NOT NULL, REFERENCES resins(resin_id))。
-   `test_standard`: 测试标准 (如 ASTM D638) (VARCHAR(100))。
-   `test_date`: 测试日期 (TIMESTAMP WITH TIME ZONE)。
-   `testing_institution`: 测试机构 (VARCHAR(200))。
-   `test_equipment`: 测试设备 (VARCHAR(200))。
-   `specimen_type`: 试样类型或几何形状 (VARCHAR(100))。
-   `test_rate_mm_min`: 测试速率 (mm/min) (DECIMAL(10,2))。
-   `temperature_c`: 测试温度 (°C) (DECIMAL(8,1))。
-   `tensile_strength_mpa`: 拉伸强度 (MPa) (DECIMAL(10,2))。
-   `tensile_strength_cv_percent`: 拉伸强度变异系数 (%) (DECIMAL(8,2))。
-   `youngs_modulus_mpa`: 杨氏模量 (MPa) (DECIMAL(10,2))。
-   `youngs_modulus_cv_percent`: 杨氏模量变异系数 (%) (DECIMAL(8,2))。
-   `elongation_at_break_percent`: 断裂伸长率 (%) (DECIMAL(8,2))。
-   `elongation_at_break_cv_percent`: 断裂伸长率变异系数 (%) (DECIMAL(8,2))。
-   `result_chart_path`: 结果图表路径 (VARCHAR(500))。
-   `raw_data_path`: 原始数据路径 (VARCHAR(500))。
-   `entry_date`: 数据录入日期 (TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP)。
-   `added_by`: 数据录入人员 (VARCHAR(100))。
-   `remarks`: 备注 (TEXT)。

### `fiber_resin_interfacial_properties` (纤维/树脂界面性能)

-   `test_id`: 界面性能测试的唯一标识符 (BIGSERIAL PRIMARY KEY)。
-   `fiber_id`: 外键，关联到界面中使用的纤维 (BIGINT NOT NULL, REFERENCES fibers(fiber_id))。
-   `resin_id`: 外键，关联到界面中使用的树脂 (BIGINT NOT NULL, REFERENCES resins(resin_id))。
-   `test_standard`: 测试标准 (如 ASTM D3359 附着力) (VARCHAR(100))。
-   `test_date`: 测试日期 (TIMESTAMP WITH TIME ZONE)。
-   `testing_institution`: 测试机构 (VARCHAR(200))。
-   `test_equipment`: 测试设备 (VARCHAR(200))。
-   `test_method_detail`: 详细测试方法 (如 微滴拉脱, 单纤维拔出) (TEXT)。
-   `contact_angle_degrees`: 接触角 (°) (DECIMAL(8,2))。
-   `interfacial_shear_strength_ifss_mpa`: 界面剪切强度 (IFSS) (MPa) (DECIMAL(10,2))。
-   `bond_strength_mpa`: 粘结强度 (MPa) (DECIMAL(10,2))。
-   `failure_mode_interface`: 界面失效模式描述 (TEXT)。
-   `result_chart_path`: 结果图表路径 (VARCHAR(500))。
-   `raw_data_path`: 原始数据路径 (VARCHAR(500))。
-   `entry_date`: 数据录入日期 (TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP)。
-   `added_by`: 数据录入人员 (VARCHAR(100))。
-   `remarks`: 备注 (TEXT)。

## 数据库设计

```sql
-- PostgreSQL DDL for Resin Tensile Properties and Fiber/Resin Interfacial Properties tables

-- Resin Tensile Properties
DROP TABLE IF EXISTS resin_tensile_properties CASCADE;
CREATE TABLE resin_tensile_properties (
    test_id BIGSERIAL PRIMARY KEY,
    resin_id BIGINT NOT NULL, -- Assuming FK to a 'resins' table, e.g., resins(resin_id)
    test_standard VARCHAR(100),
    test_date TIMESTAMP WITH TIME ZONE,
    testing_institution VARCHAR(200),
    test_equipment VARCHAR(200),
    specimen_type VARCHAR(100),
    test_rate_mm_min DECIMAL(10,2),
    temperature_c DECIMAL(8,1),
    tensile_strength_mpa DECIMAL(10,2),
    tensile_strength_cv_percent DECIMAL(8,2),
    youngs_modulus_mpa DECIMAL(10,2),
    youngs_modulus_cv_percent DECIMAL(8,2),
    elongation_at_break_percent DECIMAL(8,2),
    elongation_at_break_cv_percent DECIMAL(8,2),
    result_chart_path VARCHAR(500),
    raw_data_path VARCHAR(500),
    entry_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    added_by VARCHAR(100),
    remarks TEXT,
    FOREIGN KEY (resin_id) REFERENCES resins(resin_id) -- Define based on actual resins table name and PK
);

COMMENT ON TABLE resin_tensile_properties IS 'Stores tensile mechanical properties of resins.';
COMMENT ON COLUMN resin_tensile_properties.test_id IS 'Unique identifier for the resin tensile test.';
COMMENT ON COLUMN resin_tensile_properties.resin_id IS 'Foreign key referencing the resin tested.';
COMMENT ON COLUMN resin_tensile_properties.test_standard IS 'Test standard used (e.g., ASTM D638).';
COMMENT ON COLUMN resin_tensile_properties.test_date IS 'Date of the test.';
COMMENT ON COLUMN resin_tensile_properties.testing_institution IS 'Institution performing the test.';
COMMENT ON COLUMN resin_tensile_properties.test_equipment IS 'Equipment used for the test.';
COMMENT ON COLUMN resin_tensile_properties.specimen_type IS 'Type or geometry of the test specimen.';
COMMENT ON COLUMN resin_tensile_properties.test_rate_mm_min IS 'Test rate in mm/min.';
COMMENT ON COLUMN resin_tensile_properties.temperature_c IS 'Test temperature in Celsius.';
COMMENT ON COLUMN resin_tensile_properties.tensile_strength_mpa IS 'Tensile strength in MPa.';
COMMENT ON COLUMN resin_tensile_properties.tensile_strength_cv_percent IS 'Coefficient of Variation for tensile strength (%).';
COMMENT ON COLUMN resin_tensile_properties.youngs_modulus_mpa IS 'Young''s modulus in MPa.';
COMMENT ON COLUMN resin_tensile_properties.youngs_modulus_cv_percent IS 'Coefficient of Variation for Young''s modulus (%).';
COMMENT ON COLUMN resin_tensile_properties.elongation_at_break_percent IS 'Elongation at break (%).';
COMMENT ON COLUMN resin_tensile_properties.elongation_at_break_cv_percent IS 'Coefficient of Variation for elongation at break (%).';
COMMENT ON COLUMN resin_tensile_properties.result_chart_path IS 'Path to the result chart/image.';
COMMENT ON COLUMN resin_tensile_properties.raw_data_path IS 'Path to the raw data file.';
COMMENT ON COLUMN resin_tensile_properties.entry_date IS 'Timestamp of data entry. Defaults to current timestamp.';
COMMENT ON COLUMN resin_tensile_properties.added_by IS 'User or process that added this record.';
COMMENT ON COLUMN resin_tensile_properties.remarks IS 'Additional remarks about the test. The original MS SQL script noted placeholders for other resin properties (bending, compression, impact, hardness, thermal) that could be added to this module in the future.';

-- Fiber/Resin Interfacial Properties
DROP TABLE IF EXISTS fiber_resin_interfacial_properties CASCADE;
CREATE TABLE fiber_resin_interfacial_properties (
    test_id BIGSERIAL PRIMARY KEY,
    fiber_id BIGINT NOT NULL, -- Assuming FK to a 'fibers' table, e.g., fibers(fiber_id)
    resin_id BIGINT NOT NULL, -- Assuming FK to a 'resins' table, e.g., resins(resin_id)
    test_standard VARCHAR(100),
    test_date TIMESTAMP WITH TIME ZONE,
    testing_institution VARCHAR(200),
    test_equipment VARCHAR(200),
    test_method_detail TEXT,
    contact_angle_degrees DECIMAL(8,2),
    interfacial_shear_strength_ifss_mpa DECIMAL(10,2),
    bond_strength_mpa DECIMAL(10,2),
    failure_mode_interface TEXT,
    result_chart_path VARCHAR(500),
    raw_data_path VARCHAR(500),
    entry_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    added_by VARCHAR(100),
    remarks TEXT,
    FOREIGN KEY (fiber_id) REFERENCES fibers(fiber_id), -- Define based on actual fibers table name and PK
    FOREIGN KEY (resin_id) REFERENCES resins(resin_id)   -- Define based on actual resins table name and PK
);

COMMENT ON TABLE fiber_resin_interfacial_properties IS 'Stores properties related to the interface between fibers and resins.';
COMMENT ON COLUMN fiber_resin_interfacial_properties.test_id IS 'Unique identifier for the interfacial property test.';
COMMENT ON COLUMN fiber_resin_interfacial_properties.fiber_id IS 'Foreign key referencing the fiber used in the interface.';
COMMENT ON COLUMN fiber_resin_interfacial_properties.resin_id IS 'Foreign key referencing the resin used in the interface.';
COMMENT ON COLUMN fiber_resin_interfacial_properties.test_standard IS 'Test standard used (e.g., ASTM D3359 for adhesion).';
COMMENT ON COLUMN fiber_resin_interfacial_properties.test_date IS 'Date of the test.';
COMMENT ON COLUMN fiber_resin_interfacial_properties.testing_institution IS 'Institution performing the test.';
COMMENT ON COLUMN fiber_resin_interfacial_properties.test_equipment IS 'Equipment used for the test.';
COMMENT ON COLUMN fiber_resin_interfacial_properties.test_method_detail IS 'Detailed description of the test method (e.g., micro-droplet pulloff, single fiber pull-out).';
COMMENT ON COLUMN fiber_resin_interfacial_properties.contact_angle_degrees IS 'Contact angle in degrees (°).';
COMMENT ON COLUMN fiber_resin_interfacial_properties.interfacial_shear_strength_ifss_mpa IS 'Interfacial Shear Strength (IFSS) in MPa.';
COMMENT ON COLUMN fiber_resin_interfacial_properties.bond_strength_mpa IS 'Bond strength in MPa.';
COMMENT ON COLUMN fiber_resin_interfacial_properties.failure_mode_interface IS 'Description of the failure mode at the interface.';
COMMENT ON COLUMN fiber_resin_interfacial_properties.result_chart_path IS 'Path to the result chart/image.';
COMMENT ON COLUMN fiber_resin_interfacial_properties.raw_data_path IS 'Path to the raw data file.';
COMMENT ON COLUMN fiber_resin_interfacial_properties.entry_date IS 'Timestamp of data entry. Defaults to current timestamp.';
COMMENT ON COLUMN fiber_resin_interfacial_properties.added_by IS 'User or process that added this record.';
COMMENT ON COLUMN fiber_resin_interfacial_properties.remarks IS 'Additional remarks about the test.';
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
interface BaseTestProperties {
    test_id?: number; // BIGSERIAL output, optional for input
    test_standard?: string;
    test_date?: string; // ISO 8601 date string
    testing_institution?: string;
    test_equipment?: string;
    result_chart_path?: string;
    raw_data_path?: string;
    entry_date?: string; // ISO 8601 date string, output
    added_by?: string;
    remarks?: string;
}

interface ResinTensileProperties extends BaseTestProperties {
    resin_id: number; // Foreign Key to resins table
    specimen_type?: string;
    test_rate_mm_min?: number;
    temperature_c?: number;
    tensile_strength_mpa?: number;
    tensile_strength_cv_percent?: number;
    youngs_modulus_mpa?: number;
    youngs_modulus_cv_percent?: number;
    elongation_at_break_percent?: number;
    elongation_at_break_cv_percent?: number;
}

interface FiberResinInterfacialProperties extends BaseTestProperties {
    fiber_id: number; // Foreign Key to fibers table
    resin_id: number; // Foreign Key to resins table
    test_method_detail?: string;
    contact_angle_degrees?: number;
    interfacial_shear_strength_ifss_mpa?: number;
    bond_strength_mpa?: number;
    failure_mode_interface?: string;
}
```

### 接口端点

#### Resin Tensile Properties API
```
POST   /api/resins/{resin_id}/tensileProperties.add     // 为指定树脂添加拉伸性能测试记录
POST   /api/resins/{resin_id}/tensileProperties.list    // 获取指定树脂的所有拉伸性能记录
POST   /api/resinTensileProperties/{test_id}.get        // 获取特定拉伸性能测试记录详情
POST   /api/resinTensileProperties/{test_id}.update     // 更新特定拉伸性能测试记录
POST   /api/resinTensileProperties/{test_id}.delete     // 删除特定拉伸性能测试记录
```

#### Fiber-Resin Interfacial Properties API
```
POST   /api/interfaceProperties.add                 // 添加新的界面性能测试记录 (需要 fiber_id 和 resin_id 在 payload 中)
POST   /api/interfaceProperties.listByFiber/{fiber_id} // 获取特定纤维相关的所有界面性能记录
POST   /api/interfaceProperties.listByResin/{resin_id} // 获取特定树脂相关的所有界面性能记录
POST   /api/interfaceProperties/{test_id}.get         // 获取特定界面性能测试记录详情
POST   /api/interfaceProperties/{test_id}.update      // 更新特定界面性能测试记录
POST   /api/interfaceProperties/{test_id}.delete      // 删除特定界面性能测试记录
```

## API 接口文档

(Following the pattern of the template, detailing request/response for key endpoints.)

### 1. 为指定树脂添加拉伸性能测试记录 (`/api/resins/{resin_id}/tensileProperties.add`)

```typescript
POST /api/resins/{resin_id}/tensileProperties.add

请求路径参数:
resin_id: number // ID of the resin

请求数据:
Omit<ResinTensileProperties, 'resin_id' | 'test_id' | 'entry_date'>

响应数据：
{
    success: boolean,
    data: ResinTensileProperties // Includes generated test_id and entry_date
}
```

### 2. 获取特定界面性能测试记录详情 (`/api/interfaceProperties/{test_id}.get`)
```typescript
POST /api/interfaceProperties/{test_id}.get

请求路径参数:
test_id: number

响应数据：
FiberResinInterfacialProperties
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
    *   执行 `db/resin_interface_performance.sql` 脚本创建相关表。
    *   确认外键 (`resin_id` to `resins` table, `fiber_id` to `fibers` table) 指向已存在的对应表。

2.  **后端开发 (Node.js + Express + Prisma)**
    *   更新 Prisma schema (`schema.prisma`) 加入新的树脂及界面性能模型。
    *   运行 `prisma generate`。
    *   为 `ResinTensileProperties` 和 `FiberResinInterfacialProperties` 实现各自的 CRUD 接口。
    *   考虑如何关联到 `Resins` 和 `Fibers` 模块 (e.g., when fetching a resin, optionally include its tensile properties).
    *   参数验证、错误处理、分页、筛选。
    *   更新/生成 API 文档.

3.  **前端开发 (Web Components + Lit Element)**
    *   开发用于展示和编辑树脂拉伸性能和纤维/树脂界面性能的组件。
    *   这些可能作为独立的数据录入模块，或者集成到树脂信息/纤维信息详情页中。
    *   实现数据提交和展示逻辑。

4.  **测试和优化**
    *   单元测试和集成测试 for backend.
    *   前端组件测试.
    *   性能和用户体验优化.

5.  **部署**
    *   (As per template)

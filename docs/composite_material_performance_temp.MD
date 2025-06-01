# 复合材料结构与性能

本模块目前包含复合材料的基本信息及其拉伸性能。原数据库设计中提及为复合材料的其他性能（如压缩、弯曲、层间剪切ILSS、高应变率等）创建类似表格的占位符，这些可在未来扩展此模块时添加。

## 字段列表

### `composites` (复合材料基本信息)

-   `composite_id`: 复合材料批次/样品的唯一标识符 (BIGSERIAL PRIMARY KEY)。
-   `composite_name`: 复合材料名称或标识符 (VARCHAR(200) NOT NULL)。
-   `fiber_id`: 外键，关联到复合材料中使用的纤维 (BIGINT, REFERENCES fibers(fiber_id))。
-   `resin_id`: 外键，关联到复合材料中使用的树脂 (BIGINT, REFERENCES resins(resin_id))。
-   `fiber_content_volume_percent`: 复合材料中纤维的体积百分比 (%) (DECIMAL(8,2))。
-   `fiber_content_weight_percent`: 复合材料中纤维的重量百分比 (%) (DECIMAL(8,2))。
-   `reinforcement_structure`: 增强结构类型 (如 UD, 机织物类型) (VARCHAR(100))。
-   `manufacturing_process_detail`: 制造工艺详细描述 (TEXT)。
-   `curing_cycle_hot_pressing_params`: 固化或热压工艺参数 (如温度、压力、时间曲线) (TEXT)。
-   `layup_sequence`: 铺层顺序 (如 [0/90/0/90]) (VARCHAR(200))。
-   `number_of_layers`: 总层数 (INTEGER)。
-   `thickness_mm`: 复合材料总厚度 (mm) (DECIMAL(10,3))。
-   `areal_density_gsm`: 面密度 (gsm - 克/平方米) (DECIMAL(10,2))。
-   `porosity_percent`: 复合材料孔隙率 (%) (DECIMAL(8,2))。
-   `entry_date`: 记录添加日期 (TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP)。
-   `added_by`: 数据录入人员 (VARCHAR(100))。
-   `remarks`: 备注。原始MS SQL脚本提及为其他复合材料属性（压缩、弯曲、ILSS、高应变率）创建表格的占位符，未来可在此基础上扩展 (TEXT)。

### `composite_tensile_properties` (复合材料拉伸性能)

-   `test_id`: 复合材料拉伸测试的唯一标识符 (BIGSERIAL PRIMARY KEY)。
-   `composite_id`: 外键，关联到被测复合材料 (BIGINT NOT NULL, REFERENCES composites(composite_id))。
-   `test_standard`: 测试标准 (如 ASTM D3039) (VARCHAR(100))。
-   `test_date`: 测试日期 (TIMESTAMP WITH TIME ZONE)。
-   `testing_institution`: 测试机构 (VARCHAR(200))。
-   `test_equipment`: 测试设备 (VARCHAR(200))。
-   `specimen_geometry_dimensions`: 试样几何形状与尺寸 (VARCHAR(200))。
-   `loading_direction`: 加载方向 (相对于材料方向，如 0°, 90°, Warp, Weft) (VARCHAR(50))。
-   `test_rate_mm_min`: 测试速率 (mm/min) (DECIMAL(10,2))。
-   `temperature_c`: 测试温度 (°C) (DECIMAL(8,1))。
-   `tensile_strength_mpa`: 拉伸强度 (MPa) (DECIMAL(10,2))。
-   `tensile_strength_cv_percent`: 拉伸强度变异系数 (%) (DECIMAL(8,2))。
-   `tensile_modulus_gpa`: 拉伸模量 (GPa) (DECIMAL(10,2))。
-   `tensile_modulus_cv_percent`: 拉伸模量变异系数 (%) (DECIMAL(8,2))。
-   `poisson_ratio`: 泊松比 (DECIMAL(8,3))。
-   `elongation_at_break_percent`: 断裂伸长率 (%) (DECIMAL(8,2))。
-   `elongation_at_break_cv_percent`: 断裂伸长率变异系数 (%) (DECIMAL(8,2))。
-   `stress_strain_curve_data_json`: 应力-应变曲线数据 (JSON格式) (TEXT)。
-   `failure_mode_composite_tensile`: 拉伸测试中的失效模式描述 (TEXT)。
-   `result_chart_path`: 结果图表路径 (VARCHAR(500))。
-   `raw_data_path`: 原始数据路径 (VARCHAR(500))。
-   `entry_date`: 数据录入日期 (TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP)。
-   `added_by`: 数据录入人员 (VARCHAR(100))。
-   `remarks`: 备注 (TEXT)。

## 数据库设计

```sql
-- PostgreSQL DDL for Composite Material and its Tensile Properties tables

-- Composites Table (Basic Information)
DROP TABLE IF EXISTS composites CASCADE;
CREATE TABLE composites (
    composite_id BIGSERIAL PRIMARY KEY,
    composite_name VARCHAR(200) NOT NULL,
    fiber_id BIGINT, -- Assuming FK to fibers(fiber_id)
    resin_id BIGINT, -- Assuming FK to resins(resin_id)
    fiber_content_volume_percent DECIMAL(8,2),
    fiber_content_weight_percent DECIMAL(8,2),
    reinforcement_structure VARCHAR(100),
    manufacturing_process_detail TEXT,
    curing_cycle_hot_pressing_params TEXT,
    layup_sequence VARCHAR(200),
    number_of_layers INTEGER,
    thickness_mm DECIMAL(10,3),
    areal_density_gsm DECIMAL(10,2),
    porosity_percent DECIMAL(8,2),
    entry_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    added_by VARCHAR(100),
    remarks TEXT,
    FOREIGN KEY (fiber_id) REFERENCES fibers(fiber_id),
    FOREIGN KEY (resin_id) REFERENCES resins(resin_id)
);

COMMENT ON TABLE composites IS 'Stores basic information about composite materials.';
COMMENT ON COLUMN composites.composite_id IS 'Unique identifier for the composite material batch/sample.';
COMMENT ON COLUMN composites.composite_name IS 'Name or identifier for the composite material.';
COMMENT ON COLUMN composites.fiber_id IS 'Foreign key referencing the fiber used in the composite.';
COMMENT ON COLUMN composites.resin_id IS 'Foreign key referencing the resin used in the composite.';
COMMENT ON COLUMN composites.fiber_content_volume_percent IS 'Volume percentage of fiber in the composite (%).';
COMMENT ON COLUMN composites.fiber_content_weight_percent IS 'Weight percentage of fiber in the composite (%).';
COMMENT ON COLUMN composites.reinforcement_structure IS 'Type of reinforcement structure (e.g., UD, Woven fabric type).';
COMMENT ON COLUMN composites.manufacturing_process_detail IS 'Detailed description of the manufacturing process.';
COMMENT ON COLUMN composites.curing_cycle_hot_pressing_params IS 'Parameters for curing or hot pressing (e.g., temperature, pressure, time curve).';
COMMENT ON COLUMN composites.layup_sequence IS 'Layup sequence of plies (e.g., [0/90/0/90]).';
COMMENT ON COLUMN composites.number_of_layers IS 'Total number of layers in the composite.';
COMMENT ON COLUMN composites.thickness_mm IS 'Overall thickness of the composite in millimeters (mm).';
COMMENT ON COLUMN composites.areal_density_gsm IS 'Areal density in grams per square meter (gsm).';
COMMENT ON COLUMN composites.porosity_percent IS 'Porosity percentage of the composite (%).';
COMMENT ON COLUMN composites.entry_date IS 'Timestamp when the record was added. Defaults to current timestamp.';
COMMENT ON COLUMN composites.added_by IS 'User or process that added this record.';
COMMENT ON COLUMN composites.remarks IS 'Additional notes or comments. Original MS SQL script mentioned placeholders for other composite properties tables (compression, bending, ILSS, high strain rate) that could be added later.';

-- Composite Tensile Properties
DROP TABLE IF EXISTS composite_tensile_properties CASCADE;
CREATE TABLE composite_tensile_properties (
    test_id BIGSERIAL PRIMARY KEY,
    composite_id BIGINT NOT NULL,
    test_standard VARCHAR(100),
    test_date TIMESTAMP WITH TIME ZONE,
    testing_institution VARCHAR(200),
    test_equipment VARCHAR(200),
    specimen_geometry_dimensions VARCHAR(200),
    loading_direction VARCHAR(50),
    test_rate_mm_min DECIMAL(10,2),
    temperature_c DECIMAL(8,1),
    tensile_strength_mpa DECIMAL(10,2),
    tensile_strength_cv_percent DECIMAL(8,2),
    tensile_modulus_gpa DECIMAL(10,2),
    tensile_modulus_cv_percent DECIMAL(8,2),
    poisson_ratio DECIMAL(8,3),
    elongation_at_break_percent DECIMAL(8,2),
    elongation_at_break_cv_percent DECIMAL(8,2),
    stress_strain_curve_data_json TEXT,
    failure_mode_composite_tensile TEXT,
    result_chart_path VARCHAR(500),
    raw_data_path VARCHAR(500),
    entry_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    added_by VARCHAR(100),
    remarks TEXT,
    FOREIGN KEY (composite_id) REFERENCES composites(composite_id)
);

COMMENT ON TABLE composite_tensile_properties IS 'Stores tensile mechanical properties of composite materials.';
COMMENT ON COLUMN composite_tensile_properties.test_id IS 'Unique identifier for the composite tensile test.';
COMMENT ON COLUMN composite_tensile_properties.composite_id IS 'Foreign key referencing the composite material tested.';
COMMENT ON COLUMN composite_tensile_properties.test_standard IS 'Test standard used (e.g., ASTM D3039).';
COMMENT ON COLUMN composite_tensile_properties.test_date IS 'Date of the test.';
COMMENT ON COLUMN composite_tensile_properties.testing_institution IS 'Institution performing the test.';
COMMENT ON COLUMN composite_tensile_properties.test_equipment IS 'Equipment used for the test.';
COMMENT ON COLUMN composite_tensile_properties.specimen_geometry_dimensions IS 'Geometry and dimensions of the test specimen.';
COMMENT ON COLUMN composite_tensile_properties.loading_direction IS 'Direction of loading relative to material orientation (e.g., 0°, 90°, Warp, Weft).';
COMMENT ON COLUMN composite_tensile_properties.test_rate_mm_min IS 'Test rate in mm/min.';
COMMENT ON COLUMN composite_tensile_properties.temperature_c IS 'Test temperature in Celsius.';
COMMENT ON COLUMN composite_tensile_properties.tensile_strength_mpa IS 'Tensile strength in MPa.';
COMMENT ON COLUMN composite_tensile_properties.tensile_strength_cv_percent IS 'Coefficient of Variation for tensile strength (%).';
COMMENT ON COLUMN composite_tensile_properties.tensile_modulus_gpa IS 'Tensile modulus in GPa.';
COMMENT ON COLUMN composite_tensile_properties.tensile_modulus_cv_percent IS 'Coefficient of Variation for tensile modulus (%).';
COMMENT ON COLUMN composite_tensile_properties.poisson_ratio IS 'Poisson''s ratio.';
COMMENT ON COLUMN composite_tensile_properties.elongation_at_break_percent IS 'Elongation at break (%).';
COMMENT ON COLUMN composite_tensile_properties.elongation_at_break_cv_percent IS 'Coefficient of Variation for elongation at break (%).';
COMMENT ON COLUMN composite_tensile_properties.stress_strain_curve_data_json IS 'Stress-strain curve data in JSON format.';
COMMENT ON COLUMN composite_tensile_properties.failure_mode_composite_tensile IS 'Description of the failure mode observed during tensile testing.';
COMMENT ON COLUMN composite_tensile_properties.result_chart_path IS 'Path to the result chart/image.';
COMMENT ON COLUMN composite_tensile_properties.raw_data_path IS 'Path to the raw data file.';
COMMENT ON COLUMN composite_tensile_properties.entry_date IS 'Timestamp of data entry. Defaults to current timestamp.';
COMMENT ON COLUMN composite_tensile_properties.added_by IS 'User or process that added this record.';
COMMENT ON COLUMN composite_tensile_properties.remarks IS 'Additional remarks about the test.';
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
interface Composite {
    composite_id?: number; // BIGSERIAL output, optional for input
    composite_name: string;
    fiber_id?: number;
    resin_id?: number;
    fiber_content_volume_percent?: number;
    fiber_content_weight_percent?: number;
    reinforcement_structure?: string;
    manufacturing_process_detail?: string;
    curing_cycle_hot_pressing_params?: string;
    layup_sequence?: string;
    number_of_layers?: number;
    thickness_mm?: number;
    areal_density_gsm?: number;
    porosity_percent?: number;
    entry_date?: string; // ISO 8601 date string, output
    added_by?: string;
    remarks?: string;
}

interface CompositeTensileProperties {
    test_id?: number; // BIGSERIAL output, optional for input
    composite_id: number; // Foreign key
    test_standard?: string;
    test_date?: string; // ISO 8601 date string
    testing_institution?: string;
    test_equipment?: string;
    specimen_geometry_dimensions?: string;
    loading_direction?: string;
    test_rate_mm_min?: number;
    temperature_c?: number;
    tensile_strength_mpa?: number;
    tensile_strength_cv_percent?: number;
    tensile_modulus_gpa?: number;
    tensile_modulus_cv_percent?: number;
    poisson_ratio?: number;
    elongation_at_break_percent?: number;
    elongation_at_break_cv_percent?: number;
    stress_strain_curve_data_json?: string; // JSON string
    failure_mode_composite_tensile?: string;
    result_chart_path?: string;
    raw_data_path?: string;
    entry_date?: string; // ISO 8601 date string, output
    added_by?: string;
    remarks?: string;
}

// Composite interface for a Composite with its tensile properties
interface CompositeWithTensileProperties extends Composite {
    tensile_properties?: CompositeTensileProperties[];
}
```

### 接口端点

#### Composite Base Information API
```
POST   /api/composites.create     // 创建新复合材料记录
POST   /api/composites.list       // 获取复合材料记录列表
POST   /api/composites.get        // 获取单个复合材料记录 (by composite_id)
POST   /api/composites.update     // 更新复合材料记录
POST   /api/composites.delete     // 删除复合材料记录
```

#### Composite Tensile Properties API
```
POST   /api/composites/{composite_id}/tensileProperties.add   // 为指定复合材料添加拉伸性能记录
POST   /api/composites/{composite_id}/tensileProperties.list  // 获取指定复合材料的所有拉伸性能记录
POST   /api/compositeTensileProperties/{test_id}.get          // 获取特定拉伸性能测试记录详情
POST   /api/compositeTensileProperties/{test_id}.update       // 更新特定拉伸性能测试记录
POST   /api/compositeTensileProperties/{test_id}.delete       // 删除特定拉伸性能测试记录

// Endpoint to get a composite with all its tensile properties
POST   /api/composites/{composite_id}/details.get
```

## API 接口文档

(Following the pattern of the template, detailing request/response for key endpoints.)

### 1. 创建复合材料记录 (`/api/composites.create`)

```typescript
POST /api/composites.create

请求数据：
Omit<Composite, 'composite_id' | 'entry_date'>

响应数据：
{
    success: boolean,
    data: Composite // The created composite with composite_id and entry_date
}
```

### 2. 获取复合材料及其拉伸性能列表 (`/api/composites/{composite_id}/details.get`)
```typescript
POST /api/composites/{composite_id}/details.get

请求路径参数:
composite_id: number

响应数据：
CompositeWithTensileProperties
```

### 3. 为指定复合材料添加拉伸性能记录 (`/api/composites/{composite_id}/tensileProperties.add`)
```typescript
POST /api/composites/{composite_id}/tensileProperties.add

请求路径参数:
composite_id: number

请求数据:
Omit<CompositeTensileProperties, 'composite_id' | 'test_id' | 'entry_date'>

响应数据：
{
    success: boolean,
    data: CompositeTensileProperties // Includes generated test_id
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
    *   执行 `db/composite_material_performance.sql` 脚本创建相关表。
    *   确认外键 (`fiber_id`, `resin_id` to respective tables).

2.  **后端开发 (Node.js + Express + Prisma)**
    *   更新 Prisma schema, `prisma generate`.
    *   为 `Composite` 实现 CRUD 接口.
    *   为 `CompositeTensileProperties` 实现 CRUD (linked to a `Composite`).
    *   实现 `/api/composites/{composite_id}/details.get` to fetch composite with its tensile data.
    *   参数验证, 错误处理, 分页, 筛选.
    *   更新/生成 API 文档.

3.  **前端开发 (Web Components + Lit Element)**
    *   开发复合材料信息管理页面/组件。
    *   开发复合材料拉伸性能展示和编辑组件.
    *   集成到复合材料详情视图.

4.  **测试和优化**
    *   Backend & frontend tests.
    *   Performance and UX optimization.

5.  **部署**
    *   (As per template)

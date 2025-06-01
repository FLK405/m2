# 微观结构特征

## 字段列表

### `fiber_microstructure_phase_structure` (纤维微观结构 - 相结构 NMR/Raman)

-   `test_id`: 相结构测试的唯一标识符 (BIGSERIAL PRIMARY KEY)。
-   `fiber_id`: 外键，关联到被测纤维 (BIGINT NOT NULL, REFERENCES fibers(fiber_id))。
-   `test_method`: 测试方法 (如 'NMR', 'Raman') (VARCHAR(50) NOT NULL)。
-   `test_date`: 测试日期 (TIMESTAMP WITH TIME ZONE)。
-   `testing_institution`: 测试机构 (VARCHAR(200))。
-   `test_equipment`: 测试设备 (VARCHAR(200))。
-   `amorphous_phase_percent_nmr`: 无定形区占比 (%) (NMR) (DECIMAL(8,2))。
-   `intermediate_phase_percent_nmr`: 中间相占比 (%) (NMR) (DECIMAL(8,2))。
-   `crystalline_phase_percent_nmr`: 晶相占比 (%) (NMR) (DECIMAL(8,2))。
-   `defective_crystalline_percent_nmr`: 残缺晶相占比 (%) (NMR) (DECIMAL(8,2))。
-   `crystallinity_percent_raman`: 结晶度 (%) (Raman) (DECIMAL(8,2))。
-   `characteristic_peaks_raman`: 拉曼特征峰信息 (TEXT)。
-   `result_chart_path`: 结果图表路径 (VARCHAR(500))。
-   `raw_data_path`: 原始数据路径 (VARCHAR(500))。
-   `entry_date`: 数据录入日期 (TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP)。
-   `added_by`: 数据录入人员 (VARCHAR(100))。
-   `remarks`: 备注 (TEXT)。

### `fiber_microstructure_orientation_crystallinity` (纤维微观结构 - 取向与晶体结构 WAXD/声速模量)

-   `test_id`: 取向与晶体结构测试的唯一标识符 (BIGSERIAL PRIMARY KEY)。
-   `fiber_id`: 外键，关联到被测纤维 (BIGINT NOT NULL, REFERENCES fibers(fiber_id))。
-   `test_method`: 测试方法 (如 'WAXD', 'SAXS', 'SonicModulus') (VARCHAR(50) NOT NULL)。
-   `test_date`: 测试日期 (TIMESTAMP WITH TIME ZONE)。
-   `testing_institution`: 测试机构 (VARCHAR(200))。
-   `test_equipment`: 测试设备 (VARCHAR(200))。
-   `crystal_size_nm_waxd`: 晶粒尺寸 (nm) (WAXD) (DECIMAL(10,2))。
-   `orientation_factor_waxd`: 取向因子 (WAXD) (DECIMAL(8,3))。
-   `d_spacing_waxd`: 晶面间距 (WAXD) (TEXT)。
-   `sound_velocity_mps`: 声速 (m/s) (声速法) (DECIMAL(10,1))。
-   `orientation_factor_sonic`: 取向因子 (声速法) (DECIMAL(8,3))。
-   `modulus_sonic_gpa`: 模量 (GPa) (声速法) (DECIMAL(10,2))。
-   `result_chart_path`: 结果图表路径 (如衍射图谱, 声速数据图) (VARCHAR(500))。
-   `raw_data_path`: 原始数据路径 (VARCHAR(500))。
-   `entry_date`: 数据录入日期 (TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP)。
-   `added_by`: 数据录入人员 (VARCHAR(100))。
-   `remarks`: 备注 (TEXT)。

### `fiber_microstructure_sem` (纤维微观结构 - SEM)

-   `id`: SEM 图像记录的唯一标识符 (BIGSERIAL PRIMARY KEY)。
-   `fiber_id`: 外键，关联到被测纤维 (BIGINT NOT NULL, REFERENCES fibers(fiber_id))。
-   `test_date`: SEM 分析日期 (TIMESTAMP WITH TIME ZONE)。
-   `testing_institution`: SEM 分析机构 (VARCHAR(200))。
-   `test_equipment`: SEM 设备 (VARCHAR(200))。
-   `sample_name_sem`: SEM 试样名称 (VARCHAR(100))。
-   `magnification`: 放大倍数 (VARCHAR(50))。
-   `accelerating_voltage_kv`: 加速电压 (kV) (DECIMAL(8,1))。
-   `image_path`: SEM 图像文件路径 (VARCHAR(500) NOT NULL)。
-   `morphology_description_special_features`: 形貌特征描述 (TEXT)。
-   `analysis_results`: 图像分析结果 (如EDS) (TEXT)。
-   `entry_date`: 数据录入日期 (TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP)。
-   `added_by`: 数据录入人员 (VARCHAR(100))。
-   `remarks`: 备注 (TEXT)。

### `fiber_microstructure_xps` (纤维微观结构 - XPS)

-   `test_id`: XPS 测试的唯一标识符 (BIGSERIAL PRIMARY KEY)。
-   `fiber_id`: 外键，关联到被测纤维 (BIGINT NOT NULL, REFERENCES fibers(fiber_id))。
-   `test_date`: XPS 分析日期 (TIMESTAMP WITH TIME ZONE)。
-   `testing_institution`: XPS 分析机构 (VARCHAR(200))。
-   `test_equipment`: XPS 设备 (VARCHAR(200))。
-   `carbon_at_percent`: 碳原子百分比 (%) (DECIMAL(8,2))。
-   `oxygen_at_percent`: 氧原子百分比 (%) (DECIMAL(8,2))。
-   `nitrogen_at_percent`: 氮原子百分比 (%) (DECIMAL(8,2))。
-   `other_elements_xps`: 其他元素含量 (TEXT)。
-   `chemical_state_info_xps`: 化学态信息 (TEXT)。
-   `result_chart_path`: XPS谱图路径 (VARCHAR(500))。
-   `raw_data_path`: 原始数据路径 (VARCHAR(500))。
-   `entry_date`: 数据录入日期 (TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP)。
-   `added_by`: 数据录入人员 (VARCHAR(100))。
-   `remarks`: 备注 (TEXT)。

## 数据库设计

```sql
-- PostgreSQL DDL for Fiber Microstructure Characteristics tables

-- Fiber Microstructure - Phase Structure (NMR/Raman)
DROP TABLE IF EXISTS fiber_microstructure_phase_structure CASCADE;
CREATE TABLE fiber_microstructure_phase_structure (
    test_id BIGSERIAL PRIMARY KEY,
    fiber_id BIGINT NOT NULL,
    test_method VARCHAR(50) NOT NULL, -- 'NMR' or 'Raman'
    test_date TIMESTAMP WITH TIME ZONE,
    testing_institution VARCHAR(200),
    test_equipment VARCHAR(200),
    -- NMR Specific
    amorphous_phase_percent_nmr DECIMAL(8,2),
    intermediate_phase_percent_nmr DECIMAL(8,2),
    crystalline_phase_percent_nmr DECIMAL(8,2),
    defective_crystalline_percent_nmr DECIMAL(8,2),
    -- Raman Specific
    crystallinity_percent_raman DECIMAL(8,2),
    characteristic_peaks_raman TEXT,
    result_chart_path VARCHAR(500),
    raw_data_path VARCHAR(500),
    entry_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    added_by VARCHAR(100),
    remarks TEXT,
    FOREIGN KEY (fiber_id) REFERENCES fibers(fiber_id)
);

COMMENT ON TABLE fiber_microstructure_phase_structure IS 'Stores fiber phase structure data from NMR or Raman spectroscopy.';
COMMENT ON COLUMN fiber_microstructure_phase_structure.test_id IS 'Unique identifier for the phase structure test.';
COMMENT ON COLUMN fiber_microstructure_phase_structure.fiber_id IS 'Foreign key referencing the fiber tested.';
COMMENT ON COLUMN fiber_microstructure_phase_structure.test_method IS 'Testing methodology used, e.g., ''NMR'', ''Raman''.';
COMMENT ON COLUMN fiber_microstructure_phase_structure.test_date IS 'Date when the test was conducted.';
COMMENT ON COLUMN fiber_microstructure_phase_structure.testing_institution IS 'Institution that performed the test.';
COMMENT ON COLUMN fiber_microstructure_phase_structure.test_equipment IS 'Equipment used for the test.';
COMMENT ON COLUMN fiber_microstructure_phase_structure.amorphous_phase_percent_nmr IS 'Percentage of amorphous phase (NMR).';
COMMENT ON COLUMN fiber_microstructure_phase_structure.intermediate_phase_percent_nmr IS 'Percentage of intermediate phase (NMR).';
COMMENT ON COLUMN fiber_microstructure_phase_structure.crystalline_phase_percent_nmr IS 'Percentage of crystalline phase (NMR).';
COMMENT ON COLUMN fiber_microstructure_phase_structure.defective_crystalline_percent_nmr IS 'Percentage of defective crystalline phase (NMR).';
COMMENT ON COLUMN fiber_microstructure_phase_structure.crystallinity_percent_raman IS 'Crystallinity percentage (Raman).';
COMMENT ON COLUMN fiber_microstructure_phase_structure.characteristic_peaks_raman IS 'Characteristic Raman peak information.';
COMMENT ON COLUMN fiber_microstructure_phase_structure.result_chart_path IS 'Path to the result chart/image.';
COMMENT ON COLUMN fiber_microstructure_phase_structure.raw_data_path IS 'Path to the raw data file.';
COMMENT ON COLUMN fiber_microstructure_phase_structure.entry_date IS 'Timestamp of data entry.';
COMMENT ON COLUMN fiber_microstructure_phase_structure.added_by IS 'User who added the data.';
COMMENT ON COLUMN fiber_microstructure_phase_structure.remarks IS 'Additional remarks about the test.';

-- Fiber Microstructure - Orientation and Crystallinity (WAXD/Sonic Modulus)
DROP TABLE IF EXISTS fiber_microstructure_orientation_crystallinity CASCADE;
CREATE TABLE fiber_microstructure_orientation_crystallinity (
    test_id BIGSERIAL PRIMARY KEY,
    fiber_id BIGINT NOT NULL,
    test_method VARCHAR(50) NOT NULL, -- 'WAXD', 'SAXS', 'SonicModulus'
    test_date TIMESTAMP WITH TIME ZONE,
    testing_institution VARCHAR(200),
    test_equipment VARCHAR(200),
    -- WAXD/SAXS Specific
    crystal_size_nm_waxd DECIMAL(10,2),
    orientation_factor_waxd DECIMAL(8,3),
    d_spacing_waxd TEXT,
    -- Sonic Modulus Specific
    sound_velocity_mps DECIMAL(10,1),
    orientation_factor_sonic DECIMAL(8,3),
    modulus_sonic_gpa DECIMAL(10,2),
    result_chart_path VARCHAR(500),
    raw_data_path VARCHAR(500),
    entry_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    added_by VARCHAR(100),
    remarks TEXT,
    FOREIGN KEY (fiber_id) REFERENCES fibers(fiber_id)
);

COMMENT ON TABLE fiber_microstructure_orientation_crystallinity IS 'Stores fiber orientation and crystallinity data from WAXD, SAXS, or Sonic Modulus methods.';
COMMENT ON COLUMN fiber_microstructure_orientation_crystallinity.test_id IS 'Unique identifier for the orientation/crystallinity test.';
COMMENT ON COLUMN fiber_microstructure_orientation_crystallinity.fiber_id IS 'Foreign key referencing the fiber tested.';
COMMENT ON COLUMN fiber_microstructure_orientation_crystallinity.test_method IS 'Testing methodology, e.g., ''WAXD'', ''SAXS'', ''SonicModulus''.';
COMMENT ON COLUMN fiber_microstructure_orientation_crystallinity.test_date IS 'Date when the test was conducted.';
COMMENT ON COLUMN fiber_microstructure_orientation_crystallinity.testing_institution IS 'Institution that performed the test.';
COMMENT ON COLUMN fiber_microstructure_orientation_crystallinity.test_equipment IS 'Equipment used for the test.';
COMMENT ON COLUMN fiber_microstructure_orientation_crystallinity.crystal_size_nm_waxd IS 'Crystal size in nanometers (WAXD).';
COMMENT ON COLUMN fiber_microstructure_orientation_crystallinity.orientation_factor_waxd IS 'Orientation factor (WAXD).';
COMMENT ON COLUMN fiber_microstructure_orientation_crystallinity.d_spacing_waxd IS 'd-spacing information from WAXD (can be text for multiple values).';
COMMENT ON COLUMN fiber_microstructure_orientation_crystallinity.sound_velocity_mps IS 'Sound velocity in m/s (Sonic Modulus).';
COMMENT ON COLUMN fiber_microstructure_orientation_crystallinity.orientation_factor_sonic IS 'Orientation factor (Sonic Modulus method).';
COMMENT ON COLUMN fiber_microstructure_orientation_crystallinity.modulus_sonic_gpa IS 'Modulus derived from sonic velocity in GPa.';
COMMENT ON COLUMN fiber_microstructure_orientation_crystallinity.result_chart_path IS 'Path to results (e.g., diffraction pattern, sonic data graph).';
COMMENT ON COLUMN fiber_microstructure_orientation_crystallinity.raw_data_path IS 'Path to the raw data file.';
COMMENT ON COLUMN fiber_microstructure_orientation_crystallinity.entry_date IS 'Timestamp of data entry.';
COMMENT ON COLUMN fiber_microstructure_orientation_crystallinity.added_by IS 'User who added the data.';
COMMENT ON COLUMN fiber_microstructure_orientation_crystallinity.remarks IS 'Additional remarks about the test.';

-- Fiber Microstructure - SEM
DROP TABLE IF EXISTS fiber_microstructure_sem CASCADE;
CREATE TABLE fiber_microstructure_sem (
    id BIGSERIAL PRIMARY KEY, -- Changed from ImageID to id, BIGINT IDENTITY to BIGSERIAL
    fiber_id BIGINT NOT NULL,
    test_date TIMESTAMP WITH TIME ZONE,
    testing_institution VARCHAR(200),
    test_equipment VARCHAR(200),
    sample_name_sem VARCHAR(100),
    magnification VARCHAR(50),
    accelerating_voltage_kv DECIMAL(8,1),
    image_path VARCHAR(500) NOT NULL,
    morphology_description_special_features TEXT,
    analysis_results TEXT,
    entry_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    added_by VARCHAR(100),
    remarks TEXT,
    FOREIGN KEY (fiber_id) REFERENCES fibers(fiber_id)
);

COMMENT ON TABLE fiber_microstructure_sem IS 'Stores fiber SEM image information and analysis.';
COMMENT ON COLUMN fiber_microstructure_sem.id IS 'Unique identifier for the SEM image record.';
COMMENT ON COLUMN fiber_microstructure_sem.fiber_id IS 'Foreign key referencing the fiber imaged.';
COMMENT ON COLUMN fiber_microstructure_sem.test_date IS 'Date when the SEM analysis was performed.';
COMMENT ON COLUMN fiber_microstructure_sem.testing_institution IS 'Institution that performed the SEM analysis.';
COMMENT ON COLUMN fiber_microstructure_sem.test_equipment IS 'SEM equipment used.';
COMMENT ON COLUMN fiber_microstructure_sem.sample_name_sem IS 'Name or identifier for the SEM sample.';
COMMENT ON COLUMN fiber_microstructure_sem.magnification IS 'Magnification level (e.g., ''5000x'').';
COMMENT ON COLUMN fiber_microstructure_sem.accelerating_voltage_kv IS 'Accelerating voltage in kV.';
COMMENT ON COLUMN fiber_microstructure_sem.image_path IS 'Path to the SEM image file. Cannot be null.';
COMMENT ON COLUMN fiber_microstructure_sem.morphology_description_special_features IS 'Description of morphology and any special features observed.';
COMMENT ON COLUMN fiber_microstructure_sem.analysis_results IS 'Results from any analysis performed on the SEM image (e.g., EDS).';
COMMENT ON COLUMN fiber_microstructure_sem.entry_date IS 'Timestamp of data entry.';
COMMENT ON COLUMN fiber_microstructure_sem.added_by IS 'User who added the data.';
COMMENT ON COLUMN fiber_microstructure_sem.remarks IS 'Additional remarks about the SEM image or analysis.';

-- Fiber Microstructure - XPS
DROP TABLE IF EXISTS fiber_microstructure_xps CASCADE;
CREATE TABLE fiber_microstructure_xps (
    test_id BIGSERIAL PRIMARY KEY,
    fiber_id BIGINT NOT NULL,
    test_date TIMESTAMP WITH TIME ZONE,
    testing_institution VARCHAR(200),
    test_equipment VARCHAR(200),
    carbon_at_percent DECIMAL(8,2),
    oxygen_at_percent DECIMAL(8,2),
    nitrogen_at_percent DECIMAL(8,2),
    other_elements_xps TEXT,
    chemical_state_info_xps TEXT,
    result_chart_path VARCHAR(500),
    raw_data_path VARCHAR(500),
    entry_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    added_by VARCHAR(100),
    remarks TEXT,
    FOREIGN KEY (fiber_id) REFERENCES fibers(fiber_id)
);

COMMENT ON TABLE fiber_microstructure_xps IS 'Stores fiber XPS surface analysis data.';
COMMENT ON COLUMN fiber_microstructure_xps.test_id IS 'Unique identifier for the XPS test.';
COMMENT ON COLUMN fiber_microstructure_xps.fiber_id IS 'Foreign key referencing the fiber tested.';
COMMENT ON COLUMN fiber_microstructure_xps.test_date IS 'Date when the XPS analysis was performed.';
COMMENT ON COLUMN fiber_microstructure_xps.testing_institution IS 'Institution that performed the XPS analysis.';
COMMENT ON COLUMN fiber_microstructure_xps.test_equipment IS 'XPS equipment used.';
COMMENT ON COLUMN fiber_microstructure_xps.carbon_at_percent IS 'Atomic percentage of Carbon (C).';
COMMENT ON COLUMN fiber_microstructure_xps.oxygen_at_percent IS 'Atomic percentage of Oxygen (O).';
COMMENT ON COLUMN fiber_microstructure_xps.nitrogen_at_percent IS 'Atomic percentage of Nitrogen (N).';
COMMENT ON COLUMN fiber_microstructure_xps.other_elements_xps IS 'Atomic percentages of other detected elements (e.g., JSON or text).';
COMMENT ON COLUMN fiber_microstructure_xps.chemical_state_info_xps IS 'Information on chemical states of elements.';
COMMENT ON COLUMN fiber_microstructure_xps.result_chart_path IS 'Path to the XPS spectra chart/image.';
COMMENT ON COLUMN fiber_microstructure_xps.raw_data_path IS 'Path to the raw data file.';
COMMENT ON COLUMN fiber_microstructure_xps.entry_date IS 'Timestamp of data entry.';
COMMENT ON COLUMN fiber_microstructure_xps.added_by IS 'User who added the data.';
COMMENT ON COLUMN fiber_microstructure_xps.remarks IS 'Additional remarks about the XPS analysis.';
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
// Base for microstructure test data
interface MicrostructureTestData {
    test_id?: number; // Or 'id' for SEM table; BIGSERIAL output, optional input
    fiber_id: number; // Foreign Key to Fiber
    test_date?: string; // ISO 8601 date string
    testing_institution?: string;
    test_equipment?: string;
    result_chart_path?: string;
    raw_data_path?: string;
    entry_date?: string; // ISO 8601 date string, output
    added_by?: string;
    remarks?: string;
}

interface FiberMicrostructurePhaseStructure extends MicrostructureTestData {
    test_method: 'NMR' | 'Raman' | string; // Enforce known methods, allow others
    amorphous_phase_percent_nmr?: number;
    intermediate_phase_percent_nmr?: number;
    crystalline_phase_percent_nmr?: number;
    defective_crystalline_percent_nmr?: number;
    crystallinity_percent_raman?: number;
    characteristic_peaks_raman?: string;
}

interface FiberMicrostructureOrientationCrystallinity extends MicrostructureTestData {
    test_method: 'WAXD' | 'SAXS' | 'SonicModulus' | string;
    crystal_size_nm_waxd?: number;
    orientation_factor_waxd?: number;
    d_spacing_waxd?: string; // Could be more structured if needed
    sound_velocity_mps?: number;
    orientation_factor_sonic?: number;
    modulus_sonic_gpa?: number;
}

interface FiberMicrostructureSem { // SEM has 'id' as PK, not 'test_id'
    id?: number; // BIGSERIAL PK
    fiber_id: number;
    test_date?: string;
    testing_institution?: string;
    test_equipment?: string;
    sample_name_sem?: string;
    magnification?: string;
    accelerating_voltage_kv?: number;
    image_path: string; // Not optional as per DB
    morphology_description_special_features?: string;
    analysis_results?: string;
    entry_date?: string;
    added_by?: string;
    remarks?: string;
}

interface FiberMicrostructureXps extends MicrostructureTestData {
    carbon_at_percent?: number;
    oxygen_at_percent?: number;
    nitrogen_at_percent?: number;
    other_elements_xps?: string; // Could be JSON string for structured data
    chemical_state_info_xps?: string;
}

// Composite interface for a Fiber with all its microstructure data
// (Assuming a Fiber interface exists from a previous step/module)
/*
interface FiberWithMicrostructureData extends Fiber {
    phase_structures?: FiberMicrostructurePhaseStructure[];
    orientation_crystallinity_tests?: FiberMicrostructureOrientationCrystallinity[];
    sem_images?: FiberMicrostructureSem[];
    xps_analyses?: FiberMicrostructureXps[];
}
*/
```

### 接口端点

(Following a similar pattern to `fiber_performance.MD`, these are examples)

```
// Generic endpoint structure for each microstructure type
// Replace {microstructure_type} with phaseStructure, orientationCrystallinity, sem, xps

POST   /api/fibers/{fiber_id}/{microstructure_type}.add
// For SEM, it might be /api/fibers/{fiber_id}/semImages.add

POST   /api/fibers/{fiber_id}/{microstructure_type}.list
// For SEM: /api/fibers/{fiber_id}/semImages.list

POST   /api/{microstructure_type}/{test_id_or_image_id}.get
// For SEM: /api/semImage/{id}.get

POST   /api/{microstructure_type}/{test_id_or_image_id}.update
// For SEM: /api/semImage/{id}.update

POST   /api/{microstructure_type}/{test_id_or_image_id}.delete
// For SEM: /api/semImage/{id}.delete

// Endpoint to get all microstructure data for a specific fiber
POST   /api/fibers/{fiber_id}/microstructure.getAll
```

## API 接口文档

(Detailed examples for a few key endpoints, others would follow a similar pattern)

### 1. 为指定纤维添加相结构测试记录 (`/api/fibers/{fiber_id}/phaseStructure.add`)

```typescript
POST /api/fibers/{fiber_id}/phaseStructure.add

请求路径参数:
fiber_id: number // ID of the fiber

请求数据:
Omit<FiberMicrostructurePhaseStructure, 'fiber_id' | 'test_id' | 'entry_date'>

响应数据：
{
    success: boolean,
    data: FiberMicrostructurePhaseStructure // Includes generated test_id
}
```

### 2. 获取指定纤维的所有SEM图像记录 (`/api/fibers/{fiber_id}/semImages.list`)

```typescript
POST /api/fibers/{fiber_id}/semImages.list

请求路径参数:
fiber_id: number

请求参数 (body):
{
    page?: number;
    pageSize?: number;
}

响应数据：
{
    total: number,
    items: FiberMicrostructureSem[],
    page: number,
    pageSize: number
}
```

### 3. 获取单个XPS分析记录 (`/api/xps/{test_id}.get`)

```typescript
POST /api/xps/{test_id}.get

请求路径参数:
test_id: number

响应数据：
FiberMicrostructureXps
```

### 4. 获取指定纤维的所有微观结构数据 (`/api/fibers/{fiber_id}/microstructure.getAll`)
```typescript
POST /api/fibers/{fiber_id}/microstructure.getAll

请求参数：
{
    fiber_id: number // or batch_no: string
}

响应数据：
{
    fiber_id: number,
    phase_structures?: FiberMicrostructurePhaseStructure[];
    orientation_crystallinity_tests?: FiberMicrostructureOrientationCrystallinity[];
    sem_images?: FiberMicrostructureSem[];
    xps_analyses?: FiberMicrostructureXps[];
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
    *   执行 `db/microstructure_characteristics.sql` 脚本创建相关表。
    *   确认外键、索引和约束。

2.  **后端开发 (Node.js + Express + Prisma)**
    *   更新 Prisma schema (`schema.prisma`) 加入新的微观结构模型。
    *   运行 `prisma generate`。
    *   为每种微观结构数据表实现 CRUD 接口, linking them to `fibers`.
    *   实现聚合接口 `/api/fibers/{fiber_id}/microstructure.getAll`.
    *   参数验证、错误处理、分页、筛选。
    *   更新/生成 API 文档.

3.  **前端开发 (Web Components + Lit Element)**
    *   为每种微观结构数据类型开发展示和编辑组件。
    *   集成这些组件到纤维详细信息视图中。
    *   实现数据提交和展示逻辑。

4.  **测试和优化**
    *   单元测试和集成测试 for backend.
    *   前端组件测试.
    *   性能和用户体验优化.

5.  **部署**
    *   (As per template)

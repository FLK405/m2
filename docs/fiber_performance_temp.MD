# 纤维性能

## 字段列表

### `fibers` (纤维基本信息)

-   `fiber_id`: 纤维批次的唯一标识符 (BIGSERIAL PRIMARY KEY)。
-   `manufacturer`: 纤维制造商 (VARCHAR(200))。
-   `grade`: 纤维牌号 (如 Dyneema SK75) (VARCHAR(200) NOT NULL)。
-   `batch_no`: 纤维批号，应唯一且非空 (VARCHAR(200) UNIQUE NOT NULL)。
-   `spinning_process_id`: 关联到纺丝工艺ID (BIGINT)。
-   `linear_density_dtex`: 纤度 (dtex) (DECIMAL(10,2))。
-   `filament_diameter_um`: 单丝直径 (μm) (DECIMAL(10,2))。
-   `filament_count`: 纤维根数 (INT)。
-   `source`: 样品来源 (VARCHAR(200))。
-   `production_date`: 生产日期 (TIMESTAMP WITH TIME ZONE)。
-   `image_path`: 样品图片路径 (VARCHAR(500))。
-   `entry_date`: 记录添加时间 (TIMESTAMP WITH TIME ZONE, 默认为 CURRENT_TIMESTAMP)。
-   `added_by`: 添加记录的用户或过程 (VARCHAR(100))。
-   `remarks`: 关于纤维批次的附加说明 (TEXT)。

### `fiber_molecular_weight` (纤维分子量属性)

-   `test_id`: 分子量测试的唯一标识符 (BIGSERIAL PRIMARY KEY)。
-   `fiber_id`: 外键，关联到被测纤维 (BIGINT NOT NULL, REFERENCES fibers(fiber_id))。
-   `test_date`: 测试进行日期 (TIMESTAMP WITH TIME ZONE)。
-   `testing_institution`: 进行测试的机构 (VARCHAR(200))。
-   `test_equipment`: 测试所用设备 (VARCHAR(200))。
-   `test_temperature_c`: 测试温度 (°C) (INT)。
-   `viscosity_average_mw_g_mol`: 粘均分子量 (g/mol) (BIGINT)。
-   `gpc_mn_g_mol`: GPC 数均分子量 (g/mol) (DECIMAL(18,2))。
-   `gpc_mw_g_mol`: GPC 重均分子量 (g/mol) (DECIMAL(18,2))。
-   `gpc_pdi`: GPC 多分散系数 (Mw/Mn) (DECIMAL(8,2))。
-   `result_chart_path`: 结果图表路径 (VARCHAR(500))。
-   `raw_data_path`: 原始数据文件路径 (VARCHAR(500))。
-   `entry_date`: 数据录入时间戳 (TIMESTAMP WITH TIME ZONE, 默认为 CURRENT_TIMESTAMP)。
-   `added_by`: 添加数据的用户 (VARCHAR(100))。
-   `remarks`: 关于测试的附加说明 (TEXT)。

### `fiber_tensile_properties` (纤维拉伸性能)

-   `test_id`: 拉伸测试的唯一标识符 (BIGSERIAL PRIMARY KEY)。
-   `fiber_id`: 外键，关联到被测纤维 (BIGINT NOT NULL, REFERENCES fibers(fiber_id))。
-   `test_standard`: 测试标准 (如 ASTM D3822) (VARCHAR(100))。
-   `test_date`: 测试日期 (TIMESTAMP WITH TIME ZONE)。
-   `testing_institution`: 进行测试的机构 (VARCHAR(200))。
-   `test_equipment`: 所用设备 (VARCHAR(200))。
-   `temperature_c`: 测试温度 (°C) (DECIMAL(8,1))。
-   `humidity_rh`: 测试时相对湿度 (%) (DECIMAL(8,1))。
-   `strain_rate_per_min`: 应变速率 (%/min 或 mm/min) (DECIMAL(10,2))。
-   `gauge_length_mm`: 标距 (mm) (DECIMAL(10,1))。
-   `tensile_strength_gpa`: 拉伸强度 (GPa) (DECIMAL(10,3))。
-   `tensile_strength_cn_dtex`: 比强度 (cN/dtex) (DECIMAL(10,2))。
-   `tensile_strength_cv_percent`: 拉伸强度变异系数 (%) (DECIMAL(8,2))。
-   `youngs_modulus_gpa`: 杨氏模量 (GPa) (DECIMAL(10,2))。
-   `youngs_modulus_cn_dtex`: 比模量 (cN/dtex) (DECIMAL(10,2))。
-   `youngs_modulus_cv_percent`: 杨氏模量变异系数 (%) (DECIMAL(8,2))。
-   `elongation_at_break_percent`: 断裂伸长率 (%) (DECIMAL(8,2))。
-   `elongation_at_break_cv_percent`: 断裂伸长率变异系数 (%) (DECIMAL(8,2))。
-   `work_of_fracture_j`: 断裂功 (J) (DECIMAL(19,2))。
-   `work_of_fracture_cv_percent`: 断裂功变异系数 (%) (DECIMAL(8,2))。
-   `stress_strain_curve_data_json`: 应力-应变曲线数据 (JSON格式) (TEXT)。
-   `result_chart_path`: 结果图表路径 (VARCHAR(500))。
-   `raw_data_path`: 原始数据文件路径 (VARCHAR(500))。
-   `entry_date`: 数据录入时间戳 (TIMESTAMP WITH TIME ZONE, 默认为 CURRENT_TIMESTAMP)。
-   `added_by`: 添加数据的用户 (VARCHAR(100))。
-   `remarks`: 附加说明 (TEXT)。

### `fiber_creep_properties` (纤维蠕变性能)

-   `test_id`: 蠕变测试的唯一标识符 (BIGSERIAL PRIMARY KEY)。
-   `fiber_id`: 外键，关联到被测纤维 (BIGINT NOT NULL, REFERENCES fibers(fiber_id))。
-   `test_standard`: 测试标准 (如 ASTM D2990) (VARCHAR(100))。
-   `test_date`: 测试日期 (TIMESTAMP WITH TIME ZONE)。
-   `testing_institution`: 进行测试的机构 (VARCHAR(200))。
-   `test_equipment`: 所用设备 (VARCHAR(200))。
-   `temperature_c`: 测试温度 (°C) (DECIMAL(8,1))。
-   `humidity_rh`: 测试时相对湿度 (%) (DECIMAL(8,1))。
-   `applied_load_force_n`: 施加载荷或力 (N) (DECIMAL(10,2))。
-   `applied_stress_mpa`: 应用应力 (MPa) (DECIMAL(10,2))。
-   `creep_strain_percent_at_time_x`: 特定时间点X的蠕变应变 (%) (DECIMAL(8,2))。
-   `creep_rate_percent_per_hour`: 蠕变速率 (%/小时) (DECIMAL(10,5))。
-   `creep_time_h`: 蠕变测试时长 (小时) (DECIMAL(10,2))。
-   `creep_rupture_time_h`: 蠕变断裂时间 (小时) (DECIMAL(10,2))。
-   `result_chart_path`: 蠕变曲线图路径 (VARCHAR(500))。
-   `raw_data_path`: 原始数据文件路径 (VARCHAR(500))。
-   `entry_date`: 数据录入时间戳 (TIMESTAMP WITH TIME ZONE, 默认为 CURRENT_TIMESTAMP)。
-   `added_by`: 添加数据的用户 (VARCHAR(100))。
-   `remarks`: 附加说明 (TEXT)。

### `fiber_dynamic_tensile_properties` (纤维动态拉伸性能)

-   `test_id`: 动态拉伸测试的唯一标识符 (BIGSERIAL PRIMARY KEY)。
-   `fiber_id`: 外键，关联到被测纤维 (BIGINT NOT NULL, REFERENCES fibers(fiber_id))。
-   `test_standard`: 测试标准 (VARCHAR(100))。
-   `test_date`: 测试日期 (TIMESTAMP WITH TIME ZONE)。
-   `testing_institution`: 进行测试的机构 (VARCHAR(200))。
-   `test_equipment`: 所用设备 (VARCHAR(200))。
-   `temperature_c`: 测试温度 (°C) (DECIMAL(8,1))。
-   `humidity_rh`: 测试时相对湿度 (%) (DECIMAL(8,1))。
-   `initial_elastic_modulus_gpa`: 初始弹性模量 (GPa) (DECIMAL(10,2))。
-   `failure_stress_mpa`: 破坏应力 (MPa) (DECIMAL(10,2))。
-   `instability_strain_percent`: 失稳应变 (%) (DECIMAL(8,2))。
-   `result_chart_path`: 结果图表路径 (VARCHAR(500))。
-   `raw_data_path`: 原始数据文件路径 (VARCHAR(500))。
-   `entry_date`: 数据录入时间戳 (TIMESTAMP WITH TIME ZONE, 默认为 CURRENT_TIMESTAMP)。
-   `added_by`: 添加数据的用户 (VARCHAR(100))。
-   `remarks`: 附加说明 (TEXT)。

### `fiber_thermal_dsc` (纤维热性能 - DSC)

-   `test_id`: DSC测试的唯一标识符 (BIGSERIAL PRIMARY KEY)。
-   `fiber_id`: 外键，关联到被测纤维 (BIGINT NOT NULL, REFERENCES fibers(fiber_id))。
-   `test_standard`: 测试标准 (如 ISO 11357-3) (VARCHAR(100))。
-   `test_date`: 测试日期 (TIMESTAMP WITH TIME ZONE)。
-   `testing_institution`: 进行测试的机构 (VARCHAR(200))。
-   `test_equipment`: DSC设备 (VARCHAR(200))。
-   `sample_mass_mg`: 样品质量 (mg) (DECIMAL(10,3))。
-   `crucible_type`: 坩埚类型 (如铝) (VARCHAR(50))。
-   `temperature_range_c`: 测试温度范围 (°C) (VARCHAR(50))。
-   `heating_rate_c_min`: 升温速率 (°C/min) (DECIMAL(8,1))。
-   `protective_gas`: 保护气体 (如氮气) (VARCHAR(50))。
-   `melting_peak_temperature_tm_c`: 熔融峰值温度 (Tm) (°C) (DECIMAL(8,1))。
-   `enthalpy_of_fusion_j_g`: 熔融焓 (J/g) (DECIMAL(10,2))。
-   `crystallinity_percent`: DSC计算结晶度 (%) (DECIMAL(8,2))。
-   `result_chart_path`: DSC曲线图路径 (VARCHAR(500))。
-   `raw_data_path`: 原始数据文件路径 (VARCHAR(500))。
-   `entry_date`: 数据录入时间戳 (TIMESTAMP WITH TIME ZONE, 默认为 CURRENT_TIMESTAMP)。
-   `added_by`: 添加数据的用户 (VARCHAR(100))。
-   `remarks`: 附加说明 (TEXT)。

### `fiber_thermal_tga` (纤维热性能 - TGA)

-   `test_id`: TGA测试的唯一标识符 (BIGSERIAL PRIMARY KEY)。
-   `fiber_id`: 外键，关联到被测纤维 (BIGINT NOT NULL, REFERENCES fibers(fiber_id))。
-   `test_standard`: 测试标准 (如 ISO 11358) (VARCHAR(100))。
-   `test_date`: 测试日期 (TIMESTAMP WITH TIME ZONE)。
-   `testing_institution`: 进行测试的机构 (VARCHAR(200))。
-   `test_equipment`: TGA设备 (VARCHAR(200))。
-   `sample_mass_mg`: 样品质量 (mg) (DECIMAL(10,3))。
-   `crucible_type`: 坩埚类型 (VARCHAR(50))。
-   `temperature_range_c`: 测试温度范围 (°C) (VARCHAR(50))。
-   `heating_rate_c_min`: 升温速率 (°C/min) (DECIMAL(8,1))。
-   `protective_gas`: 保护气体 (如氮气、空气) (VARCHAR(50))。
-   `decomposition_onset_c`: 分解起始温度 (°C) (DECIMAL(8,1))。
-   `peak_decomposition_temp_c`: 峰值分解温度 (°C) (DECIMAL(8,1))。
-   `residue_percent`: 测试结束时残余质量百分比 (%) (DECIMAL(8,2))。
-   `component_description`: 基于TGA曲线的组分描述 (TEXT)。
-   `result_chart_path`: TGA曲线图路径 (VARCHAR(500))。
-   `raw_data_path`: 原始数据文件路径 (VARCHAR(500))。
-   `entry_date`: 数据录入时间戳 (TIMESTAMP WITH TIME ZONE, 默认为 CURRENT_TIMESTAMP)。
-   `added_by`: 添加数据的用户 (VARCHAR(100))。
-   `remarks`: 附加说明 (TEXT)。

### `fiber_thermal_conductivity` (纤维热导率)

-   `test_id`: 热导率测试的唯一标识符 (BIGSERIAL PRIMARY KEY)。
-   `fiber_id`: 外键，关联到被测纤维 (BIGINT NOT NULL, REFERENCES fibers(fiber_id))。
-   `test_standard`: 测试标准 (如 ASTM E1530) (VARCHAR(100))。
-   `test_date`: 测试日期 (TIMESTAMP WITH TIME ZONE)。
-   `testing_institution`: 进行测试的机构 (VARCHAR(200))。
-   `test_equipment`: 所用设备 (VARCHAR(200))。
-   `test_temperature_c`: 测试温度 (°C) (DECIMAL(8,1))。
-   `thermal_conductivity_w_mk`: 热导率 (W/mK) (DECIMAL(10,4))。
-   `measurement_direction`: 测量方向 (如轴向, 径向) (VARCHAR(50))。
-   `result_chart_path`: 结果图表路径 (VARCHAR(500))。
-   `raw_data_path`: 原始数据文件路径 (VARCHAR(500))。
-   `entry_date`: 数据录入时间戳 (TIMESTAMP WITH TIME ZONE, 默认为 CURRENT_TIMESTAMP)。
-   `added_by`: 添加数据的用户 (VARCHAR(100))。
-   `remarks`: 附加说明 (TEXT)。

## 数据库设计

```sql
-- PostgreSQL DDL for Fiber and Fiber Performance tables

-- Fibers Table (Basic Information)
DROP TABLE IF EXISTS fibers CASCADE;
CREATE TABLE fibers (
    fiber_id BIGSERIAL PRIMARY KEY,
    manufacturer VARCHAR(200),
    grade VARCHAR(200) NOT NULL,
    batch_no VARCHAR(200) UNIQUE NOT NULL,
    spinning_process_id BIGINT,                          -- Will be linked to precursor_resin_spinning_process(process_id) if that table is also converted
    linear_density_dtex DECIMAL(10,2),
    filament_diameter_um DECIMAL(10,2),
    filament_count INT,
    source VARCHAR(200),
    production_date TIMESTAMP WITH TIME ZONE,
    image_path VARCHAR(500),
    entry_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    added_by VARCHAR(100),
    remarks TEXT
    -- FOREIGN KEY (spinning_process_id) REFERENCES precursor_resin_spinning_process(process_id) -- Assuming precursor_resin_spinning_process table
);

COMMENT ON TABLE fibers IS 'Stores basic information about UHMWPE fibers.';
COMMENT ON COLUMN fibers.fiber_id IS 'Unique identifier for the fiber batch.';
COMMENT ON COLUMN fibers.manufacturer IS 'Manufacturer of the fiber.';
COMMENT ON COLUMN fibers.grade IS 'Grade name or code of the fiber (e.g., Dyneema SK75).';
COMMENT ON COLUMN fibers.batch_no IS 'Unique batch number for the fiber. Should be unique and non-null.';
COMMENT ON COLUMN fibers.spinning_process_id IS 'Foreign key linking to the spinning process used for this fiber batch.';
COMMENT ON COLUMN fibers.linear_density_dtex IS 'Linear density of the fiber in dtex.';
COMMENT ON COLUMN fibers.filament_diameter_um IS 'Diameter of a single filament in micrometers (μm).';
COMMENT ON COLUMN fibers.filament_count IS 'Number of filaments in the yarn/fiber bundle.';
COMMENT ON COLUMN fibers.source IS 'Source from which the fiber sample was obtained.';
COMMENT ON COLUMN fibers.production_date IS 'Date when the fiber was produced.';
COMMENT ON COLUMN fibers.image_path IS 'Filesystem path or URL to an image of the fiber sample.';
COMMENT ON COLUMN fibers.entry_date IS 'Timestamp when the record was added to the database. Defaults to current timestamp.';
COMMENT ON COLUMN fibers.added_by IS 'User or process that added this record.';
COMMENT ON COLUMN fibers.remarks IS 'Additional notes or comments about the fiber batch.';

-- Fiber Molecular Weight Properties
DROP TABLE IF EXISTS fiber_molecular_weight CASCADE;
CREATE TABLE fiber_molecular_weight (
    test_id BIGSERIAL PRIMARY KEY,
    fiber_id BIGINT NOT NULL,
    test_date TIMESTAMP WITH TIME ZONE,
    testing_institution VARCHAR(200),
    test_equipment VARCHAR(200),
    test_temperature_c INT,
    viscosity_average_mw_g_mol BIGINT,
    gpc_mn_g_mol DECIMAL(18,2),
    gpc_mw_g_mol DECIMAL(18,2),
    gpc_pdi DECIMAL(8,2),
    result_chart_path VARCHAR(500),
    raw_data_path VARCHAR(500),
    entry_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    added_by VARCHAR(100),
    remarks TEXT,
    FOREIGN KEY (fiber_id) REFERENCES fibers(fiber_id)
);

COMMENT ON TABLE fiber_molecular_weight IS 'Stores molecular weight properties of fibers.';
COMMENT ON COLUMN fiber_molecular_weight.test_id IS 'Unique identifier for the molecular weight test.';
COMMENT ON COLUMN fiber_molecular_weight.fiber_id IS 'Foreign key referencing the fiber tested.';
COMMENT ON COLUMN fiber_molecular_weight.test_date IS 'Date when the test was conducted.';
COMMENT ON COLUMN fiber_molecular_weight.testing_institution IS 'Institution that performed the test.';
COMMENT ON COLUMN fiber_molecular_weight.test_equipment IS 'Equipment used for the test.';
COMMENT ON COLUMN fiber_molecular_weight.test_temperature_c IS 'Test temperature in Celsius.';
COMMENT ON COLUMN fiber_molecular_weight.viscosity_average_mw_g_mol IS 'Viscosity average molecular weight (g/mol).';
COMMENT ON COLUMN fiber_molecular_weight.gpc_mn_g_mol IS 'GPC Number average molecular weight (g/mol).';
COMMENT ON COLUMN fiber_molecular_weight.gpc_mw_g_mol IS 'GPC Weight average molecular weight (g/mol).';
COMMENT ON COLUMN fiber_molecular_weight.gpc_pdi IS 'GPC Polydispersity Index (Mw/Mn).';
COMMENT ON COLUMN fiber_molecular_weight.result_chart_path IS 'Path to the result chart/image.';
COMMENT ON COLUMN fiber_molecular_weight.raw_data_path IS 'Path to the raw data file.';
COMMENT ON COLUMN fiber_molecular_weight.entry_date IS 'Timestamp of data entry.';
COMMENT ON COLUMN fiber_molecular_weight.added_by IS 'User who added the data.';
COMMENT ON COLUMN fiber_molecular_weight.remarks IS 'Additional remarks about the test.';

-- Fiber Tensile Properties
DROP TABLE IF EXISTS fiber_tensile_properties CASCADE;
CREATE TABLE fiber_tensile_properties (
    test_id BIGSERIAL PRIMARY KEY,
    fiber_id BIGINT NOT NULL,
    test_standard VARCHAR(100),
    test_date TIMESTAMP WITH TIME ZONE,
    testing_institution VARCHAR(200),
    test_equipment VARCHAR(200),
    temperature_c DECIMAL(8,1),
    humidity_rh DECIMAL(8,1),
    strain_rate_per_min DECIMAL(10,2),
    gauge_length_mm DECIMAL(10,1),
    tensile_strength_gpa DECIMAL(10,3),
    tensile_strength_cn_dtex DECIMAL(10,2),
    tensile_strength_cv_percent DECIMAL(8,2),
    youngs_modulus_gpa DECIMAL(10,2),
    youngs_modulus_cn_dtex DECIMAL(10,2),
    youngs_modulus_cv_percent DECIMAL(8,2),
    elongation_at_break_percent DECIMAL(8,2),
    elongation_at_break_cv_percent DECIMAL(8,2),
    work_of_fracture_j DECIMAL(19,2),
    work_of_fracture_cv_percent DECIMAL(8,2),
    stress_strain_curve_data_json TEXT,
    result_chart_path VARCHAR(500),
    raw_data_path VARCHAR(500),
    entry_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    added_by VARCHAR(100),
    remarks TEXT,
    FOREIGN KEY (fiber_id) REFERENCES fibers(fiber_id)
);

COMMENT ON TABLE fiber_tensile_properties IS 'Stores tensile mechanical properties of fibers.';
COMMENT ON COLUMN fiber_tensile_properties.test_id IS 'Unique identifier for the tensile test.';
COMMENT ON COLUMN fiber_tensile_properties.fiber_id IS 'Foreign key referencing the fiber tested.';
COMMENT ON COLUMN fiber_tensile_properties.test_standard IS 'Test standard used (e.g., ASTM D3822).';
COMMENT ON COLUMN fiber_tensile_properties.test_date IS 'Date of the test.';
COMMENT ON COLUMN fiber_tensile_properties.testing_institution IS 'Institution performing the test.';
COMMENT ON COLUMN fiber_tensile_properties.test_equipment IS 'Equipment used.';
COMMENT ON COLUMN fiber_tensile_properties.temperature_c IS 'Test temperature in Celsius.';
COMMENT ON COLUMN fiber_tensile_properties.humidity_rh IS 'Relative humidity at testing.';
COMMENT ON COLUMN fiber_tensile_properties.strain_rate_per_min IS 'Strain rate (%/min or mm/min).';
COMMENT ON COLUMN fiber_tensile_properties.gauge_length_mm IS 'Gauge length in mm.';
COMMENT ON COLUMN fiber_tensile_properties.tensile_strength_gpa IS 'Tensile strength in GPa.';
COMMENT ON COLUMN fiber_tensile_properties.tensile_strength_cn_dtex IS 'Tensile strength in cN/dtex (specific strength).';
COMMENT ON COLUMN fiber_tensile_properties.tensile_strength_cv_percent IS 'Coefficient of Variation for tensile strength (%).';
COMMENT ON COLUMN fiber_tensile_properties.youngs_modulus_gpa IS 'Young''s modulus in GPa.';
COMMENT ON COLUMN fiber_tensile_properties.youngs_modulus_cn_dtex IS 'Young''s modulus in cN/dtex.';
COMMENT ON COLUMN fiber_tensile_properties.youngs_modulus_cv_percent IS 'Coefficient of Variation for Young''s modulus (%).';
COMMENT ON COLUMN fiber_tensile_properties.elongation_at_break_percent IS 'Elongation at break (%).';
COMMENT ON COLUMN fiber_tensile_properties.elongation_at_break_cv_percent IS 'Coefficient of Variation for elongation at break (%).';
COMMENT ON COLUMN fiber_tensile_properties.work_of_fracture_j IS 'Work of fracture in Joules (J).';
COMMENT ON COLUMN fiber_tensile_properties.work_of_fracture_cv_percent IS 'Coefficient of Variation for work of fracture (%).';
COMMENT ON COLUMN fiber_tensile_properties.stress_strain_curve_data_json IS 'Stress-strain curve data in JSON format (e.g., [{stress:s1, strain:e1}, ...]).';
COMMENT ON COLUMN fiber_tensile_properties.result_chart_path IS 'Path to the result chart/image.';
COMMENT ON COLUMN fiber_tensile_properties.raw_data_path IS 'Path to the raw data file.';
COMMENT ON COLUMN fiber_tensile_properties.entry_date IS 'Timestamp of data entry.';
COMMENT ON COLUMN fiber_tensile_properties.added_by IS 'User who added the data.';
COMMENT ON COLUMN fiber_tensile_properties.remarks IS 'Additional remarks.';

-- Fiber Creep Properties
DROP TABLE IF EXISTS fiber_creep_properties CASCADE;
CREATE TABLE fiber_creep_properties (
    test_id BIGSERIAL PRIMARY KEY,
    fiber_id BIGINT NOT NULL,
    test_standard VARCHAR(100),
    test_date TIMESTAMP WITH TIME ZONE,
    testing_institution VARCHAR(200),
    test_equipment VARCHAR(200),
    temperature_c DECIMAL(8,1),
    humidity_rh DECIMAL(8,1),
    applied_load_force_n DECIMAL(10,2),
    applied_stress_mpa DECIMAL(10,2),
    creep_strain_percent_at_time_x DECIMAL(8,2),
    creep_rate_percent_per_hour DECIMAL(10,5),
    creep_time_h DECIMAL(10,2),
    creep_rupture_time_h DECIMAL(10,2),
    result_chart_path VARCHAR(500),
    raw_data_path VARCHAR(500),
    entry_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    added_by VARCHAR(100),
    remarks TEXT,
    FOREIGN KEY (fiber_id) REFERENCES fibers(fiber_id)
);

COMMENT ON TABLE fiber_creep_properties IS 'Stores creep properties of fibers.';
COMMENT ON COLUMN fiber_creep_properties.test_id IS 'Unique identifier for the creep test.';
COMMENT ON COLUMN fiber_creep_properties.fiber_id IS 'Foreign key referencing the fiber tested.';
COMMENT ON COLUMN fiber_creep_properties.test_standard IS 'Test standard (e.g., ASTM D2990).';
COMMENT ON COLUMN fiber_creep_properties.test_date IS 'Date of the test.';
COMMENT ON COLUMN fiber_creep_properties.testing_institution IS 'Institution performing the test.';
COMMENT ON COLUMN fiber_creep_properties.test_equipment IS 'Equipment used.';
COMMENT ON COLUMN fiber_creep_properties.temperature_c IS 'Test temperature in Celsius.';
COMMENT ON COLUMN fiber_creep_properties.humidity_rh IS 'Relative humidity at testing.';
COMMENT ON COLUMN fiber_creep_properties.applied_load_force_n IS 'Applied load or force in Newtons (N).';
COMMENT ON COLUMN fiber_creep_properties.applied_stress_mpa IS 'Applied stress in MPa.';
COMMENT ON COLUMN fiber_creep_properties.creep_strain_percent_at_time_x IS 'Creep strain (%) at a specific time X.';
COMMENT ON COLUMN fiber_creep_properties.creep_rate_percent_per_hour IS 'Creep rate (%/hour).';
COMMENT ON COLUMN fiber_creep_properties.creep_time_h IS 'Duration of the creep test in hours.';
COMMENT ON COLUMN fiber_creep_properties.creep_rupture_time_h IS 'Time to rupture under creep conditions in hours.';
COMMENT ON COLUMN fiber_creep_properties.result_chart_path IS 'Path to the creep curve chart/image.';
COMMENT ON COLUMN fiber_creep_properties.raw_data_path IS 'Path to the raw data file.';
COMMENT ON COLUMN fiber_creep_properties.entry_date IS 'Timestamp of data entry.';
COMMENT ON COLUMN fiber_creep_properties.added_by IS 'User who added the data.';
COMMENT ON COLUMN fiber_creep_properties.remarks IS 'Additional remarks.';

-- Fiber Dynamic Tensile Properties
DROP TABLE IF EXISTS fiber_dynamic_tensile_properties CASCADE;
CREATE TABLE fiber_dynamic_tensile_properties (
    test_id BIGSERIAL PRIMARY KEY,
    fiber_id BIGINT NOT NULL,
    test_standard VARCHAR(100),
    test_date TIMESTAMP WITH TIME ZONE,
    testing_institution VARCHAR(200),
    test_equipment VARCHAR(200),
    temperature_c DECIMAL(8,1),
    humidity_rh DECIMAL(8,1),
    initial_elastic_modulus_gpa DECIMAL(10,2),
    failure_stress_mpa DECIMAL(10,2),
    instability_strain_percent DECIMAL(8,2),
    result_chart_path VARCHAR(500),
    raw_data_path VARCHAR(500),
    entry_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    added_by VARCHAR(100),
    remarks TEXT,
    FOREIGN KEY (fiber_id) REFERENCES fibers(fiber_id)
);

COMMENT ON TABLE fiber_dynamic_tensile_properties IS 'Stores dynamic tensile properties of fibers.';
COMMENT ON COLUMN fiber_dynamic_tensile_properties.test_id IS 'Unique identifier for the dynamic tensile test.';
COMMENT ON COLUMN fiber_dynamic_tensile_properties.fiber_id IS 'Foreign key referencing the fiber tested.';
COMMENT ON COLUMN fiber_dynamic_tensile_properties.test_standard IS 'Test standard used.';
COMMENT ON COLUMN fiber_dynamic_tensile_properties.test_date IS 'Date of the test.';
COMMENT ON COLUMN fiber_dynamic_tensile_properties.testing_institution IS 'Institution performing the test.';
COMMENT ON COLUMN fiber_dynamic_tensile_properties.test_equipment IS 'Equipment used.';
COMMENT ON COLUMN fiber_dynamic_tensile_properties.temperature_c IS 'Test temperature in Celsius.';
COMMENT ON COLUMN fiber_dynamic_tensile_properties.humidity_rh IS 'Relative humidity at testing.';
COMMENT ON COLUMN fiber_dynamic_tensile_properties.initial_elastic_modulus_gpa IS 'Initial elastic modulus in GPa.';
COMMENT ON COLUMN fiber_dynamic_tensile_properties.failure_stress_mpa IS 'Failure stress in MPa.';
COMMENT ON COLUMN fiber_dynamic_tensile_properties.instability_strain_percent IS 'Instability strain (%).';
COMMENT ON COLUMN fiber_dynamic_tensile_properties.result_chart_path IS 'Path to the result chart/image.';
COMMENT ON COLUMN fiber_dynamic_tensile_properties.raw_data_path IS 'Path to the raw data file.';
COMMENT ON COLUMN fiber_dynamic_tensile_properties.entry_date IS 'Timestamp of data entry.';
COMMENT ON COLUMN fiber_dynamic_tensile_properties.added_by IS 'User who added the data.';
COMMENT ON COLUMN fiber_dynamic_tensile_properties.remarks IS 'Additional remarks.';

-- Fiber Thermal Properties - DSC (Differential Scanning Calorimetry)
DROP TABLE IF EXISTS fiber_thermal_dsc CASCADE;
CREATE TABLE fiber_thermal_dsc (
    test_id BIGSERIAL PRIMARY KEY,
    fiber_id BIGINT NOT NULL,
    test_standard VARCHAR(100),
    test_date TIMESTAMP WITH TIME ZONE,
    testing_institution VARCHAR(200),
    test_equipment VARCHAR(200),
    sample_mass_mg DECIMAL(10,3),
    crucible_type VARCHAR(50),
    temperature_range_c VARCHAR(50),
    heating_rate_c_min DECIMAL(8,1),
    protective_gas VARCHAR(50),
    melting_peak_temperature_tm_c DECIMAL(8,1),
    enthalpy_of_fusion_j_g DECIMAL(10,2),
    crystallinity_percent DECIMAL(8,2),
    result_chart_path VARCHAR(500),
    raw_data_path VARCHAR(500),
    entry_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    added_by VARCHAR(100),
    remarks TEXT,
    FOREIGN KEY (fiber_id) REFERENCES fibers(fiber_id)
);

COMMENT ON TABLE fiber_thermal_dsc IS 'Stores fiber thermal properties from DSC tests.';
COMMENT ON COLUMN fiber_thermal_dsc.test_id IS 'Unique identifier for the DSC test.';
COMMENT ON COLUMN fiber_thermal_dsc.fiber_id IS 'Foreign key referencing the fiber tested.';
COMMENT ON COLUMN fiber_thermal_dsc.test_standard IS 'Test standard (e.g., ISO 11357-3).';
COMMENT ON COLUMN fiber_thermal_dsc.test_date IS 'Date of the test.';
COMMENT ON COLUMN fiber_thermal_dsc.testing_institution IS 'Institution performing the test.';
COMMENT ON COLUMN fiber_thermal_dsc.test_equipment IS 'DSC equipment used.';
COMMENT ON COLUMN fiber_thermal_dsc.sample_mass_mg IS 'Mass of the sample in milligrams (mg).';
COMMENT ON COLUMN fiber_thermal_dsc.crucible_type IS 'Type of crucible used (e.g., Aluminum).';
COMMENT ON COLUMN fiber_thermal_dsc.temperature_range_c IS 'Temperature range of the test in Celsius (e.g., 25-300).';
COMMENT ON COLUMN fiber_thermal_dsc.heating_rate_c_min IS 'Heating rate in °C/min.';
COMMENT ON COLUMN fiber_thermal_dsc.protective_gas IS 'Protective gas used (e.g., Nitrogen).';
COMMENT ON COLUMN fiber_thermal_dsc.melting_peak_temperature_tm_c IS 'Melting peak temperature (Tm) in Celsius.';
COMMENT ON COLUMN fiber_thermal_dsc.enthalpy_of_fusion_j_g IS 'Enthalpy of fusion in J/g.';
COMMENT ON COLUMN fiber_thermal_dsc.crystallinity_percent IS 'Crystallinity derived from DSC data (%).';
COMMENT ON COLUMN fiber_thermal_dsc.result_chart_path IS 'Path to the DSC curve chart/image.';
COMMENT ON COLUMN fiber_thermal_dsc.raw_data_path IS 'Path to the raw data file.';
COMMENT ON COLUMN fiber_thermal_dsc.entry_date IS 'Timestamp of data entry.';
COMMENT ON COLUMN fiber_thermal_dsc.added_by IS 'User who added the data.';
COMMENT ON COLUMN fiber_thermal_dsc.remarks IS 'Additional remarks.';

-- Fiber Thermal Properties - TGA (Thermogravimetric Analysis)
DROP TABLE IF EXISTS fiber_thermal_tga CASCADE;
CREATE TABLE fiber_thermal_tga (
    test_id BIGSERIAL PRIMARY KEY,
    fiber_id BIGINT NOT NULL,
    test_standard VARCHAR(100),
    test_date TIMESTAMP WITH TIME ZONE,
    testing_institution VARCHAR(200),
    test_equipment VARCHAR(200),
    sample_mass_mg DECIMAL(10,3),
    crucible_type VARCHAR(50),
    temperature_range_c VARCHAR(50),
    heating_rate_c_min DECIMAL(8,1),
    protective_gas VARCHAR(50),
    decomposition_onset_c DECIMAL(8,1),
    peak_decomposition_temp_c DECIMAL(8,1),
    residue_percent DECIMAL(8,2),
    component_description TEXT,
    result_chart_path VARCHAR(500),
    raw_data_path VARCHAR(500),
    entry_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    added_by VARCHAR(100),
    remarks TEXT,
    FOREIGN KEY (fiber_id) REFERENCES fibers(fiber_id)
);

COMMENT ON TABLE fiber_thermal_tga IS 'Stores fiber thermal properties from TGA tests.';
COMMENT ON COLUMN fiber_thermal_tga.test_id IS 'Unique identifier for the TGA test.';
COMMENT ON COLUMN fiber_thermal_tga.fiber_id IS 'Foreign key referencing the fiber tested.';
COMMENT ON COLUMN fiber_thermal_tga.test_standard IS 'Test standard (e.g., ISO 11358).';
COMMENT ON COLUMN fiber_thermal_tga.test_date IS 'Date of the test.';
COMMENT ON COLUMN fiber_thermal_tga.testing_institution IS 'Institution performing the test.';
COMMENT ON COLUMN fiber_thermal_tga.test_equipment IS 'TGA equipment used.';
COMMENT ON COLUMN fiber_thermal_tga.sample_mass_mg IS 'Mass of the sample in milligrams (mg).';
COMMENT ON COLUMN fiber_thermal_tga.crucible_type IS 'Type of crucible used.';
COMMENT ON COLUMN fiber_thermal_tga.temperature_range_c IS 'Temperature range of the test in Celsius.';
COMMENT ON COLUMN fiber_thermal_tga.heating_rate_c_min IS 'Heating rate in °C/min.';
COMMENT ON COLUMN fiber_thermal_tga.protective_gas IS 'Protective gas used (e.g., Nitrogen, Air).';
COMMENT ON COLUMN fiber_thermal_tga.decomposition_onset_c IS 'Onset temperature of decomposition in Celsius.';
COMMENT ON COLUMN fiber_thermal_tga.peak_decomposition_temp_c IS 'Peak decomposition temperature in Celsius.';
COMMENT ON COLUMN fiber_thermal_tga.residue_percent IS 'Residue percentage at the end of the test (%).';
COMMENT ON COLUMN fiber_thermal_tga.component_description IS 'Description of components based on TGA curve (e.g., moisture, polymer, filler).';
COMMENT ON COLUMN fiber_thermal_tga.result_chart_path IS 'Path to the TGA curve chart/image.';
COMMENT ON COLUMN fiber_thermal_tga.raw_data_path IS 'Path to the raw data file.';
COMMENT ON COLUMN fiber_thermal_tga.entry_date IS 'Timestamp of data entry.';
COMMENT ON COLUMN fiber_thermal_tga.added_by IS 'User who added the data.';
COMMENT ON COLUMN fiber_thermal_tga.remarks IS 'Additional remarks.';

-- Fiber Thermal Conductivity
DROP TABLE IF EXISTS fiber_thermal_conductivity CASCADE;
CREATE TABLE fiber_thermal_conductivity (
    test_id BIGSERIAL PRIMARY KEY,
    fiber_id BIGINT NOT NULL,
    test_standard VARCHAR(100),
    test_date TIMESTAMP WITH TIME ZONE,
    testing_institution VARCHAR(200),
    test_equipment VARCHAR(200),
    test_temperature_c DECIMAL(8,1),
    thermal_conductivity_w_mk DECIMAL(10,4),
    measurement_direction VARCHAR(50),
    result_chart_path VARCHAR(500),
    raw_data_path VARCHAR(500),
    entry_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    added_by VARCHAR(100),
    remarks TEXT,
    FOREIGN KEY (fiber_id) REFERENCES fibers(fiber_id)
);

COMMENT ON TABLE fiber_thermal_conductivity IS 'Stores thermal conductivity properties of fibers.';
COMMENT ON COLUMN fiber_thermal_conductivity.test_id IS 'Unique identifier for the thermal conductivity test.';
COMMENT ON COLUMN fiber_thermal_conductivity.fiber_id IS 'Foreign key referencing the fiber tested.';
COMMENT ON COLUMN fiber_thermal_conductivity.test_standard IS 'Test standard (e.g., ASTM E1530).';
COMMENT ON COLUMN fiber_thermal_conductivity.test_date IS 'Date of the test.';
COMMENT ON COLUMN fiber_thermal_conductivity.testing_institution IS 'Institution performing the test.';
COMMENT ON COLUMN fiber_thermal_conductivity.test_equipment IS 'Equipment used.';
COMMENT ON COLUMN fiber_thermal_conductivity.test_temperature_c IS 'Test temperature in Celsius.';
COMMENT ON COLUMN fiber_thermal_conductivity.thermal_conductivity_w_mk IS 'Thermal conductivity in W/(m·K).';
COMMENT ON COLUMN fiber_thermal_conductivity.measurement_direction IS 'Direction of measurement (e.g., Axial, Radial).';
COMMENT ON COLUMN fiber_thermal_conductivity.result_chart_path IS 'Path to the result chart/image.';
COMMENT ON COLUMN fiber_thermal_conductivity.raw_data_path IS 'Path to the raw data file.';
COMMENT ON COLUMN fiber_thermal_conductivity.entry_date IS 'Timestamp of data entry.';
COMMENT ON COLUMN fiber_thermal_conductivity.added_by IS 'User who added the data.';
COMMENT ON COLUMN fiber_thermal_conductivity.remarks IS 'Additional remarks.';
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
// Basic Fiber Information
interface Fiber {
    fiber_id?: number; // BIGSERIAL output, optional input
    manufacturer?: string;
    grade: string;
    batch_no: string;
    spinning_process_id?: number;
    linear_density_dtex?: number;
    filament_diameter_um?: number;
    filament_count?: number;
    source?: string;
    production_date?: string; // ISO 8601 date string
    image_path?: string;
    entry_date?: string; // ISO 8601 date string, output
    added_by?: string;
    remarks?: string;
}

// Performance Test Base - common fields for all performance tests
interface PerformanceTestData {
    test_id?: number; // BIGSERIAL output, optional input
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

interface FiberMolecularWeight extends PerformanceTestData {
    test_temperature_c?: number;
    viscosity_average_mw_g_mol?: number;
    gpc_mn_g_mol?: number;
    gpc_mw_g_mol?: number;
    gpc_pdi?: number;
}

interface FiberTensileProperties extends PerformanceTestData {
    test_standard?: string;
    temperature_c?: number;
    humidity_rh?: number;
    strain_rate_per_min?: number;
    gauge_length_mm?: number;
    tensile_strength_gpa?: number;
    tensile_strength_cn_dtex?: number;
    tensile_strength_cv_percent?: number;
    youngs_modulus_gpa?: number;
    youngs_modulus_cn_dtex?: number;
    youngs_modulus_cv_percent?: number;
    elongation_at_break_percent?: number;
    elongation_at_break_cv_percent?: number;
    work_of_fracture_j?: number;
    work_of_fracture_cv_percent?: number;
    stress_strain_curve_data_json?: string; // JSON string
}

interface FiberCreepProperties extends PerformanceTestData {
    test_standard?: string;
    temperature_c?: number;
    humidity_rh?: number;
    applied_load_force_n?: number;
    applied_stress_mpa?: number;
    creep_strain_percent_at_time_x?: number;
    creep_rate_percent_per_hour?: number;
    creep_time_h?: number;
    creep_rupture_time_h?: number;
}

interface FiberDynamicTensileProperties extends PerformanceTestData {
    test_standard?: string;
    temperature_c?: number;
    humidity_rh?: number;
    initial_elastic_modulus_gpa?: number;
    failure_stress_mpa?: number;
    instability_strain_percent?: number;
}

interface FiberThermalDsc extends PerformanceTestData {
    test_standard?: string;
    sample_mass_mg?: number;
    crucible_type?: string;
    temperature_range_c?: string;
    heating_rate_c_min?: number;
    protective_gas?: string;
    melting_peak_temperature_tm_c?: number;
    enthalpy_of_fusion_j_g?: number;
    crystallinity_percent?: number;
}

interface FiberThermalTga extends PerformanceTestData {
    test_standard?: string;
    sample_mass_mg?: number;
    crucible_type?: string;
    temperature_range_c?: string;
    heating_rate_c_min?: number;
    protective_gas?: string;
    decomposition_onset_c?: number;
    peak_decomposition_temp_c?: number;
    residue_percent?: number;
    component_description?: string;
}

interface FiberThermalConductivity extends PerformanceTestData {
    test_standard?: string;
    test_temperature_c?: number;
    thermal_conductivity_w_mk?: number;
    measurement_direction?: string;
}

// Composite interface for a Fiber with all its performance data
interface FiberWithPerformanceData extends Fiber {
    molecular_weights?: FiberMolecularWeight[];
    tensile_properties?: FiberTensileProperties[];
    creep_properties?: FiberCreepProperties[];
    dynamic_tensile_properties?: FiberDynamicTensileProperties[];
    thermal_dsc_tests?: FiberThermalDsc[];
    thermal_tga_tests?: FiberThermalTga[];
    thermal_conductivity_tests?: FiberThermalConductivity[];
}
```

### 接口端点

#### Fiber Base Information API
```
POST   /api/fibers.create     // 创建新纤维记录
POST   /api/fibers.list       // 获取纤维记录列表（支持分页和筛选）
POST   /api/fibers.get        // 获取单条纤维记录 (通过 fiber_id 或 batch_no)
POST   /api/fibers.update     // 更新纤维记录
POST   /api/fibers.delete     // 删除纤维记录
```

#### Fiber Performance Data API
(Generic structure, replace `{performance_type}` with specific types like `molecularWeight`, `tensileProperties`, etc.)
```
POST   /api/fibers/{fiber_id}/{performance_type}.add   // 为指定纤维添加性能测试记录
POST   /api/fibers/{fiber_id}/{performance_type}.list  // 获取指定纤维的所有特定类型性能测试记录
POST   /api/fibers/{performance_type}/{test_id}.get    // 获取特定性能测试记录详情
POST   /api/fibers/{performance_type}/{test_id}.update // 更新特定性能测试记录
POST   /api/fibers/{performance_type}/{test_id}.delete // 删除特定性能测试记录

POST   /api/fibers/{fiber_id}/performance.getAll // 获取指定纤维的所有性能数据
```
**Specific Examples:**
```
POST   /api/fibers/123/molecularWeight.add
POST   /api/fibers/123/molecularWeight.list
POST   /api/fibers/molecularWeight/456.get
POST   /api/fibers/molecularWeight/456.update
POST   /api/fibers/molecularWeight/456.delete

POST   /api/fibers/123/tensileProperties.add
// ... and so on for other properties
```

## API 接口文档

(Following the pattern of the template, detailing request/response for key endpoints. For brevity, only a few examples will be shown here.)

### 1. 创建纤维记录 (`/api/fibers.create`)

```typescript
POST /api/fibers.create

请求数据：
Fiber // (fiber_id, entry_date are usually handled by backend)

响应数据：
{
    success: boolean,
    data: Fiber // The created fiber with fiber_id and entry_date
}
```

### 2. 获取纤维列表 (`/api/fibers.list`)

```typescript
POST /api/fibers.list

请求参数：
{
    page?: number (页码，默认1)
    pageSize?: number (每页数量，默认10)
    search?: string (按牌号、批号、制造商搜索，可选)
    // Additional filters can be added
}

响应数据：
{
    total: number,
    items: Fiber[],
    page: number,
    pageSize: number
}
```

### 3. 获取单个纤维完整性能数据 (`/api/fibers/{fiber_id}/performance.getAll`)
```typescript
POST /api/fibers/{fiber_id}/performance.getAll

请求参数：
{
    fiber_id: number // or batch_no: string
}

响应数据：
FiberWithPerformanceData
```

### 4. 为指定纤维添加分子量测试记录 (`/api/fibers/{fiber_id}/molecularWeight.add`)
```typescript
POST /api/fibers/{fiber_id}/molecularWeight.add

请求路径参数:
fiber_id: number // ID of the fiber to associate this test with

请求数据:
Omit<FiberMolecularWeight, 'fiber_id' | 'test_id' | 'entry_date'> // fiber_id is from path, test_id/entry_date by backend

响应数据：
{
    success: boolean,
    data: FiberMolecularWeight // The created molecular weight record with test_id
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
    *   执行 `db/fiber_performance.sql` 脚本创建纤维及其性能相关表。
    *   确认外键、索引和约束已正确设置。

2.  **后端开发 (Node.js + Express + Prisma)**
    *   更新 Prisma schema (`schema.prisma`) 以包含纤维及性能相关模型。
    *   运行 `prisma generate`。
    *   为 `Fiber` 实现 CRUD 接口。
    *   为每种纤维性能表实现创建、读取（列表和单个）、更新、删除接口. Consider how these relate to a parent `Fiber` record.
    *   Implement `FiberWithPerformanceData` endpoint to aggregate all data.
    *   添加参数验证和错误处理。
    *   实现列表接口的分页和筛选。
    *   更新/生成 API 文档 (Swagger/OpenAPI).

3.  **前端开发 (Web Components + Lit Element)**
    *   开发纤维信息管理页面/组件。
    *   开发用于展示和编辑各个纤维性能数据的组件。 These might be sections within a larger fiber details view.
    *   实现列表展示 (支持分页、搜索、筛选纤维).
    *   实现表单组件用于创建/编辑纤维基本信息和各项性能数据。
    *   数据验证。
    *   调用后端 API。
    *   状态管理 for complex data structures if needed.

4.  **测试和优化**
    *   单元测试和集成测试 for backend services and API endpoints.
    *   前端组件测试.
    *   性能优化, especially for queries fetching combined fiber and performance data.
    *   用户体验优化.

5.  **部署**
    *   (As per template)

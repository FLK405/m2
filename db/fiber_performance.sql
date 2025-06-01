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

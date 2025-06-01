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

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

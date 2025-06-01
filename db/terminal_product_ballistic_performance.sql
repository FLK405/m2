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

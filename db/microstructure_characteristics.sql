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

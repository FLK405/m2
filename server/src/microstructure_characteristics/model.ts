import { Pool } from 'pg';

// Replicating pool configuration. Consider refactoring to a shared utility if identical.
export const pool = new Pool({
  user: process.env.DB_USER || 'process_owner',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'UHMWPE_Ballistic_DB',
  password: process.env.DB_PASSWORD || 'password',
  port: parseInt(process.env.DB_PORT || '5432', 10),
});

// Base interface for common microstructure test data fields
// SEM is slightly different as its PK is 'id' not 'test_id' in the DB
interface BaseMicrostructureTestData {
  fiber_id: number; // Foreign Key to Fiber
  test_date?: string | null; // TIMESTAMP WITH TIME ZONE
  testing_institution?: string | null;
  test_equipment?: string | null;
  result_chart_path?: string | null;
  raw_data_path?: string | null;
  entry_date?: string | null; // TIMESTAMP WITH TIME ZONE
  added_by?: string | null;
  remarks?: string | null;
}

export interface FiberMicrostructurePhaseStructure extends BaseMicrostructureTestData {
  test_id?: number; // BIGSERIAL
  test_method: string; // 'NMR' or 'Raman'
  amorphous_phase_percent_nmr?: number | null; // DECIMAL
  intermediate_phase_percent_nmr?: number | null; // DECIMAL
  crystalline_phase_percent_nmr?: number | null; // DECIMAL
  defective_crystalline_percent_nmr?: number | null; // DECIMAL
  crystallinity_percent_raman?: number | null; // DECIMAL
  characteristic_peaks_raman?: string | null; // TEXT
}

export interface FiberMicrostructureOrientationCrystallinity extends BaseMicrostructureTestData {
  test_id?: number; // BIGSERIAL
  test_method: string; // 'WAXD', 'SAXS', 'SonicModulus'
  crystal_size_nm_waxd?: number | null; // DECIMAL
  orientation_factor_waxd?: number | null; // DECIMAL
  d_spacing_waxd?: string | null; // TEXT
  sound_velocity_mps?: number | null; // DECIMAL
  orientation_factor_sonic?: number | null; // DECIMAL
  modulus_sonic_gpa?: number | null; // DECIMAL
}

export interface FiberMicrostructureSem {
  id?: number; // BIGSERIAL - Primary Key for SEM table
  fiber_id: number; // Foreign Key to Fiber
  test_date?: string | null; // TIMESTAMP WITH TIME ZONE
  testing_institution?: string | null;
  test_equipment?: string | null;
  sample_name_sem?: string | null;
  magnification?: string | null;
  accelerating_voltage_kv?: number | null; // DECIMAL
  image_path: string; // VARCHAR(500) NOT NULL
  morphology_description_special_features?: string | null; // TEXT
  analysis_results?: string | null; // TEXT
  entry_date?: string | null; // TIMESTAMP WITH TIME ZONE
  added_by?: string | null;
  remarks?: string | null;
}

export interface FiberMicrostructureXps extends BaseMicrostructureTestData {
  test_id?: number; // BIGSERIAL
  carbon_at_percent?: number | null; // DECIMAL
  oxygen_at_percent?: number | null; // DECIMAL
  nitrogen_at_percent?: number | null; // DECIMAL
  other_elements_xps?: string | null; // TEXT
  chemical_state_info_xps?: string | null; // TEXT
}

// Optional: Composite interface for a Fiber with all its microstructure data
// This would typically also include the Fiber basic info.
/*
export interface FiberWithMicrostructureData {
  fiber_id: number;
  // ... other fiber properties from Fiber interface ...
  phase_structures?: FiberMicrostructurePhaseStructure[];
  orientation_crystallinity_tests?: FiberMicrostructureOrientationCrystallinity[];
  sem_images?: FiberMicrostructureSem[];
  xps_analyses?: FiberMicrostructureXps[];
}
*/

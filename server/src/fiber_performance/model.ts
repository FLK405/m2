import { Pool } from 'pg';

// TODO: Consider refactoring to a shared DB pool if connection details are identical.
export const pool = new Pool({
  user: process.env.DB_USER || 'process_owner',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'UHMWPE_Ballistic_DB',
  password: process.env.DB_PASSWORD || 'password',
  port: parseInt(process.env.DB_PORT || '5432', 10),
});

// Base interface for common test data fields
export interface PerformanceTestData {
  test_id?: number; // Optional as it's auto-generated (BIGSERIAL)
  fiber_id: number;
  test_date?: string | null; // TIMESTAMP WITH TIME ZONE can be string or Date in TS
  testing_institution?: string | null;
  test_equipment?: string | null;
  result_chart_path?: string | null;
  raw_data_path?: string | null;
  entry_date?: string | null; // TIMESTAMP WITH TIME ZONE
  added_by?: string | null;
  remarks?: string | null;
}

// --- Fiber Base Information ---
export interface Fiber {
  fiber_id?: number; // BIGSERIAL
  manufacturer?: string | null;
  grade: string;
  batch_no: string;
  spinning_process_id?: number | null;
  linear_density_dtex?: number | null; // DECIMAL
  filament_diameter_um?: number | null; // DECIMAL
  filament_count?: number | null; // INTEGER
  source?: string | null;
  production_date?: string | null; // TIMESTAMP WITH TIME ZONE
  image_path?: string | null;
  entry_date?: string | null; // TIMESTAMP WITH TIME ZONE
  added_by?: string | null;
  remarks?: string | null;
}

// --- Fiber Performance Tables ---

export interface FiberMolecularWeight extends PerformanceTestData {
  test_temperature_c?: number | null; // INTEGER
  viscosity_average_mw_g_mol?: string | null; // BIGINT can be string for precision
  gpc_mn_g_mol?: number | null; // DECIMAL
  gpc_mw_g_mol?: number | null; // DECIMAL
  gpc_pdi?: number | null; // DECIMAL
}

export interface FiberTensileProperties extends PerformanceTestData {
  test_standard?: string | null;
  temperature_c?: number | null; // DECIMAL
  humidity_rh?: number | null; // DECIMAL
  strain_rate_per_min?: number | null; // DECIMAL
  gauge_length_mm?: number | null; // DECIMAL
  tensile_strength_gpa?: number | null; // DECIMAL
  tensile_strength_cn_dtex?: number | null; // DECIMAL
  tensile_strength_cv_percent?: number | null; // DECIMAL
  youngs_modulus_gpa?: number | null; // DECIMAL
  youngs_modulus_cn_dtex?: number | null; // DECIMAL
  youngs_modulus_cv_percent?: number | null; // DECIMAL
  elongation_at_break_percent?: number | null; // DECIMAL
  elongation_at_break_cv_percent?: number | null; // DECIMAL
  work_of_fracture_j?: number | null; // DECIMAL
  work_of_fracture_cv_percent?: number | null; // DECIMAL
  stress_strain_curve_data_json?: string | null; // TEXT
}

export interface FiberCreepProperties extends PerformanceTestData {
  test_standard?: string | null;
  temperature_c?: number | null; // DECIMAL
  humidity_rh?: number | null; // DECIMAL
  applied_load_force_n?: number | null; // DECIMAL
  applied_stress_mpa?: number | null; // DECIMAL
  creep_strain_percent_at_time_x?: number | null; // DECIMAL
  creep_rate_percent_per_hour?: number | null; // DECIMAL
  creep_time_h?: number | null; // DECIMAL
  creep_rupture_time_h?: number | null; // DECIMAL
}

export interface FiberDynamicTensileProperties extends PerformanceTestData {
  test_standard?: string | null;
  temperature_c?: number | null; // DECIMAL
  humidity_rh?: number | null; // DECIMAL
  initial_elastic_modulus_gpa?: number | null; // DECIMAL
  failure_stress_mpa?: number | null; // DECIMAL
  instability_strain_percent?: number | null; // DECIMAL
}

export interface FiberThermalDsc extends PerformanceTestData {
  test_standard?: string | null;
  sample_mass_mg?: number | null; // DECIMAL
  crucible_type?: string | null;
  temperature_range_c?: string | null;
  heating_rate_c_min?: number | null; // DECIMAL
  protective_gas?: string | null;
  melting_peak_temperature_tm_c?: number | null; // DECIMAL
  enthalpy_of_fusion_j_g?: number | null; // DECIMAL
  crystallinity_percent?: number | null; // DECIMAL
}

export interface FiberThermalTga extends PerformanceTestData {
  test_standard?: string | null;
  sample_mass_mg?: number | null; // DECIMAL
  crucible_type?: string | null;
  temperature_range_c?: string | null;
  heating_rate_c_min?: number | null; // DECIMAL
  protective_gas?: string | null;
  decomposition_onset_c?: number | null; // DECIMAL
  peak_decomposition_temp_c?: number | null; // DECIMAL
  residue_percent?: number | null; // DECIMAL
  component_description?: string | null; // TEXT
}

export interface FiberThermalConductivity extends PerformanceTestData {
  test_standard?: string | null;
  test_temperature_c?: number | null; // DECIMAL
  thermal_conductivity_w_mk?: number | null; // DECIMAL
  measurement_direction?: string | null;
}

// Composite interface for a Fiber with all its performance data (optional)
export interface FiberWithPerformanceData extends Fiber {
  molecular_weights?: FiberMolecularWeight[];
  tensile_properties?: FiberTensileProperties[];
  creep_properties?: FiberCreepProperties[];
  dynamic_tensile_properties?: FiberDynamicTensileProperties[];
  thermal_dsc_tests?: FiberThermalDsc[];
  thermal_tga_tests?: FiberThermalTga[];
  thermal_conductivity_tests?: FiberThermalConductivity[];
}

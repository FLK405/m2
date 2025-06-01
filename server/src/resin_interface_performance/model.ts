import { Pool } from 'pg';

// Replicating pool configuration. Consider refactoring to a shared utility.
export const pool = new Pool({
  user: process.env.DB_USER || 'process_owner',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'UHMWPE_Ballistic_DB',
  password: process.env.DB_PASSWORD || 'password',
  port: parseInt(process.env.DB_PORT || '5432', 10),
});

// Base interface for common test data fields, can be shared if identical fields exist
interface BaseTestProperties {
  test_id?: number; // BIGSERIAL (optional on create)
  test_standard?: string | null;
  test_date?: string | null; // TIMESTAMP WITH TIME ZONE
  testing_institution?: string | null;
  test_equipment?: string | null;
  result_chart_path?: string | null;
  raw_data_path?: string | null;
  entry_date?: string | null; // TIMESTAMP WITH TIME ZONE (usually set by DB)
  added_by?: string | null;
  remarks?: string | null;
}

export interface ResinTensileProperties extends BaseTestProperties {
  resin_id: number; // Foreign Key to resins table
  specimen_type?: string | null;
  test_rate_mm_min?: number | null; // DECIMAL
  temperature_c?: number | null; // DECIMAL
  tensile_strength_mpa?: number | null; // DECIMAL
  tensile_strength_cv_percent?: number | null; // DECIMAL
  youngs_modulus_mpa?: number | null; // DECIMAL
  youngs_modulus_cv_percent?: number | null; // DECIMAL
  elongation_at_break_percent?: number | null; // DECIMAL
  elongation_at_break_cv_percent?: number | null; // DECIMAL
}

export interface FiberResinInterfacialProperties extends BaseTestProperties {
  fiber_id: number; // Foreign Key to fibers table
  resin_id: number; // Foreign Key to resins table
  test_method_detail?: string | null; // TEXT
  contact_angle_degrees?: number | null; // DECIMAL
  interfacial_shear_strength_ifss_mpa?: number | null; // DECIMAL
  bond_strength_mpa?: number | null; // DECIMAL
  failure_mode_interface?: string | null; // TEXT
}

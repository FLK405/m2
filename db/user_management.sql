-- PostgreSQL DDL for Roles and Users tables

-- Roles Table
DROP TABLE IF EXISTS roles CASCADE;
CREATE TABLE roles (
    role_id SERIAL PRIMARY KEY,
    role_name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT
);

COMMENT ON TABLE roles IS 'Stores user roles within the system.';
COMMENT ON COLUMN roles.role_id IS 'Unique identifier for the role.';
COMMENT ON COLUMN roles.role_name IS 'Name of the role (e.g., Administrator, Researcher, User). Should be unique.';
COMMENT ON COLUMN roles.description IS 'Detailed description of the role and its responsibilities.';

-- Users Table
DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
    user_id BIGSERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    email VARCHAR(255) UNIQUE,
    full_name VARCHAR(200),
    role_id INT,
    is_active BOOLEAN DEFAULT TRUE,
    last_login_date TIMESTAMP WITH TIME ZONE,
    date_created TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES roles(role_id)
);

COMMENT ON TABLE users IS 'Stores user account information.';
COMMENT ON COLUMN users.user_id IS 'Unique identifier for the user.';
COMMENT ON COLUMN users.username IS 'Login username for the user. Should be unique.';
COMMENT ON COLUMN users.password_hash IS 'Hashed password for user authentication.';
COMMENT ON COLUMN users.email IS 'Email address of the user. Should be unique if provided.';
COMMENT ON COLUMN users.full_name IS 'Full name of the user.';
COMMENT ON COLUMN users.role_id IS 'Foreign key referencing the role assigned to the user.';
COMMENT ON COLUMN users.is_active IS 'Flag indicating if the user account is active (TRUE) or inactive (FALSE). Defaults to TRUE.';
COMMENT ON COLUMN users.last_login_date IS 'Timestamp of the last successful login by the user.';
COMMENT ON COLUMN users.date_created IS 'Timestamp of when the user account was created. Defaults to the current timestamp.';

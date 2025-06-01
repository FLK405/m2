import { Pool } from "pg";

// 纺丝工艺记录类型定义
export interface SpinningProcess {
    id: number;
    fiber_batch_no: string;
    resin_id: string;
    resin_grade?: string;
    resin_mn?: number;
    resin_mw?: number;
    resin_pdi?: number;
    resin_crystallinity?: number;
    resin_melting_point?: number;
    solution_concentration?: number;
    spinning_temp?: number;
    screw_speed?: number;
    bath_composition?: string;
    bath_temp?: number;
    drawing_temp?: number;
    drawing_ratio?: number;
    solvent_removal?: string;
    post_process?: string;
    created_at: Date;
    updated_at: Date;
}

/**
 * PostgreSQL数据库连接池配置
 * 使用环境变量进行配置，如果环境变量未设置则使用默认值
 * 默认配置：
 * - 用户: postgres
 * - 主机: localhost
 * - 数据库: material
 * - 密码: postgres
 * - 端口: 5432
 */
export const pool = new Pool({
    user: process.env["DB_USER"] || "material",
    host: process.env["DB_HOST"] || "localhost",
    database: process.env["DB_NAME"] || "material",
    password: process.env["DB_PASSWORD"] || "test123",
    port: parseInt(process.env["DB_PORT"] || "5432"),
});

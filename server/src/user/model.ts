/**
 * 用户模型定义和数据库连接配置
 * 该文件包含用户实体的接口定义以及PostgreSQL数据库连接池的配置
 */

import { Pool } from "pg";

/**
 * 用户实体接口定义
 */
export interface User {
    /** 用户唯一标识符 */
    id?: number;
    /** 用户名 */
    username: string;
    /** 用户密码 */
    password: string;
    /** 用户昵称 */
    nickname?: string;
    /** 用户邮箱 */
    email?: string;
    /** 用户电话 */
    phone?: string;
    /** 用户权限等级 0:超级管理员 1:管理员 2:普通用户 */
    role_level: number;
    /** 用户状态 */
    status: number;
    /** 创建时间 */
    created_at?: Date;
    /** 更新时间 */
    updated_at?: Date;
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

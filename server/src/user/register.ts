import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { pool, User } from "./model.js";

// 用户注册路由
const register = async (req: Request, res: Response) => {
    try {
        const { username, password, nickname, email, phone, role_level = 2 } = req.body;

        // 验证必填字段
        if (!username || !password) {
            return res.status(400).json({
                code: 400,
                message: "用户名和密码为必填项",
            });
        }

        // 检查用户名是否已存在
        const userExists = await pool.query("SELECT * FROM users WHERE username = $1", [username]);

        if (userExists.rows.length > 0) {
            return res.status(400).json({
                code: 400,
                message: "用户名已被注册",
            });
        }

        // 加密密码
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 创建新用户
        const newUser: User = {
            username,
            password: hashedPassword,
            nickname,
            email,
            phone,
            role_level,
            status: 1, // 默认启用状态
        };

        const result = await pool.query(
            `INSERT INTO users (
                username, password, nickname, email, phone, role_level, status, created_at, updated_at
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
            RETURNING id, username, nickname, email, phone, role_level, status, created_at`,
            [
                newUser.username,
                newUser.password,
                newUser.nickname,
                newUser.email,
                newUser.phone,
                newUser.role_level,
                newUser.status,
            ]
        );

        return res.status(201).json({
            code: 0,
            message: "注册成功",
            data: result.rows[0],
        });
    } catch (error) {
        console.error("注册失败:", error);
        return res.status(500).json({
            code: 500,
            message: "服务器错误",
        });
    }
};

export default register;

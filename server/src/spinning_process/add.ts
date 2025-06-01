import { Request, Response } from "express";
import { pool } from "./model.js";

// 创建新的纺丝工艺记录
const add = async (req: Request, res: Response) => {
    const client = await pool.connect();
    try {
        // 开始事务
        await client.query('BEGIN');
        
        const {
            fiber_batch_no,
            resin_id,
            resin_grade,
            resin_mn,
            resin_mw,
            resin_pdi,
            resin_crystallinity,
            resin_melting_point,
            solution_concentration,
            spinning_temp,
            screw_speed,
            bath_composition,
            bath_temp,
            drawing_temp,
            drawing_ratio,
            solvent_removal,
            post_process,
        } = req.body;

        // 验证必填字段
        if (!fiber_batch_no || !resin_id) {
            await client.query('ROLLBACK');
            return res.status(400).json({
                code: 400,
                message: "纤维批号和树脂ID为必填项",
            });
        }

        // 检查纤维批号是否已存在
        const batchExists = await client.query("SELECT * FROM spinning_process WHERE fiber_batch_no = $1", [
            fiber_batch_no,
        ]);

        if (batchExists.rows.length > 0) {
            await client.query('ROLLBACK');
            return res.status(400).json({
                code: 400,
                message: "该纤维批号已存在",
            });
        }

        // 创建新记录
        const result = await client.query(
            `INSERT INTO spinning_process (
                fiber_batch_no,
                resin_id,
                resin_grade,
                resin_mn,
                resin_mw,
                resin_pdi,
                resin_crystallinity,
                resin_melting_point,
                solution_concentration,
                spinning_temp,
                screw_speed,
                bath_composition,
                bath_temp,
                drawing_temp,
                drawing_ratio,
                solvent_removal,
                post_process,
                created_at,
                updated_at
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
            RETURNING *`,
            [
                fiber_batch_no,
                resin_id,
                resin_grade,
                resin_mn,
                resin_mw,
                resin_pdi,
                resin_crystallinity,
                resin_melting_point,
                solution_concentration,
                spinning_temp,
                screw_speed,
                bath_composition,
                bath_temp,
                drawing_temp,
                drawing_ratio,
                solvent_removal,
                post_process,
            ]
        );

        // 提交事务
        await client.query('COMMIT');
        
        // 添加日志记录
        console.log(`✅ 纺丝工艺记录创建成功 - ID: ${result.rows[0].id}, 批号: ${result.rows[0].fiber_batch_no}, 时间: ${new Date().toISOString()}`);

        return res.status(201).json({
            code: 0,
            message: "创建成功",
            data: result.rows[0],
        });
    } catch (error) {
        // 回滚事务
        await client.query('ROLLBACK');
        console.error("创建纺丝工艺记录失败:", error);
        return res.status(500).json({
            code: 500,
            message: "服务器错误",
        });
    } finally {
        // 释放客户端连接
        client.release();
    }
};

export default add;

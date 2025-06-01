import { Request, Response } from "express";
import { pool } from "./model.js";

// 获取纺丝工艺记录列表
const list = async (req: Request, res: Response) => {
    try {
        const { page = 1, pageSize = 10, search = "", startDate, endDate } = req.body;

        // 构建基础查询
        let query = "SELECT * FROM spinning_process WHERE 1=1";
        const params: any[] = [];
        let paramIndex = 1;

        // 添加搜索条件
        if (search) {
            query += ` AND (
                fiber_batch_no ILIKE $${paramIndex} OR
                resin_id ILIKE $${paramIndex} OR
                resin_grade ILIKE $${paramIndex}
            )`;
            params.push(`%${search}%`);
            paramIndex++;
        }

        // 添加日期筛选
        if (startDate) {
            query += ` AND created_at >= $${paramIndex}`;
            params.push(startDate);
            paramIndex++;
        }
        if (endDate) {
            query += ` AND created_at <= $${paramIndex}`;
            params.push(endDate);
            paramIndex++;
        }

        // 获取总记录数
        const countQuery = query.replace("SELECT *", "SELECT COUNT(*)");
        const countResult = await pool.query(countQuery, params);
        const total = parseInt(countResult.rows[0].count);

        // 添加排序和分页
        query += ` ORDER BY created_at DESC LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`;
        params.push(pageSize, (page - 1) * pageSize);

        // 执行查询
        const result = await pool.query(query, params);

        return res.json({
            code: 0,
            message: "获取成功",
            data: {
                total,
                items: result.rows,
                page: parseInt(page),
                pageSize: parseInt(pageSize),
            },
        });
    } catch (error) {
        console.error("获取纺丝工艺记录列表失败:", error);
        return res.status(500).json({
            code: 500,
            message: "服务器错误",
        });
    }
};

export default list;

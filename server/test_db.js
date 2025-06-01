import { Pool } from "pg";

// 数据库连接配置（与应用相同）
const pool = new Pool({
    user: process.env["DB_USER"] || "material",
    host: process.env["DB_HOST"] || "localhost", 
    database: process.env["DB_NAME"] || "material",
    password: process.env["DB_PASSWORD"] || "test123",
    port: parseInt(process.env["DB_PORT"] || "5432"),
});

async function testDatabase() {
    console.log("🚀 开始测试数据库连接...");
    console.log("📋 连接配置:", {
        user: process.env["DB_USER"] || "material",
        host: process.env["DB_HOST"] || "localhost",
        database: process.env["DB_NAME"] || "material", 
        password: "***",
        port: parseInt(process.env["DB_PORT"] || "5432"),
    });
    
    console.log("🔍 环境变量检查:");
    console.log("  DB_USER:", process.env["DB_USER"] || "未设置");
    console.log("  DB_HOST:", process.env["DB_HOST"] || "未设置");
    console.log("  DB_NAME:", process.env["DB_NAME"] || "未设置");
    console.log("  DB_PORT:", process.env["DB_PORT"] || "未设置");

    try {
        // 测试连接
        const client = await pool.connect();
        console.log("✅ 数据库连接成功");

        // 查询表结构
        const tableInfo = await client.query(`
            SELECT column_name, data_type, is_nullable 
            FROM information_schema.columns 
            WHERE table_name = 'spinning_process'
            ORDER BY ordinal_position
        `);
        console.log("📋 表结构:", tableInfo.rows);

        // 查询现有数据
        const existingData = await client.query("SELECT COUNT(*) as count FROM spinning_process");
        console.log("📊 现有记录数:", existingData.rows[0].count);

        // 测试插入数据
        console.log("🧪 测试插入数据...");
        const testData = {
            fiber_batch_no: "TEST_BATCH_" + Date.now(),
            resin_id: "TEST_RESIN_001",
            resin_grade: "测试牌号",
            resin_mn: 1000.50,
            resin_mw: 2000.75
        };

        const insertResult = await client.query(
            `INSERT INTO spinning_process (
                fiber_batch_no, resin_id, resin_grade, resin_mn, resin_mw,
                created_at, updated_at
            ) VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
            RETURNING id, fiber_batch_no, created_at`,
            [testData.fiber_batch_no, testData.resin_id, testData.resin_grade, testData.resin_mn, testData.resin_mw]
        );

        console.log("✅ 数据插入成功:", insertResult.rows[0]);

        // 再次查询记录数
        const newCount = await client.query("SELECT COUNT(*) as count FROM spinning_process");
        console.log("📊 插入后记录数:", newCount.rows[0].count);

        // 查询刚插入的数据
        const insertedData = await client.query(
            "SELECT * FROM spinning_process WHERE fiber_batch_no = $1",
            [testData.fiber_batch_no]
        );
        console.log("🔍 插入的数据:", insertedData.rows[0]);

        client.release();
        console.log("✅ 测试完成");
        
    } catch (error) {
        console.error("❌ 数据库测试失败:", error);
        console.error("错误详情:", error.message);
        if (error.code) {
            console.error("错误代码:", error.code);
        }
    } finally {
        await pool.end();
    }
}

testDatabase();

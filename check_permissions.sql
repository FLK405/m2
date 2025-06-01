-- 检查用户权限的SQL脚本
-- 在pgAdmin中执行以下查询来检查权限

-- 检查当前用户
SELECT current_user;

-- 检查表权限
SELECT 
    table_name,
    privilege_type,
    grantee,
    grantor
FROM information_schema.table_privileges 
WHERE table_name = 'spinning_process'
AND grantee = 'material';

-- 检查表的所有者
SELECT 
    schemaname,
    tablename,
    tableowner
FROM pg_tables 
WHERE tablename = 'spinning_process';

-- 查看最新的5条记录
SELECT 
    id,
    fiber_batch_no,
    resin_id,
    created_at
FROM spinning_process 
ORDER BY created_at DESC 
LIMIT 5;

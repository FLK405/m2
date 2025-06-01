# 测试文件说明

## 保留的测试文件

### 1. 数据库连接测试
**文件**: `server/test_db.js`
**用途**: 测试 PostgreSQL 数据库连接和基本功能
**使用方法**:
```bash
cd server
node test_db.js
```

### 2. WSL2 连接测试脚本
**文件**: `test_wsl2_connection.sh`
**用途**: 专门针对 WSL2 环境的数据库连接测试，包括不同 IP 地址的连接验证
**使用方法**:
```bash
chmod +x test_wsl2_connection.sh
./test_wsl2_connection.sh
```

### 3. WSL2 连接指南
**文件**: `wsl2_connection_guide.md`
**用途**: WSL2 环境下 PostgreSQL 连接的详细指南和故障排除

### 4. pgAdmin 连接最终解决方案
**文件**: `pgadmin_connection_final.md`
**用途**: pgAdmin 连接问题的最终解决方案记录

### 5. 权限检查 SQL
**文件**: `check_permissions.sql`
**用途**: 检查数据库权限的 SQL 脚本

## 已删除的文件

以下文件已被删除，因为它们是重复的、过时的或不必要的：

- `test_db.js` (根目录) - 与 server/test_db.js 重复
- `test_connection.sh` - 被 test_wsl2_connection.sh 取代
- `validate_pgadmin_connection.sh` - 功能重复
- `pgadmin_debug.sh` - 调试脚本，不再需要
- `pgadmin_connection_guide.md` - 旧版指南
- `pgadmin_troubleshoot.md` - 故障排除文档
- 错误的文件名（命令执行结果误保存的文件）

## 推荐的测试流程

1. **数据库连接测试**:
   ```bash
   cd server && node test_db.js
   ```

2. **WSL2 环境完整测试**:
   ```bash
   ./test_wsl2_connection.sh
   ```

3. **参考文档**: 查看 `wsl2_connection_guide.md` 了解连接配置

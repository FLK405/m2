# WSL2 PostgreSQL 连接指南

## 问题说明
在 WSL2 环境中，网络配置有特殊性：
- **WSL2 IP**: `172.27.69.176` (每次重启可能会变化)
- **本地回环**: `127.0.0.1` (仅在 WSL2 内部有效)

## 连接场景

### 1. 从 WSL2 内部连接（命令行、终端应用）
使用 `127.0.0.1` 或 `localhost`：
```bash
PGPASSWORD=test123 psql -h 127.0.0.1 -U material -d material
```

### 2. 从 Windows 主机连接（pgAdmin、DBeaver 等图形工具）
使用 WSL2 的实际 IP 地址 `172.27.69.176`：
- **主机**: `172.27.69.176`
- **端口**: `5432`
- **用户**: `material`
- **密码**: `test123`
- **数据库**: `material`

### 3. Web 应用连接
取决于应用运行位置：
- **在 WSL2 内运行**: 使用 `127.0.0.1`
- **在 Windows 上运行**: 使用 `172.27.69.176`

## 动态 IP 问题解决方案

WSL2 的 IP 地址在每次重启后可能会改变。以下是获取当前 IP 的方法：

### 在 WSL2 中获取 IP
```bash
# 方法1：查看网卡信息
ip addr show eth0 | grep "inet " | awk '{print $2}' | cut -d/ -f1

# 方法2：使用 hostname 命令
hostname -I | awk '{print $1}'
```

### 在 Windows 中获取 WSL2 IP
```cmd
wsl hostname -I
```

## 推荐的配置方法

### 1. 环境变量配置
在您的应用中使用环境变量：
```bash
# 在 WSL2 内部
export DB_HOST=127.0.0.1

# 从 Windows 连接
export DB_HOST=172.27.69.176
```

### 2. 自动检测脚本
创建一个脚本自动检测运行环境：
```bash
#!/bin/bash
if grep -qi microsoft /proc/version && [ -n "$WSL_DISTRO_NAME" ]; then
    # 在 WSL2 内部
    DB_HOST="127.0.0.1"
else
    # 在其他环境
    DB_HOST=$(ip addr show eth0 | grep "inet " | awk '{print $2}' | cut -d/ -f1)
fi
echo "使用数据库主机: $DB_HOST"
```

## 常见问题解决

### 问题1：pgAdmin 无法连接
**解决方案**: 
- 确保使用 `172.27.69.176` 而不是 `127.0.0.1`
- 检查 Windows 防火墙是否阻止了 5432 端口

### 问题2：Web 应用无法连接
**解决方案**:
- 检查应用运行环境
- 更新应用配置中的数据库主机地址

### 问题3：IP 地址频繁变化
**解决方案**:
- 使用固定的 WSL2 IP（需要高级配置）
- 或者在应用中实现动态 IP 检测

## 测试连接
```bash
# 从 WSL2 内部测试
./test_wsl2_connection.sh
```

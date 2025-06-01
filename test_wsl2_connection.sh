#!/bin/bash

echo "=== WSL2 PostgreSQL 连接测试 ==="
echo

# 获取 WSL2 IP 地址
WSL2_IP=$(ip addr show eth0 | grep "inet " | awk '{print $2}' | cut -d/ -f1)
echo "检测到的 WSL2 IP 地址: $WSL2_IP"
echo

# 测试连接参数
USER="material"
DATABASE="material"
PASSWORD="test123"
PORT="5432"

echo "=== 连接测试 ==="

# 测试1: 127.0.0.1 连接（WSL2 内部）
echo "1. 测试 127.0.0.1 连接（WSL2 内部使用）:"
PGPASSWORD=$PASSWORD timeout 10 psql -h 127.0.0.1 -p $PORT -U $USER -d $DATABASE -c "
SELECT 
    'WSL2内部连接成功' as status,
    current_user,
    inet_server_addr() as server_ip,
    inet_server_port() as server_port;
" 2>&1

if [ $? -eq 0 ]; then
    echo "✅ 127.0.0.1 连接成功"
else
    echo "❌ 127.0.0.1 连接失败"
fi
echo

# 测试2: WSL2 IP 连接（Windows 主机使用）
echo "2. 测试 WSL2 IP 连接（Windows 主机使用）:"
PGPASSWORD=$PASSWORD timeout 10 psql -h $WSL2_IP -p $PORT -U $USER -d $DATABASE -c "
SELECT 
    'Windows主机连接成功' as status,
    current_user,
    inet_server_addr() as server_ip,
    inet_server_port() as server_port;
" 2>&1

if [ $? -eq 0 ]; then
    echo "✅ WSL2 IP ($WSL2_IP) 连接成功"
else
    echo "❌ WSL2 IP ($WSL2_IP) 连接失败"
fi
echo

# 测试3: localhost 连接
echo "3. 测试 localhost 连接:"
PGPASSWORD=$PASSWORD timeout 10 psql -h localhost -p $PORT -U $USER -d $DATABASE -c "
SELECT 
    'localhost连接成功' as status,
    current_user,
    current_database();
" 2>&1

if [ $? -eq 0 ]; then
    echo "✅ localhost 连接成功"
else
    echo "❌ localhost 连接失败"
fi
echo

echo "=== 连接建议 ==="
echo
echo "📋 **pgAdmin 连接配置（从 Windows 主机）**:"
echo "   主机名/地址: $WSL2_IP"
echo "   端口: $PORT"
echo "   用户名: $USER"
echo "   密码: $PASSWORD"
echo "   数据库: $DATABASE"
echo "   SSL 模式: Disable"
echo
echo "📋 **应用程序连接配置（在 WSL2 内部）**:"
echo "   主机: 127.0.0.1 或 localhost"
echo "   端口: $PORT"
echo "   用户: $USER"
echo "   密码: $PASSWORD"
echo "   数据库: $DATABASE"
echo

echo "=== 环境变量建议 ==="
echo "在 WSL2 内部运行应用时，使用:"
echo "export DB_HOST=127.0.0.1"
echo
echo "从 Windows 连接时，使用:"
echo "export DB_HOST=$WSL2_IP"
echo

echo "=== 自动获取 WSL2 IP 的命令 ==="
echo "在 WSL2 中:"
echo "ip addr show eth0 | grep 'inet ' | awk '{print \$2}' | cut -d/ -f1"
echo
echo "在 Windows PowerShell 中:"
echo "wsl hostname -I"
echo

echo "=== 注意事项 ==="
echo "⚠️  WSL2 的 IP 地址在每次重启后可能会改变"
echo "⚠️  从 Windows 访问 WSL2 服务时，必须使用 WSL2 的实际 IP 地址"
echo "⚠️  从 WSL2 内部访问本地服务时，使用 127.0.0.1 或 localhost"

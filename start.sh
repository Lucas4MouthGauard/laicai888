#!/bin/bash

echo "🧧 启动八方来财挂玉台..."
echo "📱 项目将在浏览器中打开"
echo "🌐 访问地址: http://localhost:8000"
echo ""

# 检查Python是否可用
if command -v python3 &> /dev/null; then
    echo "🚀 使用 Python3 启动服务器..."
    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    echo "🚀 使用 Python 启动服务器..."
    python -m http.server 8000
else
    echo "❌ 错误: 未找到 Python，请安装 Python 后重试"
    echo "💡 或者直接用浏览器打开 index.html 文件"
    exit 1
fi 
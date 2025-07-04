// 全局变量
let currentSection = 0;
let worshipCount = 0;
let selectedJade = '';
let isGenerating = false;

// 玉牌数据
const jadeData = [
    {
        name: "财神暴富玉",
        fortune: "你今日不缺财，就缺这块玉。",
        emoji: "💎"
    },
    {
        name: "摸金校尉玉", 
        fortune: "好运排队来，就等你挂玉。",
        emoji: "🏮"
    },
    {
        name: "打工护体玉",
        fortune: "今日挂玉，明日加薪。",
        emoji: "🧧"
    },
    {
        name: "八方来财玉",
        fortune: "四面八方，财源滚滚。",
        emoji: "💰"
    },
    {
        name: "锦鲤护体玉",
        fortune: "锦鲤附体，好运连连。",
        emoji: "🐟"
    }
];

// 财运语库
const fortuneTexts = [
    "你今日不缺财，就缺这块玉。",
    "好运排队来，就等你挂玉。",
    "今日挂玉，明日加薪。",
    "四面八方，财源滚滚。",
    "锦鲤附体，好运连连。",
    "挂玉一时爽，一直挂玉一直爽。",
    "玉牌在手，财运我有。",
    "虔诚挂玉，财神眷顾。"
];

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 隐藏加载动画
    setTimeout(() => {
        document.getElementById('loadingOverlay').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('loadingOverlay').style.display = 'none';
        }, 500);
    }, 2000);

    // 绑定事件监听器
    bindEventListeners();
    
    // 开始弹幕
    startDanmaku();
});

// 绑定事件监听器
function bindEventListeners() {
    // 开始挂玉按钮
    document.getElementById('startHanging').addEventListener('click', startHangingProcess);
    
    // 玉牌选择
    document.querySelectorAll('.jade-card').forEach(card => {
        card.addEventListener('click', selectJade);
    });
    
    // 拜拜按钮
    document.getElementById('worshipButton').addEventListener('click', performWorship);
    
    // 保存图片按钮
    document.getElementById('saveImage').addEventListener('click', saveImage);
    
    // 分享按钮
    document.getElementById('shareWechat').addEventListener('click', shareToWechat);
    
    // 留言提交
    document.getElementById('submitMessage').addEventListener('click', submitMessage);
    
    // 回车提交留言
    document.getElementById('messageInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            submitMessage();
        }
    });
}

// 开始挂玉流程
function startHangingProcess() {
    // 播放音效
    playSound('click');
    
    // 隐藏Hero区域，显示香炉区域
    hideSection('hero');
    showSection('incenseSection');
    
    // 添加香炉动画
    animateIncenseAltar();
}

// 选择玉牌
function selectJade(e) {
    const card = e.currentTarget;
    selectedJade = card.dataset.jade;
    
    // 播放音效
    playSound('select');
    
    // 添加选中动画
    card.style.transform = 'scale(1.2)';
    card.style.boxShadow = '0 0 30px rgba(255, 215, 0, 0.8)';
    
    setTimeout(() => {
        // 隐藏香炉区域，显示拜拜区域
        hideSection('incenseSection');
        showSection('worshipSection');
        
        // 重置玉牌样式
        card.style.transform = '';
        card.style.boxShadow = '';
    }, 1000);
}

// 执行拜拜
function performWorship() {
    worshipCount++;
    
    // 播放音效
    playSound('worship');
    
    // 更新计数器
    document.getElementById('worshipCount').textContent = worshipCount;
    
    // 添加拜拜动画
    const button = document.getElementById('worshipButton');
    button.style.transform = 'scale(0.9)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 200);
    
    // 检查是否完成三拜
    if (worshipCount >= 3) {
        setTimeout(() => {
            // 隐藏拜拜区域，显示生成区域
            hideSection('worshipSection');
            showSection('generateSection');
            
            // 开始生成玉牌
            generateJade();
        }, 1000);
    }
}

// 生成玉牌
function generateJade() {
    isGenerating = true;
    
    // 显示生成动画
    const generatingAnim = document.querySelector('.generating-animation');
    const jadeResult = document.getElementById('jadeResult');
    
    generatingAnim.style.display = 'flex';
    jadeResult.classList.add('hidden');
    
    // 3秒后显示结果
    setTimeout(() => {
        isGenerating = false;
        generatingAnim.style.display = 'none';
        
        // 随机选择玉牌
        const randomJade = jadeData[Math.floor(Math.random() * jadeData.length)];
        const randomFortune = fortuneTexts[Math.floor(Math.random() * fortuneTexts.length)];
        
        // 显示结果
        document.getElementById('jadeName').textContent = randomJade.name;
        document.getElementById('fortuneText').textContent = randomFortune;
        
        jadeResult.classList.remove('hidden');
        
        // 播放音效
        playSound('success');
        
        // 2秒后显示最终仪式
        setTimeout(() => {
            hideSection('generateSection');
            showSection('finalSection');
            
            // 开始庆祝动画
            startCelebration();
        }, 2000);
    }, 3000);
}

// 开始庆祝动画
function startCelebration() {
    // 播放背景音乐
    const bgMusic = document.getElementById('bgMusic');
    bgMusic.play().catch(e => console.log('音乐播放失败:', e));
    
    // 触发金币爆炸动画
    const coins = document.querySelectorAll('.coin');
    coins.forEach((coin, index) => {
        setTimeout(() => {
            coin.style.animation = 'coinExplode 3s ease-out forwards';
        }, index * 200);
    });
    
    // 添加弹幕
    addDanmaku("🧧 来财了！");
    addDanmaku("💰 发财了！");
    addDanmaku("💎 玉牌显灵！");
}

// 保存图片
function saveImage() {
    // 创建截图
    html2canvas(document.body).then(canvas => {
        const link = document.createElement('a');
        link.download = '八方来财挂玉图.png';
        link.href = canvas.toDataURL();
        link.click();
    });
}

// 分享到微信
function shareToWechat() {
    // 复制分享文本到剪贴板
    const shareText = `🧧 我在「八方来财挂玉台」挂到了${selectedJade}，你也来试试吧！`;
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(shareText).then(() => {
            alert('分享文本已复制到剪贴板，快去朋友圈分享吧！');
        });
    } else {
        // 降级方案
        const textArea = document.createElement('textarea');
        textArea.value = shareText;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('分享文本已复制到剪贴板，快去朋友圈分享吧！');
    }
}

// 提交留言
function submitMessage() {
    const input = document.getElementById('messageInput');
    const message = input.value.trim();
    
    if (message) {
        // 添加新留言
        addMessage('挂玉用户', message);
        
        // 清空输入框
        input.value = '';
        
        // 添加弹幕
        addDanmaku(message);
    }
}

// 添加留言
function addMessage(user, content) {
    const container = document.getElementById('messagesContainer');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message';
    messageDiv.innerHTML = `
        <span class="user">${user}</span>
        <span class="content">${content}</span>
    `;
    
    container.appendChild(messageDiv);
    
    // 滚动到底部
    container.scrollTop = container.scrollHeight;
}

// 添加弹幕
function addDanmaku(text) {
    const danmakuWall = document.getElementById('danmakuWall');
    const danmaku = document.createElement('div');
    danmaku.className = 'danmaku';
    danmaku.textContent = text;
    
    // 随机位置
    const top = Math.random() * 80;
    danmaku.style.top = top + '%';
    
    danmakuWall.appendChild(danmaku);
    
    // 动画结束后移除
    setTimeout(() => {
        danmaku.remove();
    }, 8000);
}

// 开始弹幕
function startDanmaku() {
    const danmakuTexts = [
        "🧧 八方来财！",
        "💰 财源滚滚！",
        "💎 玉牌显灵！",
        "🏮 好运连连！",
        "🙏 虔诚挂玉！",
        "🎉 发财了！",
        "✨ 玉牌护佑！",
        "🌟 财神眷顾！"
    ];
    
    setInterval(() => {
        const randomText = danmakuTexts[Math.floor(Math.random() * danmakuTexts.length)];
        addDanmaku(randomText);
    }, 3000);
}

// 显示区域
function showSection(sectionId) {
    const section = document.getElementById(sectionId);
    section.classList.remove('hidden');
    section.scrollIntoView({ behavior: 'smooth' });
}

// 隐藏区域
function hideSection(sectionId) {
    const section = document.getElementById(sectionId);
    section.classList.add('hidden');
}

// 播放音效
function playSound(type) {
    // 这里可以添加音效播放逻辑
    console.log('播放音效:', type);
}

// 香炉动画
function animateIncenseAltar() {
    const burner = document.querySelector('.burner-body');
    const stick = document.querySelector('.incense-stick');
    
    // 添加闪烁效果
    burner.style.animation = 'flicker 2s ease-in-out infinite';
    stick.style.animation = 'burn 3s ease-in-out infinite';
}

// 工具函数：防抖
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 工具函数：节流
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// 页面可见性变化处理
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // 页面隐藏时暂停音乐
        const bgMusic = document.getElementById('bgMusic');
        bgMusic.pause();
    } else {
        // 页面显示时恢复音乐（如果用户允许）
        if (currentSection === 4) { // 最终仪式区域
            const bgMusic = document.getElementById('bgMusic');
            bgMusic.play().catch(e => console.log('音乐播放失败:', e));
        }
    }
});

// 错误处理
window.addEventListener('error', function(e) {
    console.error('页面错误:', e.error);
});

// 性能监控
window.addEventListener('load', function() {
    console.log('页面加载完成');
}); 
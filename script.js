// 全局变量
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
    
    // 初始化导航栏
    initNavigation();
    
    // 初始化音乐控制
    initMusicControl();
    
    // 页面加载完成后自动播放背景音乐
    setTimeout(() => {
        const bgMusic = document.getElementById('bgMusic');
        bgMusic.play().catch(e => console.log('音乐播放失败:', e));
    }, 2500); // 等待加载动画结束后播放
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
    
    // 分享推文按钮
    document.getElementById('shareTwitter').addEventListener('click', shareToTwitter);
    
    // 留言提交
    document.getElementById('submitMessage').addEventListener('click', submitMessage);
    
    // 回车提交留言
    document.getElementById('messageInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            submitMessage();
        }
    });
    
    // 导航栏切换
    document.getElementById('navToggle').addEventListener('click', toggleMobileMenu);
    
    // Buy按钮
    document.getElementById('buyButton').addEventListener('click', buyToken);
    
    // 音乐控制按钮
    document.getElementById('musicToggle').addEventListener('click', toggleMusic);
}

// 开始挂玉流程
function startHangingProcess() {
    // 播放音效
    playSound('click');
    
    // 滚动到香炉区域
    document.getElementById('incenseSection').scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
    
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
        // 滚动到拜拜区域
        document.getElementById('worshipSection').scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
        
        // 重置玉牌样式
        card.style.transform = '';
        card.style.boxShadow = '';
    }, 1000);
}

// 执行拜拜
function performWorship() {
    if (worshipCount >= 3) return; // 超过3次不再递增
    worshipCount++;
    // 播放音效
    playSound('worship');
    // 更新计数器，最多显示3/3
    document.getElementById('worshipCount').textContent = Math.min(worshipCount, 3);
    // 添加拜拜动画
    const button = document.getElementById('worshipButton');
    button.style.transform = 'scale(0.9)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 200);
    // 检查是否完成三拜
    if (worshipCount >= 3) {
        // 禁用按钮
        button.disabled = true;
        button.classList.add('disabled');
        setTimeout(() => {
            document.getElementById('generateSection').scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
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
        
        // 2秒后滚动到最终仪式
        setTimeout(() => {
            document.getElementById('finalSection').scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
            
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

// 分享到推文
function shareToTwitter() {
    // 构建推文内容
    const tweetText = `八方来财 广邀财神！！

来财 来！ 来财 来！ 来财 来！

#来财 $BaFangLaiCai`;
    
    // 构建Twitter分享URL
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
    
    // 打开Twitter发布页面
    window.open(twitterUrl, '_blank', 'width=600,height=400');
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

// 初始化导航栏
function initNavigation() {
    // 平滑滚动到锚点（只处理内部链接）
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // 滚动时高亮当前导航项（排除外部链接）
    window.addEventListener('scroll', highlightCurrentNav);
}

// 高亮当前导航项
function highlightCurrentNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link:not(.twitter-link)'); // 排除Twitter链接
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// 切换移动端菜单
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const navToggle = document.getElementById('navToggle');
    
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
}

// 复制CA地址
function copyCA() {
    const caText = 'FRNGPMnGZbPCVM6ZwubYc4RzCJbxK5B3wfbrQYRibonk';
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(caText).then(() => {
            showToast('CA地址已复制到剪贴板！');
        }).catch(() => {
            fallbackCopy(caText);
        });
    } else {
        fallbackCopy(caText);
    }
}

// 降级复制方案
function fallbackCopy(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    showToast('CA地址已复制到剪贴板！');
}

// 购买代币
function buyToken() {
    // 暂时无功能，不显示任何提示
    return;
}

// 音乐控制功能
function toggleMusic() {
    const bgMusic = document.getElementById('bgMusic');
    const musicBtn = document.getElementById('musicToggle');
    const musicIcon = musicBtn.querySelector('.music-icon');
    
    if (bgMusic.paused) {
        // 播放音乐
        bgMusic.play().then(() => {
            musicBtn.classList.remove('muted');
            musicIcon.textContent = '🔊';
            showToast('音乐已开启');
        }).catch(e => {
            console.log('音乐播放失败:', e);
            showToast('音乐播放失败');
        });
    } else {
        // 暂停音乐
        bgMusic.pause();
        musicBtn.classList.add('muted');
        musicIcon.textContent = '🔇';
        showToast('音乐已关闭');
    }
}

// 初始化音乐控制
function initMusicControl() {
    const bgMusic = document.getElementById('bgMusic');
    const musicBtn = document.getElementById('musicToggle');
    const musicIcon = musicBtn.querySelector('.music-icon');
    
    // 监听音乐播放状态变化
    bgMusic.addEventListener('play', () => {
        musicBtn.classList.remove('muted');
        musicIcon.textContent = '🔊';
    });
    
    bgMusic.addEventListener('pause', () => {
        musicBtn.classList.add('muted');
        musicIcon.textContent = '🔇';
    });
    
    bgMusic.addEventListener('ended', () => {
        // 音乐播放结束后自动重新播放
        bgMusic.currentTime = 0;
        bgMusic.play().catch(e => console.log('音乐循环播放失败:', e));
    });
}

// 显示提示信息
function showToast(message) {
    // 创建提示元素
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    
    // 添加到页面
    document.body.appendChild(toast);
    
    // 显示动画
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    // 自动隐藏
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
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
    const bgMusic = document.getElementById('bgMusic');
    const musicBtn = document.getElementById('musicToggle');
    
    if (document.hidden) {
        // 页面隐藏时暂停音乐
        bgMusic.pause();
    } else {
        // 页面显示时恢复音乐（如果之前是播放状态）
        if (!musicBtn.classList.contains('muted')) {
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
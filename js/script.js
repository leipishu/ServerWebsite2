document.addEventListener('DOMContentLoaded', () => {
    // 获取侧边栏和按钮
    const sidebar = document.getElementById('sidebar');
    const toggleButton = document.getElementById('toggle-sidebar');
    const main = document.querySelector('main');
    const navbar = document.getElementById('navbar');

    // 标志，用于跟踪侧边栏是否被用户手动折叠
    let userCollapsed = false;

    // 移除 sticky 样式
    navbar.style.position = 'relative';
    navbar.style.top = 'auto';
    navbar.style.zIndex = '1001';

    // 切换侧边栏状态
    toggleButton.addEventListener('click', () => {
        if (window.innerWidth > 768) { // 只有在窗口宽度大于768时才允许手动折叠
            userCollapsed = !userCollapsed; // 切换标志
            sidebar.classList.toggle('collapsed');
        }
        updateMainMargin(); // 更新 main 的左边距
    });

    // 导航链接点击事件
    const navLinks = document.querySelectorAll('nav#sidebar ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            // 移除所有链接的active类
            navLinks.forEach(l => l.classList.remove('active'));
            // 为当前点击的链接添加active类
            link.classList.add('active');
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }

            // 展开父项目及其子项
            let parentLi = link.parentElement;
            while (parentLi && !parentLi.classList.contains('sub-menu')) {
                if (parentLi.querySelector('.sub-menu')) {
                    parentLi.querySelector('.sub-menu').classList.add('expanded');
                }
                parentLi = parentLi.parentElement;
            }

            // 如果是父项目，则展开其所有子项
            if (link.nextElementSibling && link.nextElementSibling.classList.contains('sub-menu')) {
                link.nextElementSibling.classList.add('expanded');
            }
        });
    });

    // 子菜单点击事件
    const subMenuLinks = document.querySelectorAll('nav#sidebar ul li ul li a');
    subMenuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            // 移除所有链接的active类
            navLinks.forEach(l => l.classList.remove('active'));
            // 为当前点击的链接添加active类
            link.classList.add('active');
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }

            // 确保父项目的展开状态
            let parentLi = link.parentElement.parentElement;
            parentLi.classList.add('expanded');

            // 展开父项目的子菜单
            parentLi.querySelector('.sub-menu').classList.add('expanded');
        });
    });

    // 响应式处理
    window.addEventListener('resize', () => {
        handleResponsive();
    });

    // 初始检查窗口宽度
    handleResponsive(); // 初始化时检查窗口宽度
    initialShowLinks(); // 初始显示链接

    // 页面加载时添加 fade-in 类以实现渐显效果
    window.addEventListener('load', () => {
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.classList.add('fade-in');
        });
    });

    function handleResponsive() {
        if (window.innerWidth <= 768) {
            sidebar.classList.add('collapsed');
        } else {
            sidebar.classList.remove('collapsed');
        }
        updateMainMargin(); // 更新 main 的左边距
    }

    // 更新 main 的左边距
    function updateMainMargin() {
        if (sidebar.classList.contains('collapsed')) {
            main.style.marginLeft = '5px'; // 侧边栏收缩时调整左边距
        } else {
            main.style.marginLeft = '10px'; // 侧边栏展开时调整左边距
        }
    }

    function initialShowLinks() {
        const allLinks = document.querySelectorAll('nav#sidebar ul li a');
        allLinks.forEach((link, index) => {
            setTimeout(() => {
                link.classList.add('visible');
                link.classList.add('fade-in');
            }, index * 10); // 每个链接延迟100ms显示，以创建逐行渐显效果
        });
    }

    // 主题切换处理
    const themeSwitchCheckbox = document.querySelector('.theme-switch__checkbox');
    const linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.href = 'css/styles.css'; // 默认使用浅色样式
    document.head.appendChild(linkElement);

    // 从 localStorage 中读取主题设置
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        linkElement.href = 'css/styles-dark.css';
        if (themeSwitchCheckbox) {
            themeSwitchCheckbox.checked = true; // 勾选时为深色模式
        }
    } else {
        linkElement.href = 'css/styles.css';
        if (themeSwitchCheckbox) {
            themeSwitchCheckbox.checked = false; // 未勾选时为浅色模式
        }
    }

    // 添加 storage 事件监听器，用于跨页面同步主题
    window.addEventListener('storage', (event) => {
        if (event.key === 'theme') {
            if (event.newValue === 'dark') {
                linkElement.href = 'css/styles-dark.css';
                if (themeSwitchCheckbox) {
                    themeSwitchCheckbox.checked = true;
                }
            } else {
                linkElement.href = 'css/styles.css';
                if (themeSwitchCheckbox) {
                    themeSwitchCheckbox.checked = false;
                }
            }
        }
    });

    if (themeSwitchCheckbox) {
        themeSwitchCheckbox.addEventListener('change', function() {
            if (this.checked) {
                linkElement.href = 'css/styles-dark.css'; // 勾选时使用深色样式
                localStorage.setItem('theme', 'dark');
            } else {
                linkElement.href = 'css/styles.css'; // 未勾选时使用浅色样式
                localStorage.setItem('theme', 'light');
            }

            // 切换 notices 界面的主题
            const noticesElement = document.getElementById('notices');
            if (noticesElement) {
                noticesElement.classList.toggle('light-theme', !this.checked);
                noticesElement.classList.toggle('dark-theme', this.checked);
            }
        });
    }

    // 确保 notices 页面也能正确同步主题
    const noticesElement = document.getElementById('notices');
    if (noticesElement) {
        if (savedTheme === 'dark') {
            noticesElement.classList.add('dark-theme');
        } else {
            noticesElement.classList.add('light-theme');
        }
    }
});
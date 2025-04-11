document.addEventListener('DOMContentLoaded', () => {
    // 获取侧边栏和按钮
    const sidebar = document.getElementById('sidebar');
    const toggleButton = document.getElementById('toggle-sidebar');
    const main = document.querySelector('main');

    // 标志，用于跟踪侧边栏是否被用户手动折叠
    let userCollapsed = false;

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

    // 滚动监听，实现自动更新侧边栏选中项
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('nav#sidebar ul li a');

        // 移除所有链接的active类
        navLinks.forEach(link => link.classList.remove('active'));

        // 获取当前滚动位置
        const scrollPosition = window.scrollY;

        // 遍历所有section，找到当前滚动到的section
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            // 判断用户是否滚动到了当前section
            if (scrollPosition >= sectionTop - 200 && scrollPosition < sectionTop + sectionHeight - 200) {
                // 找到对应的导航链接并设置为active
                const correspondingLink = document.querySelector(`nav#sidebar ul li a[href="#${sectionId}"]`);
                if (correspondingLink) {
                    correspondingLink.classList.add('active');

                    // 如果选中的链接有子菜单，展开子菜单
                    const subMenu = correspondingLink.nextElementSibling;
                    if (subMenu && subMenu.classList.contains('sub-menu')) {
                        subMenu.classList.add('expanded');
                    }

                    // 确保父菜单项的子菜单展开
                    let parentLi = correspondingLink.parentElement;
                    while (parentLi && !parentLi.classList.contains('sub-menu')) {
                        if (parentLi.querySelector('.sub-menu')) {
                            parentLi.querySelector('.sub-menu').classList.add('expanded');
                        }
                        parentLi = parentLi.parentElement;
                    }
                }
            }
        });

        // 实现渐显效果
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            if (rect.top <= window.innerHeight && rect.bottom >= 0) {
                card.classList.add('fade-in');
            }
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
        }
        updateMainMargin(); // 更新 main 的左边距
    }

    // 更新 main 的左边距
    function updateMainMargin() {
        if (sidebar.classList.contains('collapsed')) {
            main.style.marginLeft = '5px'; // 侧边栏收缩时调整左边距
        } else {
            main.style.marginLeft = '0px'; // 侧边栏展开时调整左边距
        }

        // 如果窗口宽度过窄，直接将侧边栏设置为收缩状态
        if (window.innerWidth <= 768) {
            sidebar.classList.add('collapsed');
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

});

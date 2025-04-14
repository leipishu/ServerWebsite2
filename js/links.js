function getHomePageUrl() {
    // 检查当前是否在 Vercel 上
    if (window.location.hostname === 'mc.leipishu.top') {
        return '/';
    } else {
        return 'index.html';
    }
}

function goToHomePage() {
    window.location.href=getHomePageUrl()
}

function goToNotices(){
    window.location.href='notices.html';
}

function goToGitHub(){
    window.location.href='https://github.com/leipishu/ServerWebsite2';
}
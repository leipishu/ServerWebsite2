console.log("LeipishuAdAstraServer");
console.log("Website by: github.com/OLIMINATOR");

function copyText(text) {
    // 创建一个临时的 textarea 元素
    const textarea = document.createElement('textarea');
    textarea.value = text;

    // 将 textarea 添加到文档中
    document.body.appendChild(textarea);

    // 选择 textarea 中的文本
    textarea.select();

    try {
        const successful = document.execCommand('copy');
        const msg = successful ? '成功复制文本' : '复制失败';
        console.log(msg);
    } catch (err) {
        console.error('复制失败:', err);
    }

    // 移除临时的 textarea
    document.body.removeChild(textarea);
}
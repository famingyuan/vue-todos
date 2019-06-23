/*
 用于对css进行优化   具体怎么优化 ，取决于该配置设置那些插件进行处理
 */

 
const autoprefixer = require('autoprefixer');
module.exports = {
    plugins: [
        // 对css进行 自动补充前缀
        autoprefixer()
    ]
}
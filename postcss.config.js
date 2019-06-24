/*
 用于对css进行优化 具体怎么优化 ，取决于该配置设置那些插件进行处理
 在该JS中进行设置
 */


const autoprefixer = require('autoprefixer');
module.exports = {
    plugins: [
        // 对css进行 自动补充前缀
        autoprefixer({
            // browsers: ['last 5 version']
            // Replace Autoprefixer browsers option to Browserslist config.
            // Use browserslist key in package.json or.browserslistrc file.
        })
    ]
}
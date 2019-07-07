/**
 * 生产环境使用的特殊配置
 */



const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');
const clientConfig = require('./webpack.config.client');

// 用于生成html模板文件或者将资源自动添加到指定的模板文件中
const HtmlWebpackPlugin = require('html-webpack-plugin');

// production环境必须使用 chunkhash
// 1. hash 整个工程的hash ,一个文件变，就变
// 2. trunkhash 为单个模块的hash
// 用hash时app和vendor的hash码是一样的了,这样每次业务代码更新,vendor也会更新,也就没有了意义
// 3. contenthash 用于独立css模块或者JS模块的值，避免其中js变更导致css变更了
// contenthash 取决于文件自己的hash

var config = merge(baseConfig, clientConfig, {
    output: {
        filename: '[name].[chunkhash:8].js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            // 默认情况下 生成 dist/index.html 文件
            // 也可以单独指定采用哪个模板html作为基础 加入相应的js、css
            // template: './src/default.html'  // 模板
        })
    ]
});

module.exports = config;

/**
 * web 开发环境使用的特殊配置
 *
 */
const webpack = require('webpack');
const merge = require('webpack-merge');


var baseConfig = require('./webpack.config.base');

// 用于生成html模板文件或者将资源自动添加到指定的模板文件中
const HtmlWebpackPlugin = require('html-webpack-plugin');

const path = require('path');

const configUtil = require('./config.util');

// 删除多余的entry
baseConfig = configUtil.cleanEntry(baseConfig);



var config = merge(baseConfig, clientConfig, {

    entry: {
        ssr: path.join(__dirname, '../src/ssr/index.js')
    },
    output: {
        path: path.resolve(__dirname, '../server-build/'),
        filename: '[name].[hash:8].js',
        libraryTarget:'commonjs2'
        // 用于对路径进行补全 比如 / 则为根路径，当使用本地访问时 则无法访问，需要使用web访问
        // 可以根据dist发布的目录 做相应的适配操作 默认情况下 配置为/
        // 务必注意： webpack-dev-server 情况下，不能配置为./或者其他路径，只能为默认值 /
        // 如果不配置 publicPath 则输出的路径是 相对路径，在使用vue-router 二级路由时，访问的JS可能存在路径问题
        // publicPath: "/",
    },
    externals:Object.keys(require('../package.json').dependencies),
    // 比较准确和快
    // https://www.cnblogs.com/wangyingblog/p/7027540.html
    // vue-cli dev 使用  cheap-module-eval-source-map  cheap-module-source-map
    // 如果不想保留map信息 则留空
    // cheap 不留空
    // module 第三方模块也映射
    // eval 速度快 sourceMap代码被打包进去了 且 采devServer用eval方式执行JS 映射关系
    // inline 也是被打包，但是是base64方式
    // 默认情况下 都是通过外挂 .map.js 文件方式
    devtool: 'source-map',
    plugins: [
        new HtmlWebpackPlugin({
            // 默认情况下 生成 dist/index.html 文件
            // 也可以单独指定采用哪个模板html作为基础 加入相应的js、css
            template: path.join(__dirname, '../src/practice.template.html'),  // 模板
            filename: 'index.html'
        }),
        // 热加载功能  vue-loader 已经处理了 热加载细节
        // 需要自定义 热加载过程 ，但是vue-loader已经处理了
        new webpack.HotModuleReplacementPlugin()
    ]
})

module.exports = config;

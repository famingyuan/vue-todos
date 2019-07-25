/**
 * web 开发环境使用的特殊配置
 *
 */
// 用于生成html模板文件或者将资源自动添加到指定的模板文件中
const HtmlWebpackPlugin = require('html-webpack-plugin');

const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');
const clientConfig = require('./webpack.config.client');


// webpack --watch
// webpack-dev-server
// webpack-dev-middleware 自己git
const devServer = {
    port: 8000,
    host: 'localhost', // localhost 或者其他ip可以访问
    overlay: {
        errors: true // webpack 编译出错 可以在网页上看到
    },
    // 实现热更新 实现修改组件 只更新部分区域 而不需要重新刷新整个页面
    // 如果是配置文件变更了 则需要重新 run dev
    hot: true,
    open: true,
    // 用于适配 不满足路由的 默认映射地址 如果不配置 则不加这个属性 否则可能报错
    // 当使用history模式时，前端路由地址格式为 /path1/path2 ，但是后端找不到对应的路径 所以会出错
    // 如果不配置fallback 当前端直接f5刷新时，后端服务器匹配不到该路由 将导致报错
    // 配置了之后 则由index.html 前端路由做管控了 ，执行相应的前端路由跳转
    historyApiFallback: {
        index: '/index.html'
    }
};


var config = merge(baseConfig, clientConfig, {
    // 比较准确和快
    // https://www.cnblogs.com/wangyingblog/p/7027540.html
    // vue-cli dev 使用  cheap-module-eval-source-map  cheap-module-source-map
    // 如果不想保留map信息 则留空
    // cheap 不留空
    // module 第三方模块也映射
    // eval 速度快 sourceMap代码被打包进去了 且 采devServer用eval方式执行JS 映射关系
    // inline 也是被打包，但是是base64方式
    // 默认情况下 都是通过外挂 .map.js 文件方式
    devtool: 'cheap-module-eval-source-map',
    devServer: devServer,
    plugins: [
        new HtmlWebpackPlugin({
            // 默认情况下 生成 dist/index.html 文件
            // 也可以单独指定采用哪个模板html作为基础 加入相应的js、css
            template: './src/index.html'  // 模板
        }),
        // 热加载功能  vue-loader 已经处理了 热加载细节
        // 需要自定义 热加载过程 ，但是vue-loader已经处理了
        new webpack.HotModuleReplacementPlugin()
    ]
})

module.exports = config;


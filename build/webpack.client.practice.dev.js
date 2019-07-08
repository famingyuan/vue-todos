/**
 * web 开发环境使用的特殊配置
 *
 */
const webpack = require('webpack');
const merge = require('webpack-merge');


var baseConfig = require('./webpack.config.base');
const clientConfig = require('./webpack.config.client');

// 用于生成html模板文件或者将资源自动添加到指定的模板文件中
const HtmlWebpackPlugin = require('html-webpack-plugin');

const path = require('path');

const configUtil = require('./config.util');

// 删除多余的entry
baseConfig = configUtil.cleanEntry(baseConfig);

// webpack --watch
// webpack-dev-server
// webpack-dev-middleware 自己写
const devServer = {
    port: 9999,
    host: 'localhost', // localhost 或者其他ip可以访问
    overlay: {
        errors: true // webpack 编译出错 可以在网页上看到
    },
    // 实现热更新 实现修改组件 只更新部分区域 而不需要重新刷新整个页面
    // 如果是配置文件变更了 则需要重新 run dev
    hot: true,
    open: true
    // 用于适配 不满足路由的 默认映射地址 如果不配置 则不加这个属性 否则可能报错
    // historyFallback:{

    // }
};


var config = merge(baseConfig, clientConfig, {

    entry: {
        index: path.join(__dirname, '../src/practice/index.js')
    },
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
    // 用于指定别名
    resolve:{

        alias:{
            // vue 需要使用 alias 指定使用的具体是哪个版本的代码
            // 否则可能template无法使用
            // [参考](https://blog.csdn.net/xiaomajia029/article/details/88320233)
            // 或者指定 runtimeCompiler: true
            'vue':path.join(__dirname,'../node_modules/vue/dist/vue.esm.js')
        }
    },
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

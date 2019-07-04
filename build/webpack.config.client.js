
const webpack = require('webpack');
// 用于将css单独打包抽离 针对每一个js文件（每一个entry） 抽离一个css文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// 用于生成html模板文件或者将资源自动添加到指定的模板文件中
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');

const isDev = process.env.NODE_ENV === 'production' ? false : true;

let config;

// webpack --watch
// webpack-dev-server
// webpack-dev-middleware 自己写
const devServer = {
    port: 8000,
    host: '0.0.0.0', // localhost 或者其他ip可以访问
    overlay: {
        errors: true // webpack 编译出错 可以在网页上看到
    },
    // 实现热更新 实现修改组件 只更新部分区域 而不需要重新刷新整个页面
    // 如果是配置文件变更了 则需要重新 run dev
    hot: true,
    // open:true
    // 用于适配 不满足路由的 默认映射地址 如果不配置 则不加这个属性 否则可能报错
    // historyFallback:{

    // }
};


const defaultPlugins = [
    new HtmlWebpackPlugin({
        // 默认情况下 生成 dist/index.html 文件
        // 也可以单独指定采用哪个模板html作为基础 加入相应的js、css
        // template: './src/default.html'  // 模板
    }),
    new webpack.DefinePlugin({
        // 用来定义在编译时使用的全局变量 以实现编译时 针对production或者development版本做不同的编译处理
        // 在我们的代码中 也可以使用 process.env
        // webpack 可能根据环境变量 打包不同的vue or 其它
        'process.env': {
            // 必须是字符串 且 可以转义为JS语句
            NODE_ENV: isDev ? '"development"' : '"production"',
        }
        // or 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),

    // 用于将css单独打包抽离 针对每一个js文件（每一个entry） 抽离一个css文件
    // hash值 针对css文件
    new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: isDev ? '[name].css' : '[name].[contenthash:10].css',
        chunkFilename: isDev ? '[id].css' : '[id].[contenthash:10].css',
    }),
]


if (isDev) {
    // webpack --watch
    // webpack-dev-server
    // webpack-dev-middleware 自己写
    config = merge(baseConfig, {
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
        module: {
            rules: [
                {
                    test: /\.less$/,
                    // 倒序 ， less-loader转成CSS , css-loader 提取 ， vue-style-loader 写入
                    use: [
                        // vue-style-loader 和 style-loader 区别不大，只是在SSR 时 有别的额外操作
                        // 'vue-style-loader',
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                // 开发环境 启用热更新
                                hmr: process.env.NODE_ENV === 'development',
                                // if hmr does not work, this is a forceful method.
                                // PS:所以如果总是刷新整个页面 则考虑是否取消掉该选项
                                reloadAll: true,
                            },
                        },
                        // MiniCssExtractPlugin 是把css抽离 并写入单个文件
                        // vue-style-loader or style-loader 都是将css编译成JS 执行时 写入页面
                        // 两者 二选一
                        //=========================

                        {
                            loader: 'css-loader'
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                // 默认使用 less-loader生成的sourceMap 而不在自己生成
                                sourceMap: true
                            }
                        },
                        'less-loader'
                    ]
                },
                {
                    test: /\.css$/,
                    // css-loader用来解析css文件，一般解析css中的@import和url()两部分,
                    // style-loader将css插入到页面的style标签
                    // (css文件被打包到js中，最终通过js插入到html中，需要style-loader来做这步操作，如果css单独打包的话就不需要了)
                    use: [
                        // 'style-loader', // 将CSS打包到JS，代码执行时 写入到页面上
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                // 开发环境 启用热更新
                                hmr: process.env.NODE_ENV === 'development',
                                // if hmr does not work, this is a forceful method.
                                // PS:所以如果总是刷新整个页面 则考虑是否取消掉该选项
                                reloadAll: true,
                            },
                        },

                        'css-loader', // 抽取css
                        {
                            loader: 'postcss-loader',
                            options: {
                                // 默认使用 less-loader生成的sourceMap 而不在自己生成
                                sourceMap: true
                            }
                        },
                    ]
                }
            ]
        },
        plugins: defaultPlugins.concat([
            // 热加载功能  vue-loader 已经处理了 热加载细节
            // 需要自定义 热加载过程 ，但是vue-loader已经处理了 
            new webpack.HotModuleReplacementPlugin()
        ])
    })
} else {

    // production环境必须使用 chunkhash
    // 1. hash 整个工程的hash ,一个文件变，就变
    // 2. trunkhash 为单个模块的hash 
    // 用hash时app和vendor的hash码是一样的了,这样每次业务代码更新,vendor也会更新,也就没有了意义
    // 3. contenthash 用于独立css模块或者JS模块的值，避免其中js变更导致css变更了
    // contenthash 取决于文件自己的hash

    config = merge(baseConfig, {
        output: {
            filename: '[name].[chunkhash:8].js'
        },
        module: {
            rules: [
                {
                    test: /\.less$/,
                    // 倒序 ， less-loader转成CSS , css-loader 提取 ， vue-style-loader 写入
                    use: [
                        // vue-style-loader 和 style-loader 区别不大，只是在SSR 时 有别的额外操作
                        // 'vue-style-loader',
                        {
                            loader: MiniCssExtractPlugin.loader,
                        },
                        // MiniCssExtractPlugin 是把css抽离 并写入单个文件
                        // vue-style-loader or style-loader 都是将css编译成JS 执行时 写入页面
                        // 两者 二选一
                        //=========================
                        {
                            loader: 'css-loader'
                        },
                        {
                            loader: 'postcss-loader'
                        },
                        'less-loader'
                    ]
                },
                {
                    test: /\.css$/,
                    // css-loader用来解析css文件，一般解析css中的@import和url()两部分,
                    // style-loader将css插入到页面的style标签
                    // (css文件被打包到js中，最终通过js插入到html中，需要style-loader来做这步操作，如果css单独打包的话就不需要了)
                    use: [
                        // 'style-loader', // 将CSS打包到JS，代码执行时 写入到页面上
                        {
                            loader: MiniCssExtractPlugin.loader
                        },

                        'css-loader', // 抽取css
                        {
                            loader: 'postcss-loader'
                        },
                    ]
                }
            ]
        },
        plugins: defaultPlugins.concat([])
    });

}

module.exports = config;

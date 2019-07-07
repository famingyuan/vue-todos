
const webpack = require('webpack');
// 用于将css单独打包抽离 针对每一个js文件（每一个entry） 抽离一个css文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// 用于生成html模板文件或者将资源自动添加到指定的模板文件中
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { VueLoaderPlugin } = require('vue-loader');


// CSS 压缩工具
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// webpack默认使用的JS 压缩 工具
const TerserJSPlugin = require('terser-webpack-plugin');

// 创建vue loader
const createVueLoader = require('./vue.config');

const path = require('path');

const isDev = process.env.NODE_ENV === 'production' ? false : true;

module.exports = {
    module: {
        rules: [
            {
                test: /\.vue/i,
                use: [
                    {
                        loader: 'vue-loader',
                        options: createVueLoader(isDev)
                    }]
            },
            {
                test: /\.less$/,
                // 倒序 ， less-loader转成CSS , css-loader 提取 ， vue-style-loader 写入
                use: [
                    // vue-style-loader 和 style-loader 区别不大，只是在SSR 时 有别的额外操作
                    // 并且 vue-style-loader 提供热更新（.vue中的css部分）
                    // 通常情况下 开发模式 使用vue-style-loader 不需要单独提取样式出来
                    (isDev ? 'vue-style-loader' :
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                // 开发环境 启用热更新
                                hmr: process.env.NODE_ENV === 'development',
                                // if hmr does not work, this is a forceful method.
                                // PS:所以如果总是刷新整个页面 则考虑是否取消掉该选项
                                reloadAll: true,
                            },
                        }),
                    // MiniCssExtractPlugin 是把css抽离 并写入单个文件
                    // vue-style-loader or style-loader 都是将css编译成JS 执行时 写入页面
                    // 两者 二选一
                    //=========================

                    {
                        // 分析css之间的关系，将css整合成一段CSS代码
                        loader: 'css-loader',
                        options: {
                            // 要求在执行css-loader前 至少要为@import应用2个loader
                            importLoaders: 2,
                            //  注意： 配置为true 将导致**所有**less编译后的内容 均为模块方式，className将变为随机的
                            //  只能在JS里面 使用 ，而且使用className时 需要使用变量的方式
                            //  除非额外指定 添加test规则定义例外
                            modules: false,
                            // modules: {
                            //     mode: 'local',
                            //     localIdentName: '[path][name]__[local]--[hash:base64:5]',
                            //     context: path.resolve(__dirname, 'src'),
                            //     hashPrefix: 'my-custom-hash',
                            // }
                        }
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
                    (isDev ?
                        'style-loader' // 将CSS打包到JS，代码执行时 写入到页面上
                        : {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                // 开发环境 启用热更新
                                hmr: process.env.NODE_ENV === 'development',
                                // if hmr does not work, this is a forceful method.
                                // PS:所以如果总是刷新整个页面 则考虑是否取消掉该选项
                                reloadAll: true,
                            }
                        }),

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
    plugins: [
        // 必须要加载该插件才能解析.VUE
        new VueLoaderPlugin(),
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
            // entryName +
            chunkFilename: isDev ? '[name].chunk.css' : '[name].[contenthash:10].chunk.css',
        }),
    ]
    ,
    optimization: {
        // manifest 可能会在打包时 发生改变，所以 可能需要独立出来
        // main verdor 之间的关系 为 manifest
        // 或者配置为true 等同为 name:'runtime'
        runtimeChunk: {
            // 将会为每个entry 配置独立的runtime
            // 如果多个entry之间想要共享的 则需要 设置为runtimeChunk 为 single
            name: 'runtime'
        },
        // 开发模式下 针对打包出来的模块 进行按需要打包
        // usedExports: true,
        // 分割代码 所有引入的第三方库 将被导出为 verdor
        splitChunks: {
            // chunks 默认情况下 针对 async 异步代码做分割
            // 设置为 all 则 async and non-async 都有效
            // 但是对于同步代码 将进入到 cacheGroups中
            chunks: 'all',

            //========== 以下配置 对于 import的异步代码 不做限制
            minSize: 30000,
            // maxSize: 0,
            // 至少被引入1次
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            // 默认情况下 cacheGroup分割出来的文件名为:
            // [cacheGroup key] + [~] + [entryName]
            automaticNameDelimiter: '~',
            automaticNameMaxLength: 30,
            name: true,
            // 缓存组配置
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    // 自定义名称 但是注意：针对chunk设置为 aysnc的情况，不得配置filename此项为固定值 否则报错
                    // You are trying to set a filename for a chunk which is (also) loaded on demand.
                    // The runtime can only handle loading of chunks which match the chunkFilename schema.
                    // Using a custom filename would fail at runtime.
                    // filename:'nodeMudles_vendors.js'
                },
                // 符合要求的模块 将被分割到 default~entryName.js中
                // default 是个兜底 不符合前面的test情况
                default: {
                    minChunks: 1,
                    priority: -20,
                    reuseExistingChunk: true,
                    filename: 'common.js'

                },
                // styles: {
                //     // 该chunk输出时的默认名字 但是可能会被 MiniCssExtractPlugin 配置chunkName 覆盖
                //     name: 'styles',
                //     test: /\.(css|less)$/,
                //     chunks: 'all',
                //     // 设置为 true 表示忽略掉前面的 minsize之类的配置 将所有的css都打包到一个文件中
                //     enforce: true,
                // }


            }
        },
        // 开发模式下 针对打包出来的模块 进行按需要打包
        // 生产环境下 默认都会进行按需打包 所以针对css 需要考虑在package.json中 设置 sideEffects 例外情况
        usedExports: true,
        // css JS 的最小化压缩
        // 因为minizer会覆盖掉 webpack默认的压缩 所以需要额外给补充下JS压缩
        // 默认情况下CSS没有被压缩的 即便是生产环境
        // Setting optimization.minimizer overrides the defaults provided by webpack,
        // 默认情况下 CSS 没有压缩的
        // so make sure to also specify a JS minimizer:
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})]
    }
};

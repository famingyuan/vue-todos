
// 参考文档
// 1. https://juejin.im/entry/5a97b0eaf265da237b217f59
// 2. https://vue-loader.vuejs.org/zh/guide/#%E6%89%8B%E5%8A%A8%E8%AE%BE%E7%BD%AE

const path = require('path');
const webpack = require('webpack');
// from ORG site
// https://vue-loader.vuejs.org/zh/guide/#%E6%89%8B%E5%8A%A8%E8%AE%BE%E7%BD%AE

const VueLoaderPlugin = require('vue-loader/lib/plugin');
// 下面这段 等同上方这个
const { _VueLoaderPlugin } = require('vue-loader');

// 用于生成html模板文件或者将资源自动添加到指定的模板文件中
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 用于将css单独打包抽离
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// 用于清空某些目录
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


const isDev = process.env.NODE_ENV === 'production' ? false : true;

console.log('IS_DEV = ' + isDev)

const config = {
    target: 'web',
    // mode: 'development',
    // 指定当前项目有哪些编译入口
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.[hash:8].js'
    },
    module: {
        rules: [
            {
                test: /\.vue/i,
                loader: 'vue-loader'
            },
            // // this will apply to both plain `.js` files
            // // AND `<script>` blocks in `.vue` files
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                use: {
                    loader: 'babel-loader',
                    // dev 编译时 可能不会对语法进行转换， production时 将转换
                    // options: {
                    //     // 务必配置或者使用 babelrc
                    //     presets: ['@babel/preset-env']
                    // }
                }
            },
            // 对jsx使用 babel-loader处理 
            {
                test: /\.jsx$/,
                exclude: [/node_modules/],
                use: {
                    loader: 'babel-loader'
                }
            },
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
                            // 所以如果总是刷新整个页面 则考虑是否取消掉该选项
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
                    'style-loader', // 将CSS打包到JS，代码执行时 写入到页面上
                    'css-loader' // 抽取css
                ]
            },
            {
                test: /\.(jpg|jpeg|png|gif|svg)$/i,
                use: [
                    {
                        // 使用url-loader 会根据 limit ，小于的，则使用base64 ,大于的 则交给 file-loader 进行管理文件（转存、hash命名）
                        loader: 'url-loader', // url-loader 依赖 file-loader ， 相当于是其超集
                        options: {
                            limit: 1024,// 小于1024的 转成base64输出
                            name: '[name].xxx.[ext]'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        // 清空dist目录 每次打包时
        new CleanWebpackPlugin(),
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

        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: isDev ? '[name].css' : '[name].[hash:8].css',
            chunkFilename: isDev ? '[id].css' : '[id].[hash:8].css',
        }),
        new HtmlWebpackPlugin({
            // 默认情况下 生成 dist/index.html 文件
            // 也可以单独指定采用哪个模板html作为基础 加入相应的js、css
            // template: './src/default.html'  // 模板
        }),
        // 必须要加载该插件才能解析.VUE
        new VueLoaderPlugin()
    ]
};

if (isDev) {

    // 比较准确和快
    config.devtool = '#cheap-module-source-map';
    config.devServer = {
        port: 8000,
        host: '0.0.0.0',// localhost 或者其他ip可以访问
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
    }

    // 添加具体的规则 开发环境 less转换成css之后 进行postcss 指定相应的处理

    // 热加载功能  vue-loader 已经处理了 热加载细节
    // 需要自定义 热加载过程 ，但是vue-loader已经处理了 
    config.plugins.push(new webpack.HotModuleReplacementPlugin(), new webpack.NoEmitOnErrorsPlugin);
} else {
    // 用于将常用的库 单独打包，实现长缓存 避免业务代码更新 导致hash变更
    config.entry = {
        app: path.resolve(__dirname, 'src/index.js'),
        vendor: ['vue']
    }
    // production环境必须使用 chunkhash
    // hash 为所有文件的hash ， trunkhash 为单个
    config.output.filename = '[name].[chunkhash:8].js';
    config.mode = 'production';

    // webpack4+ 已经 移除
    /**
     * 
     config.plugins.push(
        new webpack.optimize.CommonsChunkPlugin({
            // 必须与上面的 字段名 相同
            name: 'vendor'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            // runtime 用于存放webpack自身相关的 runtime没有在上面生成
            // 新模块加入时 插入模块ID变更发生变化， hash发生变化，所以采用该方式规避
            name: 'runtime'
        })
    );
     * 
     */
    
    // config.optimization.splitChunks instead.
    // config.optimization = {
    //     splitChunks: {
    //         name: 'vendor'
    //     }
    // };
}


module.exports = config;
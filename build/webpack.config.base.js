// 参考文档
// 1. https://juejin.im/entry/5a97b0eaf265da237b217f59
// 2. https://vue-loader.vuejs.org/zh/guide/#%E6%89%8B%E5%8A%A8%E8%AE%BE%E7%BD%AE vue-loader 官方配置说明

// 3. https://juejin.im/post/5ba44831f265da0ac8493210 webpack4配置简要说明
// 4. hash、contenthash chunkhash 相关区别 https://www.cnblogs.com/giggle/p/9583940.html
const path = require('path')

// from ORG site
// https://vue-loader.vuejs.org/zh/guide/#%E6%89%8B%E5%8A%A8%E8%AE%BE%E7%BD%AE

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
// 用于清空某些目录
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const webpack = require('webpack')

const isDev = process.env.NODE_ENV === 'development'

console.log('IS_DEV = ' + isDev)

const config = {
    target: 'web',
    mode: isDev ? 'development' : 'production',

    // 指定当前项目有哪些编译入口
    entry: {
        app: path.resolve(__dirname, '../src/index.js')
        // 用于将常用的库 单独打包，实现长缓存 避免业务代码更新 导致hash变更
        // https://webpack.js.org/concepts/entry-points/#separate-app-and-vendor-entries
        // webpack4 已经不再推荐这么干了 采用 splitChunks来操作
        // vendor: ['vue']
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].[hash:8].js',
        // 用于对路径进行补全 比如 / 则为根路径，当使用本地访问时 则无法访问，需要使用web访问
        // 可以根据dist发布的目录 做相应的适配操作 默认情况下 配置为/
        // 务必注意： webpack-dev-server 情况下，不能配置为./或者其他路径，只能为默认值 /
        // 如果配置 publicPath 为 ./ 则输出的路径是 相对路径，在使用vue-router 二级路由时，访问的JS可能存在路径问题
        publicPath: "/",

    },
    resolve: {
        alias: {
            // 为src下JS设置应用别名 方便import  而不需要使用 ../../xxx
          '@':path.resolve(__dirname,'../src/')
      }
    },
    module: {
        rules: [
            {

                test: /\.(vue|js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    // 用于处理代码检测
                    // dev 时就执行代码检查
                    loader: 'eslint-loader',
                    options: {
                        emitError: true,
                        failOnError: true
                    }
                },
                // 预处理
                enforce: 'pre'
            },
            // // this will apply to both plain `.js` files
            // // AND `<script>` blocks in `.vue` files
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                use: {
                    loader: 'babel-loader'
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
                test: /\.(jpg|jpeg|png|gif|svg)$/i,
                use: [{
                    // 使用url-loader 会根据 limit ，小于的，则使用base64 ,大于的 则交给 file-loader 进行管理文件（转存、hash命名）
                    loader: 'url-loader', // url-loader 依赖 file-loader ， 相当于是其超集
                    options: {
                        limit: 1024, // 小于1024的 转成base64输出
                        name: 'resource/[path][name].xxx.[ext]'
                    }
                }]
            }
        ]
    },
    plugins: [
        // 清空dist目录 每次打包时
        new CleanWebpackPlugin(),

        new webpack.ProgressPlugin(),
        // 在控制台中输出可读的模块名。
        // new webpack.NamedModulesPlugin(),
        // 打包分析插件
        // new BundleAnalyzerPlugin()
    ]
}

module.exports = config


// 参考文档
// 1. https://juejin.im/entry/5a97b0eaf265da237b217f59
// 2. 

const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
// 下面这段 等同上方这个
const {_VueLoaderPlugin} = require('vue-loader');


const config = {
    mode: 'development',
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.vue/,
                loader: 'vue-loader'
            },
            // // this will apply to both plain `.js` files
            // // AND `<script>` blocks in `.vue` files
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: [/node_modules/]
            },

            {
                test: /\.less$/,
                // 倒序 ， less-loader转成CSS , css-loader 提取 ， vue-style-loader 写入
                use: [
                    // vue-style-loader 和 style-loader 区别不大，只是在SSR 时 有别的额外操作
                    'vue-style-loader',
                    'css-loader',
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
                test: /\.(jpg|jpeg|png|gif|svg)$/,
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
        // 必须要加载该插件才能解析.VUE
        new VueLoaderPlugin()
    ]
};

module.exports = config;
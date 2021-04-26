const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    mode: 'development', // 设置模式：开发模式

    devtool: 'source-map',
    
    // 配置入口
    entry: {
        'js/app': './src/app.js'//要打包的文件路径
    },

    // 配置出口
    output: {
        path: path.join(__dirname, './dist'),//打包好放置的文件路径
        filename: '[name].js'//把打包好的文件放进js文件夹
    },

    // 配置插件
    plugins: [
        // 生成 HTML文件,渲染到页面
        new HtmlWebpackPlugin({
            template: path.join(__dirname, './public/index.html'),
            filename: 'index.html',
            inject: 'true'
        }),
        // 拷贝文件或目录，修改最终输出路径的配置
        new CopyPlugin({
            patterns: [
                {
                    from: 'public/*.ico', //文件起始路径
                    to: path.join(__dirname, './dist/favicon.ico') //拷贝目标路径
                },
                {
                    from: 'public/libs',
                    to: path.join(__dirname, './dist/libs')
                }
            ]
        }),
        // 覆盖更新dist
        new CleanWebpackPlugin()
    ],

    // 配置server
    devServer: {
        contentBase: path.join(__dirname, './dist'),
        compress: true,
        port: 8080,
        // 跨域代理
        proxy: {
            "/api": {
                target: "http://localhost:3000"
            }
        }
    },

    // 前端渲染模板
    module: {
        rules: [
            {
                test: /\.art$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'art-template-loader'
                }

            }
        ]
    }


}
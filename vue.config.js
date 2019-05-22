let path = require('path')
function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
    devServer: {
        port: 8888, // 端口号
        host: "localhost",
        https: false, // https:{type:Boolean}
        proxy:{
            '/api':{
                target:'http://test.tutrav.cn',
                changeOrigin:true,
                ws:true,
                pathRewrite: {
                    '^/api': '/'
                }
            }
        }
    },
    chainWebpack: config => {
        config.resolve.alias.set('@', resolve('src'))
    }
}
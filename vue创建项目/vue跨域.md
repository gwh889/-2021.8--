vue遇到跨域问题，会通过proxy代理来解决，在根目录下新建vue.config.js文件，代码如下

```vue
module.exports = {
  publicPath: './',   //文件打包位置
  outputDir: 'yongkang',  //文件打包出来的文件名
  assetsDir: 'static',  //样式文件打包后的名字
  devServer: {
    host: 'localhost',
    port: 8080,
    proxy: {
      '/yongkang': {
        // 匹配以此开头的请求
        target: 'http://gyy.yk.gov.cn:8086', // 真正请求的接口
        changeOrigin: true // 如果接口跨域，需要进行这个参数配置
      }
    }
  }
}

```


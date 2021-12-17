module.exports = {
  publicPath: './',
  // outputDir: 'ribbon',
  // assetsDir: 'static',
  configureWebpack:{
    // 此处可以配置cdn的一些资源
    // 需要在index.html中引入cdn资源文件
    externals:{
      vue:'Vue',
      'vue-router':'VueRouter',
      axios:'axios',
      vuex:'Vuex',
      'element-ui':'ELEMENT',
      'iview':'iview',
      echarts:'echarts'
    }
  },
  devServer: {
    host: 'localhost',
    port: 8080,
    proxy: {
      '/dtsum': {
        // 匹配以此开头的请求
        target: 'http://fzxd.dtsum.com/', // 测试上线
        // target: 'http://192.168.31.19:7778/', // zhoubin
        // target: 'http://192.168.31.206:7778', // huang
        // target: 'http://114.55.106.44:7778', // 本地
        changeOrigin: true // 如果接口跨域，需要进行这个参数配置
      }
    }
  },
  pwa: {
    iconPaths: {
      favicon32: 'favicon.ico',
      favicon16: 'favicon.ico',
      appleTouchIcon: 'favicon.ico',
      maskIcon: 'favicon.ico',
      msTileImage: 'favicon.ico'
    }
  },
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = '线带纺织⾏业⼯业互联⽹平台'
        return args
      })
  }
}
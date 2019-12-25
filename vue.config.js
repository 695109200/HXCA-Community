const webpack = require('webpack')
module.exports = {
	productionSourceMap: false,
  lintOnSave: false,
  configureWebpack: {
      plugins: [
      new webpack.ProvidePlugin({
  $:"jquery",
  jQuery:"jquery",
  "windows.jQuery":"jquery"
  })
      ]
    },
    devServer:{
      proxy:{
        '/api':{
          target:'http://39.107.87.97:80',
          ws:true,
          changeOrigin:true
        }
      }
    }
}

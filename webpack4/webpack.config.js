const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //生成 index.html 文件
const CleanWebpackPlugin = require('clean-webpack-plugin'); //清理 /dist 文件夹
module.exports = {
  entry: {
    app: './src/index.js',
    print: './src/print.js'
  },
  output: {
    filename: '[chunkhash].[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    chunkFilename: '[name].bundle.luci.js',//非入口 chunk 的名称
    publicPath:"/aaa/",
    //预设打成的包文件被上传到服务器的位置，打包时webpack会在引用到包资源的路径前自动添加publicPath,
    //当我们把资源放到CDN上的时候，把publicPath的值设为CDN的值就可以了
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'webpack4.0'
    }),
    new CleanWebpackPlugin(['dist']),
  ],
  devtool: 'inline-source-map', //错误来自于哪个源文件
  devServer: {
    contentBase: './dist'
  },
  optimization: {
    splitChunks: {
      chunks: 'all',//将 库文件 分离到单独的 chunk,可被继承
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors_lili',
          minSize: 30000,
          minChunks: 1,
          chunks: 'initial',
          priority: 1 // 该配置项是设置处理的优先级，数值越大越优先处理
        },
        commons: {
          test: /[\\/]src[\\/]common[\\/]/,
          name: 'commons_jimi',
          minSize: 30000,
          minChunks: 3,
          chunks: 'initial',
          priority: -1,
          reuseExistingChunk: true // 这个配置允许我们使用已经存在的代码块
        }
      },
    },
    // runtimeChunk: {
      // name: "manifest"/////与chunkFilename冲突？打包的print.bundle.js && app.bundle.js文件名不对了
    // },
  }
};
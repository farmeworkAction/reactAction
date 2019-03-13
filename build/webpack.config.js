const path = require('path') // 引入‘path’，为了在这里使用绝对路径，避免相对路径在不同系统时出现不必要的问题
const glob = require('glob')
const chalk = require('chalk')
//const webpack = require('webpack')
const HTMLPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const PurifyCSSPlugin = require('purifycss-webpack')
const WebpackParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
const HappyPack = require('happypack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin');//显示打包时间

module.exports ={
	// 应用入口
	entry: {
		app: path.join(__dirname, '../src/app.js'),  // app.js作为打包的入口
	},
	// 输出目录
	output: {
		filename: '[name].[hash].js',  //name代表entry对应的名字; hash代表 整个app打包完成后根据内容加上hash。一旦整个文件内容变更，hash就会变化
		path: path.join(__dirname, '../production'), // 打包好之后的输出路径
		publicPath: '/', // 静态资源文件引用时的路径（加在引用静态资源前面的）
	},
	// 配置loader
	module: {
		rules: [
		{
			test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'postcss-loader'],
				}),
    },
		{
			test: /.(js)$/,
			use: 'happypack/loader',
			exclude: /node_modules/,
		},
		{
			test: /\.(js|jsx)$/,
			exclude: /node_modules/,
			include: /src/,
			use: [
				'babel-loader?cacheDirectory=true',
				'eslint-loader',
			],
		},
		{
			test: /\.(png|jpg|jpeg|gif|svg)$/,
			use: {
				loader: 'url-loader',
				options: {
					name: 'images/[name].[hash].[ext]',
					limit: 5 * 1024,
				},
			},
		},
		{
			test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
			use: [
				{
					loader: 'url-loader',
					options: {
						limit: 8192,
						name: 'images/[name].[hash].[ext]',
					},
				},
			],
		},
	],
	},
	resolve:{
		extensions:['.js','.jsx','.json'],
	},
	// 配置插件
	plugins: [
		new HTMLPlugin(
			{
				title:'react app',
				filename: 'index.html',
				template: 'index.html',
        environment: process.env.NODE_ENV,
		}),
		new CleanWebpackPlugin([path.join(__dirname, 'productions')]),
		new ExtractTextPlugin({
			filename: 'css/[name].[hash].css', //放到dist/css/下
		}),
		new PurifyCSSPlugin({
			paths: glob.sync(path.join(__dirname, '*.html')),
		}),
		new WebpackParallelUglifyPlugin({
			uglifyJS: {
				output: {
					beautify: false, //不需要格式化
					comments: false, //不保留注释
				},
				compress: {
          warnings: false, // 在UglifyJs删除没有用到的代码时不输出警告
          drop_console: true, // 删除所有的 `console` 语句，可以兼容ie浏览器
          collapse_vars: true, // 内嵌定义了但是只用到一次的变量
          reduce_vars: true, // 提取出出现多次但是没有定义成变量去引用的静态值
				},
			},
		}),
		new HappyPack({
			loaders: [ 'babel-loader' ],
		}),
		new ProgressBarPlugin({
			format: '  build [:bar] ' + chalk.cyan.bold(':percent') + ' (:elapsed seconds)', clear: false,
		}),
		// new webpack.DllReferencePlugin({
    //   context: __dirname,
    //   // manifest就是我们第一步中打包出来的json文件
    //   manifest: require('../dist/vendor-manifest.json'),
    // }),
	],
	devServer: {
		open: true,
		overlay: {
			warnings: true,
			errors: true,
		},
		port: 9999,
	},
	optimization: {
        runtimeChunk: {
            name: 'manifest',
        },
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    priority: -20,
                    chunks: 'all',
                },
            },
        },
   },
   devtool: 'eval-source-map',
}

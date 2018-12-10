const path = require('path') // 引入‘path’，为了在这里使用绝对路径，避免相对路径在不同系统时出现不必要的问题
const glob = require('glob')
const chalk = require('chalk')
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
		app: path.join(__dirname, '../src/app.js')  // app.js作为打包的入口
	},
	// 输出目录
	output: {
		filename: '[name].[hash].js',  //name代表entry对应的名字; hash代表 整个app打包完成后根据内容加上hash。一旦整个文件内容变更，hash就会变化
		path: path.join(__dirname, '../dist'), // 打包好之后的输出路径
		publicPath: '/' // 静态资源文件引用时的路径（加在引用静态资源前面的）
	},
	// 配置loader
	module: {
		rules: [
	// {
	//      test: /\.css$/,
	//      //use: [ 'style-loader', 'css-loader' ]
	//      loader: 'style-loader!css-loader'
	// },
		{
			test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: ["css-loader", 'postcss-loader']
				})
		},
		{
			test: /.jsx$/, //使用loader的目标文件。这里是.jsx
			loader: 'babel-loader'
		},
		{
			test: /.(js)$/, //使用loader的目标文件。这里是.js
			//loader: 'babel-loader',
			use: 'happypack/loader',
			exclude: [
				path.join(__dirname, '../node_modules')  // 由于node_modules都是编译过的文件，这里我们不让babel去处理其下面的js文件
			]
		},
		{
			test: /\.(js|jsx)$/,
			exclude: /node_modules/,
			use: [
				"babel-loader",
				"eslint-loader",
			],
		},
		{
			test: /\.(png|jpg|jpeg|gif|svg)$/,
			use: {
				loader: 'url-loader',
				options: {
					name: 'images/[name].[hash].[ext]' ,
					limit: 5 * 1024
				}
			}
		},
		{ 
			test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
			use: [
				{ 
					loader: 'url-loader',
					options: {
						limit: 8192,
						name: 'images/[name].[hash].[ext]' 
					} 
				} 
			] 
		}
	]
	},
	// 配置插件
	plugins: [
		new HTMLPlugin(
			{
				title:'react app',
				filename: 'index.html',
				template: 'index.html'
		}),
		new CleanWebpackPlugin([path.join(__dirname, 'dist')]),
		new ExtractTextPlugin({
			filename: 'css/[name].[hash].css' //放到dist/css/下
		}),
		new PurifyCSSPlugin({
			// Give paths to parse for rules. These should be absolute!
			paths: glob.sync(path.join(__dirname, '*.html')),
		}),
		new WebpackParallelUglifyPlugin({
			uglifyJS: {
				output: {
					beautify: false, //不需要格式化
					comments: false //不保留注释
				},
				compress: {
				warnings: false, // 在UglifyJs删除没有用到的代码时不输出警告
				drop_console: true, // 删除所有的 `console` 语句，可以兼容ie浏览器
				collapse_vars: true, // 内嵌定义了但是只用到一次的变量
				reduce_vars: true // 提取出出现多次但是没有定义成变量去引用的静态值
				}
			}
		}),
		new HappyPack({
			loaders: [ 'babel-loader' ]
		}),
		new ProgressBarPlugin({
			format: '  build [:bar] ' + chalk.cyan.bold(':percent') + ' (:elapsed seconds)', clear: false
		})
	],
	devServer: {
		open: true,
		overlay: {
			warnings: true,
			errors: true
		},
		//port
	},
	optimization: {
        runtimeChunk: {
            name: "manifest"
        },
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    priority: -20,
                    chunks: "all"
                }
            }
        }
   },
   devtool: 'eval-source-map',
}
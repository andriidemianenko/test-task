const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
let config = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'main.js',
        publicPath: 'dist/'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' }
                ]
            },
            {
                test: /\.js$/,
                exclude:/(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html'
        }),
        new HtmlWebpackPlugin({
            template: 'companies.html'
        }),
    ]
}

module.exports = (env, options) => {
    let production = options.mode === 'production'
    config.devtool = production ? false : 'eval-sourcemap'
    return config
}
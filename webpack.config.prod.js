const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = env => {
    console.log(env);

    return {
        context: path.resolve(__dirname, 'src'),

        entry: {
            main: './index.js',
            vendor: ['react', 'react-dom']
        },

        output: {
            filename: '[name].js',
            path: path.resolve(__dirname, 'public', 'assets')
        },

        devServer: {
            port: 8080,
            contentBase: path.resolve(__dirname, 'public')
        },

        watch: true,

        devtool: env && env.dev ? 'eval' : 'source-map',

        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['env', 'stage-0', 'react']
                        }
                    }
                },
                {
                    test: /\.scss$/,
                    use: ExtractTextPlugin.extract({
                        use: ['css-loader', 'sass-loader'],
                        fallback: 'style-loader'
                    })
                },
                {
                    test: /\.(jpe?g|png|gif|svg)$/,
                    use: {
                        loader: 'url-loader',
                        options: {
                            limit: 8000,
                            name: '[path][name].[ext]',
                            outputPath: 'img/' 
                        }
                    }
                }
            ]
        },

        plugins: [
            new webpack.NamedModulesPlugin(),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor'
            }),
            new ExtractTextPlugin('[name].css'),
            new HtmlWebpackPlugin({
                template: './src/index.html',
                hash: true
            })
        ],

        resolve: {
            extensions: ['.js', '.json', '.jsx', '*']
        }
    }
};
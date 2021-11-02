const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.config.common')

const FontRules = {
    test: /\.(woff(2)?|ttf|otf|eot)(\?v=\d+\.\d+\.\d+)?$/,
    use: [
        {
            loader: 'file-loader',
            options: {
                name: '[name].[ext]',
                outputPath: '/static/fonts/',
            },
        },
    ],
}

const FileRules = {
    test: /\.(woff(2)?|ttf|otf|eot|svg|png)(\?v=\d+\.\d+\.\d+)?$/,
    use: [
        {
            loader: 'file-loader',
            options: {
                name: '[name].[ext]',
                outputPath: '/static/fonts/',
            },
        },
    ],
}

module.exports = merge(commonConfig, {
    mode: 'production',
    module: {
        rules: [FontRules, FileRules],
    },
    output: {
        publicPath: '/nynweb',
    },
    optimization: {
        minimize: true,
    },
})

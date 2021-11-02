const path = require('path')

const CSSRules = {
    test: /\.css$/,
    use: ['style-loader', 'css-loader'],
}

const BabelRules = {
    test: /\.jsx?$/,
    loader: 'babel-loader',
    options: {
        presets: [
            [
                '@babel/preset-react',
                {
                    runtime: 'automatic',
                },
            ],
        ],
    },
}

module.exports = {
    module: {
        rules: [CSSRules, BabelRules],
    },
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'nynweb/bundle.js',
        clean: true,
    },
    module: {
        rules: [BabelRules, CSSRules],
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        alias: {
            componentes: path.resolve(__dirname, './src/componentes'),
            context: path.resolve(__dirname, './src/context'),
            pages: path.resolve(__dirname, './src/pages'),
            hooks: path.resolve(__dirname, './src/hooks'),
            services: path.resolve(__dirname, './src/services'),
            util: path.resolve(__dirname, './src/util'),
        },
    },
}

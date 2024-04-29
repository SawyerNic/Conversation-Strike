const path = require('path');

module.exports = {
    entry: {
        app: './client/home.jsx',
        login: './client/login.jsx',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'assets/img/',
                            publicPath: 'assets/img/',
                        },
                    },
                ],
            },
        ],
    },
    mode: 'production',
    watchOptions: {
        aggregateTimeout: 200,
    },
    output: {
        path: path.resolve(__dirname, 'hosted'),
        filename: '[name]Bundle.js',
    },
    devtool: 'source-map',
};
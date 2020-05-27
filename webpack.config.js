const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = [
    {
        target: 'node',
        entry: {
            site: './src/client/ts/site.ts',
        },
        node: false,
        module: {
            rules: [
                {
                    test: /\.ts?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.scss$/,
                    use: [
                        {
                            loader: 'style-loader', // creates style nodes from JS strings
                        },
                        {
                            loader: 'css-loader', // translates CSS into CommonJS
                        },
                        {
                            loader: 'sass-loader', // compiles Sass to CSS
                        },
                    ],
                },
                {
                    test: /\.(png|jpe?g|gif)$/i,
                    loader: 'file-loader',
                    options: {
                        name: 'images/[name].[ext]',
                    },
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js', '.scss'],
        },
        output: {
            filename: '[name].js',
            path: path.resolve(__dirname, 'public'),
        },
        watch: true,
    },
    {
        target: 'node',
        entry: {
            app: './src/server/index.ts',
        },
        module: {
            rules: [
                {
                    test: /\.ts?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
        output: {
            filename: '[name].js',
            path: path.resolve(__dirname, '.'),
        },
        watch: true,
        externals: nodeExternals(),
    },
];

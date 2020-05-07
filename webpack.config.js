const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = [
    {
        target: 'node',
        entry: {
            site: './src/client/typescript/index.ts',
            stats: './src/client/typescript/stats.ts',
            tanks: './src/client/typescript/tanks.ts',
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

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// process.env.NODE_ENV = 'production' on heroku server
// installed cross-env to be able to set NODE_ENV for testing.
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (process.env.NODE_ENV === 'test') {
    require('dotenv').config({path: '.env.test'});
} else if (process.env.NODE_ENV === 'development') {
    require('dotenv').config({path: '.env.development'});
}

module.exports = (env) => {
    console.log(`Webpack build for - ${env} - environment.`);

    const CSSExtract = new ExtractTextPlugin('bundle.css');

    const isProduction = env === 'production';

    return {
        entry: [
            'babel-polyfill',
            './src/app.js'
        ],
        // entry: './src/app.js',
        // entry: './src/playground/redux-101.js',
        // entry: './src/playground/destructuring.js',
        // entry: './src/playground/redux-expensify.js',
        // entry: './src/playground/hoc.js',
        output: {
            path: path.join(__dirname, 'public', 'dist'),
            filename: 'bundle.js'
        },
        module: {
            rules: [{
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            }, {
                test: /\.s?css$/,
                use: CSSExtract.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                })
            }]
        },
        plugins: [
            CSSExtract,
            // this lets us define an object, and in the object we define the variables
            // we will like to pass down into our client side js.
            // Using JSON.stringify() to add quotes e.g 'xyz-value'
            new webpack.DefinePlugin({
                'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
                'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
                'process.env.FIREBASE_DATABASE_URL': JSON.stringify(process.env.FIREBASE_DATABASE_URL),
                'process.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
                'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
                'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID),
                'process.env.FIREBASE_APP_ID': JSON.stringify(process.env.FIREBASE_APP_ID),
            })
        ],
        devtool: isProduction ? 'source-map' : 'inline-source-map',
        devServer: {
            port: 8090,
            contentBase: path.join(__dirname, 'public'),
            // tell the devServer to always serve up index.html for all unknown 404s
            historyApiFallback: true,
            publicPath: '/dist/'
        }
    }
}

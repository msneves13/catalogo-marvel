const webpack = require('webpack');

module.exports = {
    plugins: [new webpack.DefinePlugin({
        'process.env': {
            PUBLIC_KEY: JSON.stringify(process.env.PUBLIC_KEY),
            PRIV_KEY: JSON.stringify(process.env.PRIV_KEY)
        }
    })]
}
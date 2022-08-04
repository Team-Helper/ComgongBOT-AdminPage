const path = require('path');

module.exports = {
    runtimeCompiler: true,
    productionSourceMap: false,
    outputDir: path.resolve(__dirname, "./build"),

    publicPath: process.env.NODE_ENV === 'production'
        ? './'
        : '/'
};
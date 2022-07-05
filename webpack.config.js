const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const resolve = require( 'path' ).resolve;

module.exports = {
    ...defaultConfig,
    resolve: {
        ...defaultConfig.resolve,
        alias: {
            '@helpers': resolve( __dirname, './src/helpers' ),
            '@components': resolve( __dirname, './src/components' ),
            '@constants': resolve( __dirname, './src/constants' )
    }
    }
};
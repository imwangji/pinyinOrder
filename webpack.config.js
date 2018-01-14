const path = require("path");

module.exports={
    entry:"./src/PinYinOrder.js",
    output:{
        path:path.resolve('./dist'),
        filename:'PinYinOrder.bundle.js'
    },
    module:{
        rules:[
            {
                test: /\.js$/, 
                use: {
                    loader:'babel-loader',
                    options:{
                        presets:['es2015']
                    }
                }
            },
            {
                test: /\.json$/, 
                use: {
                    loader:'json-loader',
                }
            }
        ]
    }
}
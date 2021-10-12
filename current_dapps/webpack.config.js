let HtmlWebPackPlugin=require('html-webpack-plugin');
let path = require('path');
// require('./src/app')
module.exports={
    // entry:'./src/index.js',
    entry:[
        'regenerator-runtime/runtime',
        './src/index.js',
      ],
    output:{
        filename:"bundle.[hash].js",
        path:path.resolve(__dirname,"dist"),
        
    },
    plugins:[new HtmlWebPackPlugin({template:"./src/index.html"})],
    resolve:{
        modules:[__dirname,"src","node_modules"],
        extensions:["*",".js",".jsx",".tsx",".ts"]
    },
    module:{

        rules:[
            {
                test:/\.(js|jsx)$/,
                exclude:/node_modules/,
                // use:{
                //     loader:"babel-loader"
                // }
                loader:require.resolve('babel-loader')
            }
        ]
    }
    

}
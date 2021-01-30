
var path = require("path");

module.exports = {
    mode:'production',
    devServer: {
        contentBase: path.join(__dirname, "alazea-gh-pages"),
        compress: true,
        port: 3001,
        proxy: {
            "/api": {
              target: "http://minmakeitnow.com",
            //   pathRewrite: {"^/api" : ""}
            }
        },
        
      }
}
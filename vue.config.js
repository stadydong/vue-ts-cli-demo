const path = require("path")
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
module.exports = {
  configureWebpack:{
    resolve:{
      alias:{
        "@":path.resolve(__dirname,"src"),
        "components":path.resolve(__dirname,"src/components"),
        "views":path.resolve(__dirname,"src/views"),
        "store":path.resolve(__dirname,"src/store")
      }
    },
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
    devServer:{
      proxy:{
        "/api":{
          target:"http://localhost:3000",
          changeOrigin:true,
          pathRewrite:{
            "^/api":""      //匹配/api开头的路径转为""
          }
        }
      }
    },
  }
}
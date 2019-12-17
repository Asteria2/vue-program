/* const seller = require('./data.json').seller;
const goods = require('./data.json').goods;
const ratings = require('./data.json').ratings; */
const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  devServer: {
    port: 4000,
    open: true
  },
  lintOnSave: false,
  configureWebpack: {
    resolve: {
      alias: {
        'components': resolve('src/components'),
        'pages': resolve('src/pages')
      }
    }
  }
  /* configureWebpack: {
    devServer: {
      before(app) {
        app.get("/api/seller", (req, res) => {
            res.json({
              errno: 0,
              data: seller
            })
          }),
          app.get("/api/goods", (req, res) => {
            res.json({
              errno: 0,
              data: goods
            })
          }),
          app.get("/api/ratings", (req, res) => {
            res.json({
              errno: 0,
              data: ratings
            })
          })
      }
    }
  } */
}
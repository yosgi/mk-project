const { debug } = require('request')
const request = require('request')
module.exports = function () {
  return async function (ctx, next) {
    let { method, url, header, body } = ctx.request
    if (/api/.test(url)) {
      let body = await _proxy()
      ctx.response.body = body
    } 
    
    function _proxy() {
      return new Promise((resolve, reject) => {
        let _body = ''
        try {
          _body = JSON.stringify(body)
        } catch (e) {
          _body = body
        }
        request({
          method,
          url: 'http://minmakeitnow.com',
          header,
          body: _body
        }, (err, response, body) => {
          resolve(body)
        })
      })
    }
    await next()
  }
}
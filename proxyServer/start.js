const static = require('koa-static')
const Koa = require('koa');
const path = require('path')
const app = new Koa();
const koaBody = require('koa-body')
const cors = require('koa-cors')
const proxyServer = require('./middleware/proxy')

app.use(koaBody());
app.use(cors());
app.use(proxyServer());
app.use(static(path.join('../alazea-gh-pages')))
app.listen(80)

var jsonServer = require('json-server')
var server = jsonServer.create()
var router = jsonServer.router('./server/data.json')
var middlewares = jsonServer.defaults()

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

server.use(router)
server.listen(3000, function () {
  console.log('JSON Server is running')
})
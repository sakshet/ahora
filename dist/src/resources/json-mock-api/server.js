const jsonServer = require('json-server');
const path = require('path');
const routes = require('./routes.json');
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();
server.use(jsonServer.rewriter(routes));
server.use(middlewares);
server.use(router);
server.listen(3001, () => {
    console.log('JSON Server is running');
});

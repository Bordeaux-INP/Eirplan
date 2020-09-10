const http = require('http');
const app = require('./app');

const port = process.env.PORT || 3007;

const server = http.createServer(app);

server.listen(port, console.log('server started on port ',port));

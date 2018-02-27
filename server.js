var http = require('http');
var app = require('./app.js')();
var data={};

http.createServer(app).listen(process.env.PORT);
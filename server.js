var path = require('path');
var express = require('express');
var app = express();
var webpack = require("webpack");
var engine = require('engine.io');
var server = require('http').Server(app);
var websockets = require('engine.io')(server);


if (process.env.DEBUG) {
  var config = require('./webpack.config');
  var compiler = webpack(config);
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
    historyApiFallback: true
  }));

  app.use(require('webpack-hot-middleware')(compiler));
} else {
  var config = require('./webpack.production');
  webpack(config, function(err, stats) {
    if (err) console.error(err)
  });
}

app.get('/static/bundle.js', function(req, res) {
  res.sendFile(path.join(__dirname, 'dist/bundle.js'));
})
app.get('/static/app.css', function(req, res) {
  res.sendFile(path.join(__dirname, 'dist/app.css'));
})
app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

server.listen(process.env.PORT || 5000);

// app.listen(process.env.PORT || 5000, 'localhost', function (err, result) {
//   if (err) {
//     console.log(err);
//   }
//
//   console.log('Listening at localhost:' + (process.env.PORT || 5000));
// });


// WEB SOCKETS
// var websockets = engine.attach(app);
var clients = {}
websockets.on('connection', function (socket) {
  socket.clientNum = Object.keys(clients).length

  socket.on('message', function(data){
    json = JSON.parse(data)
    switch(json.method) {
      case 'getUserCount': return socket.send(JSON.stringify({method: 'gotUserCount', data: Object.keys(clients).length}))
    }
  });

  clients[socket.clientNum] = socket
  var total = Object.keys(clients).length
  for (var clientNum in clients) {
    if (!clients.hasOwnProperty(clientNum)) continue
    if (clientNum === socket.clientNum) continue
    clients[clientNum].send(JSON.stringify({method: 'gotUserCount', data: total}))
  }

  socket.on('close', function(){
    delete clients[this.clientNum]
    var total = Object.keys(clients).length

    for (var clientNum in clients) {
      if (!clients.hasOwnProperty(clientNum)) continue
      clients[clientNum].send(JSON.stringify({method: 'gotUserCount', data: total}))
    }
  });
});

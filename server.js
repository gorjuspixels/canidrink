var path = require('path');
var express = require('express');
var app = express();
var webpack = require("webpack");


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

app.listen(process.env.PORT || 5000, 'localhost', function (err, result) {
  if (err) {
    console.log(err);
  }

  console.log('Listening at localhost:' + (process.env.PORT || 5000));
});

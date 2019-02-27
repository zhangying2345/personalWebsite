var express = require('express');
var app = express();
var ip = require('ip');
// 托管静态文件y
app.use(express.static('../vueClient/my-project/dist/'));

app.get('/', function (req, res) {
  res.send('Hello World!');
  console.log('tt');
});

var server = app.listen(3000, ip.address(), function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
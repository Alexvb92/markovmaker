const express = require('express');
const path = require('path');
var proxy = require('express-http-proxy');
const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
console.log('listening on 3000...')
app.use('/', proxy('http://localhost:4000'));
app.listen(3000);

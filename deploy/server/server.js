var connect = require('connect');
var path = require('path');
var serveStatic = require('serve-static');
var compression = require('compression')

var app = connect();
var cacheTime = 86400000 * 1;

app.use(compression());
app.use(serveStatic(path.join(__dirname, '..', 'web-client'), {
  'index': ['default.html'],
  maxAge: cacheTime
}));
app.listen(process.env.PORT || 3000);

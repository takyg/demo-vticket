var ejs = require('ejs'); 
var fs = require('fs'); 
var express = require('express');
var app = express();
var url  = require('url');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

var pageBase = fs.readFileSync(app.get('views') + '/header.ejs', 'utf8');



app.get('/temp', function(req, res){
	var html = ejs.render(pageBase, {
		title:"タイトルです",
		contents:"これはサンプルで作成したテンプレートです。",
	});
	res.set('Content-Type', 'text/html');
	res.send(html);
	res.end();
});

app.get('/api', function(req, res){
  var query = url.parse(req.url, true).query;
  var data = {};
  var callback;
  for (var key in query) {
    var val = query[key];
    if (key === 'callback' && /^[a-zA-Z]+[0-9a-zA-Z]*$/.test(val) ) {
      callback = val;
    } else {
      data[key]=val;
    }
  }
  data = JSON.stringify(data);
  res.writeHead(200, {'Content-Type':'application/json; charset=utf-8'});
  res.end( callback ? callback + "(" + data + ")" : data );
});

app.listen(app.get('port'), function() {
	console.log('Node app is running on port', app.get('port'));
});

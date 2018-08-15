var ejs = require('ejs'); 
var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

var pageBase = fs.readFileSync('./header.ejs', 'utf8');

app.get('/test', function(req, res){
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.send('<html><head></head><body>ハンドラが見つかりました</body></html>');
});

app.get('/temp', function(req, res){
	var html = ejs.render(pageBase, {
		title:"タイトルです",
		content:"これはサンプルで作成したテンプレートです。",
	});
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(html);
	res.end();
});

app.listen(app.get('port'), function() {
	console.log('Node app is running on port', app.get('port'));
});

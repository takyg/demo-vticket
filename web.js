var cool = require('cool-ascii-faces');
var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


app.get('/test', function(req, res){
	res.set('Content-Type', 'text/html');
	res.send('<html><head></head><body>js</body></html>');
});

app.listen(app.get('port'), function() {
	console.log('Node app is running on port', app.get('port'));
});

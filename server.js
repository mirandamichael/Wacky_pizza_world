var express = require('express');
var app = express();
var encounter = 0;
var path = require('path');
var xmlparser = require('express-xml-bodyparser');
var pizzaorders = [];

app.set('port', (process.env.PORT || 5000));

app.use(xmlparser());

app.get('/', function (req, res) {
  res.redirect('/static');
})
app.get('/meow', function (req, res)
{
	res.send("mix")
});

app.get('/orders', function (req, res) {
	var tableBody = '';
	for (var i = 0; i < pizzaorders.length; i++) {
		var pizzaorder = pizzaorders[i];
		tableBody += '<tr>';
		tableBody += '<td>' + pizzaorder.size + '</td>';
		tableBody += '<td>' + pizzaorder.crusttype + '</td>';
		tableBody += '<td>' + pizzaorder.cheese + '</td>';
		tableBody += '<td>' + pizzaorder.topping.join(', ')  + '</td>';
		console.log(JSON.stringify(pizzaorder.topping));
		tableBody += '</tr>';
	}
	var orderHtml = '<table border = "1"><thead><tr><th>Size</th><th>Crust Type</th><th>Cheese</th><th>Toppings</th></tr></thead><tbody>' + tableBody + '</tbody></table>';
	res.send('<html><head><title>Orders</title></head><body><h1>Orders</h1>' + orderHtml + '</body></html>')
});

app.post('/order', function (req, res) {//makes the server listen for requests for the url /order
  	
  res.send('you sent me: ' + req.body.pizzaorder);
  pizzaorders.push(req.body.pizzaorder)
});

app.use('/static', express.static(__dirname + '/static'));

var server = app.listen(app.get('port'), function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

})
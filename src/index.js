var express = require('express');
var bodyParser = require('body-parser');
var cowsay = require('cowsay');
var env = require('./../env');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(3000);

app.post('/store', function (req, res) {
	return res.send(cowsay.say({ text: req.body.text }));
});


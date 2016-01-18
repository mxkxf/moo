var express = require('express');
var bodyParser = require('body-parser');
var cowsay = require('cowsay');
var env = require('dotenv');

require('dotenv').load();

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(process.env.PORT || 3000);

app.post('/store', function (req, res) {
	if (req.body.token !== process.env.SLACK_TOKEN) {
		return false;
	}

	return res.send(cowsay.say({ text: req.body.text }));
});


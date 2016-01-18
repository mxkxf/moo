var express = require('express');
var bodyParser = require('body-parser');
var cowsay = require('cowsay');
var env = require('dotenv');

require('dotenv').load();

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(process.env.PORT || 3000);

app.post('/', function (req, res) {
	if (req.body.token !== process.env.SLACK_TOKEN) {
		return res.send('');
	}

	var response = '```' + cowsay.say({ text: req.body.text }) + '```';

	return res.send(response);
});

app.all('*', function (req, res) {
	return res.send("Error: Please check your Slash Command's Integration URL")
});

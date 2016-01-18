var express = require('express');
var bodyParser = require('body-parser');
var cowsay = require('cowsay');
var env = require('dotenv');

require('dotenv').load();

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var server = app.listen(process.env.PORT || 3000);

app.post('/', function (req, res) {
	if (req.body.token !== process.env.SLACK_TOKEN) {
		return res.send('');
	}

	if (!req.body.text){
		return res.status(400).send("Text should be sent together with token");
	}

	var eyes = req.body.e || req.body.eyes;
	var tongue = req.body.T || req.body.tongue;

	var response = '```' + cowsay.say({ text: req.body.text, e: eyes, T: tongue }) + '```';
	return res.send(response);
});

app.all('*', function (req, res) {
	return res.status(400).send("Error: Please check your Slash Command's Integration URL");
});

module.exports = server;

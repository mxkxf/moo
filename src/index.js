var express = require('express');
var bodyParser = require('body-parser');
var cowsay = require('cowsay');
var env = require('dotenv');

require('dotenv').config({ silent: true });

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(process.env.PORT || 3000);

app.post('/', function (req, res) {
	if (req.body.token !== process.env.SLACK_TOKEN) {
		return res.status(400)
			.send({ text: "Slack token is incorrect" });
	}

	var responseText = '```' + cowsay.say({ text: req.body.text }) + '```';

	return res.send({
		response_type: 'in_channel',
		text: responseText
	});
});

app.all('*', function (req, res) {
	return res.status(400)
		.send({ text: "Error: Please check your Slash Command's Integration URL" });
});

module.exports = app;

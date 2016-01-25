require('dotenv').config({ silent: true });

var app = require('express')();
var bodyParser = require('body-parser');
var cowsay = require('cowsay');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(process.env.PORT || 3000);

app.post('/', function(req, res) {
  if (req.body.token !== process.env.SLACK_TOKEN) {
    return res.status(400)
        .send({ text: 'Slack token is incorrect' });
  }

  if (!req.body.text) {
    return res.status(400)
        .send({ text: 'No text provided' });
  }

  var eyes = parseArguments(req.body.text, 'eyes');
  var tongue = parseArguments(req.body.text, 'tongue');
  var text = req.body.text.split('\[')[0];

  var response = '```' + cowsay.say({ text: text, e: eyes, T: tongue }) + '```';

  return res.send({
    response_type: 'in_channel',
    text: response,
  });
});

function parseArguments(text, argumentName) {
  var arguments = text.match(/[^[\]]+(?=])/g);
  if (arguments) {
    for (var i = 0; i < arguments.length; i++) {
      var arg = arguments[i];
      if (arg.split(' ')[0] === argumentName) {
        return arg.substring(argumentName.length).trim();
      }
    }
  }
}

app.all('*', function(req, res) {
  return res.status(400)
      .send({ text: "Error: Please check your Slash Command's Integration URL" });
});

module.exports = app;

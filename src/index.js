require('dotenv').config({ silent: true });

var app = require('express')();
var bodyParser = require('body-parser');
var cowsay = require('cowsay');
var parser = require('./parser');

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

  if (req.body.text == 'help') {
    var responseText = 'Usage: /moo {text_message} [eyes {eyes_value} [tongue {tongue_value}]]';

    return res.send({
      response_type: 'in_channel',
      text: responseText,
    });
  }

  var eyes = parser.getArgument(req.body.text, 'eyes');
  var tongue = parser.getArgument(req.body.text, 'tongue');
  var mode = parser.getArgument(req.body.text, 'mode');  
  var text = req.body.text.split('\[')[0];
  
  var options = {
    text: text,
    e: eyes,
    T: tongue
  };
  
  options[mode] = true;

  var responseText = '```' + cowsay.say(options) + '```';

  return res.send({
    response_type: 'in_channel',
    text: responseText,
  });
});

app.all('*', function(req, res) {
  return res.status(400)
      .send({ text: "Error: Please check your Slash Command's Integration URL" });
});

module.exports = app;

process.env.SLACK_TOKEN = 'someToken';

var app = require('./../src/index');
var request = require('supertest')(app);
var fs = require('fs');
var path = require('path');

describe('moo', function() {
  it('should send back a successful response for a Slack request with text only', function(done) {
    request.post('/')
        .send({ token: 'someToken', text: 'test' })
        .expect(200, done);
  });

  it('should send back a successful response for a Slack request with text and eyes param', function(done) {
    request.post('/')
        .send({ token: 'someToken', text: 'test', eyes: 'xx' })
        .expect(200, done);
  });

  it('should send back a successful response for a Slack request with text, eyes and tongue', function(done) {
    request.post('/')
        .send({ token: 'someToken', text: 'test', eyes: '**', tongue: 'U' })
        .expect(200, done);
  });

  it('should send back message with help instructions when specific command is sent', function(done) {
    request.post('/')
        .send({ token: 'someToken', text: 'help' })
        .expect(200, '{"response_type":"in_channel","text":"```## Usage\\n\\n/moo [text message] [eyes] [tongue]\\n\\nSending:\\n/moo yoyoyo\\n\\nGives:\\n ________\\n< yoyoyo >\\n --------\\n        \\\\   ^__^\\n         \\\\  (oo)\\\\_______\\n            (__)\\\\       )\\\\/\\\\\\n                ||----w |\\n                ||     ||\\n\\nYou can also use `eyes` and `tongue` parameters to customize your moo even more:\\n\\n/moo i’m very confmoosed [eyes Oo]\\n\\nGives:\\n\\n ______________________\\n< i\'m very confmoosed  >\\n ----------------------\\n        \\\\   ^__^\\n         \\\\  (Oo)\\\\_______\\n            (__)\\\\       )\\\\/\\\\\\n                ||----w |\\n                ||     ||\\n\\n\\n/moo i like to show my tongue [tongue U] [eyes **]\\n\\nGives :\\n ____________________________\\n< i like to show my tongue  >\\n ----------------------------\\n        \\\\   ^__^\\n         \\\\  (**)\\\\_______\\n            (__)\\\\       )\\\\/\\\\\\n             U ||----w |\\n                ||     ||```"}', done);
  });

  it('should error when no text is provided', function(done) {
    request.post('/')
        .send({ token: 'someToken' })
        .expect(400, '{"text":"No text provided"}', done);
  });

  it('should error when a valid Slack token is not provided', function(done) {
    request.post('/')
        .send({ token: 'someInvalidToken', text: 'test' })
        .expect(400, '{"text":"Slack token is incorrect"}', done);
  });

  it('should error for any other request', function(done) {
    request.get('/')
        .expect(400, '{"text":"Error: Please check your Slash Command\'s Integration URL"}', done);
  });
});

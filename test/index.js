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
        .expect(200, '{"response_type":"in_channel","text":"Usage: /moo {text_message} [eyes {eyes_value} [tongue {tongue_value}]]"}', done);
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

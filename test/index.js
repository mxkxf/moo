process.env.SLACK_TOKEN = 'someToken';

var app = require('./../src/index');
var request = require('supertest')(app);

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
        .send({ token: 'someToken', text: 'test', eyes: '**', T: 'U' })
        .expect(200, done);
  });

  it('should send back a successful response for a Slack request', function(done) {
    request.post('/')
        .send({ token: 'someToken', text: 'test', e: '**', tongueT: 'U' })
        .expect(200, done);
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

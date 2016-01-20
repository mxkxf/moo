process.env.SLACK_TOKEN = 'someToken';

var app = require('./../src/index');
var request = require('supertest')(app);

describe('moo', function () {
	it('should send back a successful response for a Slack request', function (done) {
		request.post('/')
			.send({ token: 'someToken', text: 'test' })
			.expect(200, done);
	});

	it('should error when no text is provided', function (done) {
		request.post('/')
			.send({ token: 'someToken' })
			.expect(400, done);
	});

	it('should error when a valid Slack token is not provided', function (done) {
		request.post('/')
			.send({ token: 'someInvalidToken', text: 'test' })
			.expect(400, done);
	});

	it('should error for any other request', function (done) {
		request.get('/')
			.expect(400, done);
	});
});

var app = require('./../src/index');
var cowsay = require('cowsay');
var request = require('supertest')(app);

describe('moo', function () {
	it('should send back a successful response for a Slack request', function(done) {
		request.post('/')
			.send({ text: 'test' })
			.expect(200, {
				response_type: 'in_channel',
				text: '```' + cowsay.say({ text: 'test' }) + '```'
			}, done);
	});

	it('should error for any other request', function(done) {
		request.get('/')
			.expect(400, done);
	});
});

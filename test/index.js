process.env.SLACK_TOKEN = 'someToken';

var app = require('./../src/index');
var request = require('supertest')(app);

String.prototype.format = function (placeholders) {
    var s = this;
    for (var propertyName in placeholders) {
        var re = new RegExp('{' + propertyName + '}', 'gm');
        s = s.replace(re, placeholders[propertyName]);
    }
    return s;
};

var allParamsResponseTemplate = "``` ______\n< {text} >\n ------\n        \\   ^__^\n         \\  ({eyes})\\_______\n            (__)\\       )\\/\\\n             {tongue} ||----w |\n                ||     ||```";
var textOnlyResponseTemplate = "``` ______\n< {text} >\n ------\n        \\   ^__^\n         \\  ({eyes})\\_______\n            (__)\\       )\\/\\\n               {tongue} ||----w |\n                ||     ||```";

describe('moo', function () {
    it('should send back a successful response for a Slack request with text only', function (done) {
        request.post('/')
            .send({ token: 'someToken', text: 'test' })
            .expect(200, textOnlyResponseTemplate.format({text: "test", eyes:"oo", tongue:""}), done);
    });

    it('should send back a successful response for a Slack request with text and eyes param', function (done) {
        request.post('/')
            .send({ token: 'someToken', text: 'test', "eyes": "xx" })
            .expect(200, textOnlyResponseTemplate.format({text: "test", eyes: "xx", tongue:""}), done);
    });

    it('should send back a successful response for a Slack request with text, eyes and tongue', function (done) {
        request.post('/')
            .send({ token: 'someToken', text: 'test', "eyes": "**", "T": "U"})
            .expect(200, allParamsResponseTemplate.format({text: "test", eyes: "**", tongue: "U"}));
        done();
    });

    it('should send back a successful response for a Slack request', function (done) {
        request.post('/')
            .send({ token: 'someToken', text: 'test', "e": "**", "tongueT": "U"})
            .expect(200, allParamsResponseTemplate.format({text: "test", eyes: "**", tongue: "U"}));
        done();
    });

    it('should error when no text is provided', function (done) {
        request.post('/')
            .send({ token: 'someToken' })
            .expect(400, '{"text":"No text provided"}', done);
    });

    it('should error when a valid Slack token is not provided', function (done) {
        request.post('/')
            .send({ token: 'someInvalidToken', text: 'test' })
            .expect(400, '{"text":"Slack token is incorrect"}', done);
    });

    it('should error for any other request', function (done) {
        request.get('/')
            .expect(400, '{"text":"Error: Please check your Slash Command\'s Integration URL"}',done);
    });
});
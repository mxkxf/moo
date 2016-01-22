var request = require('supertest');
require = require('really-need');
var env = require('dotenv');
require('dotenv').load();
var given = require('mocha-testdata');


String.prototype.format = function (placeholders) {
    var s = this;
    for (var propertyName in placeholders) {
        var re = new RegExp('{' + propertyName + '}', 'gm');
        s = s.replace(re, placeholders[propertyName]);
    }
    return s;
};

var allParamsResponseTemplate = "``` ______________________\n< {text} >\n ----------------------\n        \\   ^__^\n         \\  ({eyes})\\_______\n            (__)\\       )\\/\\\n             {tongue} ||----w |\n                ||     ||```";
var textOnlyResponseTemplate = "``` ______________________\n< {text} >\n ----------------------\n        \\   ^__^\n         \\  ({eyes})\\_______\n            (__)\\       )\\/\\\n                ||----w |\n                ||     ||```";
var correctToken = "test123";
process.env.SLACK_TOKEN = correctToken;

describe('loading server', function () {
    var server;
    beforeEach(function () {
        server = require('../src/index', {bustCache: true});
    });
    afterEach(function (done) {
        server.close(done);
    });

    it("responds with 400 error message when text is not passed", function testCorrectToken(done) {
        var text = "";
        var eyes = "";
        var tongue = "";


        var reqBody = {"token": correctToken, "text": text, "e": eyes, "T":tongue};
        request(server)
            .post("")
            .send(reqBody)
            .expect(400, "Text should be sent together with token",  done);
    });

    it("responds with 200 code and message when token and text are passed", function testCorrectToken(done) {
        var text = "moo is a cool module";
        var eyes = "";
        var tongue = "";

        var reqBody = {"token": correctToken, "text": text, "e": eyes, "T":tongue};
        request(server)
            .post("")
            .send(reqBody)
            .expect(200, textOnlyResponseTemplate.format({text: text, eyes: "oo", tongue: tongue}), done);
    });

    it("responds with 200 code and message when token text and eyes are passed", function testCorrectToken(done) {
        var text = "moo is a cool module";
        var eyes = "**";
        var tongue = "";

        var reqBody = {"token": correctToken, "text": text, "e": eyes, "T":tongue};
        request(server)
            .post("")
            .send(reqBody)
            .expect(200, textOnlyResponseTemplate.format({text: text, eyes: eyes, tongue: tongue}), done);
    });

    it("responds with 200 code and message when token text, eyes and tongue are passed", function testCorrectToken(done) {
        var text = "moo is a cool module";
        var eyes = "**";
        var tongue = "U";

        var reqBody = {"token": correctToken, "text": text, "e": eyes, "T":tongue};
        request(server)
            .post("")
            .send(reqBody)
            .expect(200, allParamsResponseTemplate.format({text: text, eyes: eyes, tongue: tongue}), done);
    });

    it("responds with 200 code and message when token text, (alternative) eyes and tongue are passed", function testCorrectToken(done) {
        var text = "moo is a cool module";
        var eyes = "**";
        var tongue = "U";

        var reqBody = {"token": correctToken, "text": text, "eyes": eyes, "T":tongue};
        request(server)
            .post("")
            .send(reqBody)
            .expect(200, allParamsResponseTemplate.format({text: text, eyes: eyes, tongue: tongue}), done);
    });

    it("responds with 200 code and message when token text, eyes and (alternative) tongue are passed", function testCorrectToken(done) {
        var text = "moo is a cool module";
        var eyes = "**";
        var tongue = "U";

        var reqBody = {"token": correctToken, "text": text, "eyes": eyes, "tongue":tongue};
        request(server)
            .post("")
            .send(reqBody)
            .expect(200, allParamsResponseTemplate.format({text: text, eyes: eyes, tongue: tongue}), done);
    });

    it("responds with 200 code and message when token text, (alternative) eyes and (alternative) tongue are passed", function testCorrectToken(done) {
        var text = "moo is a cool module";
        var eyes = "**";
        var tongue = "U";

        var reqBody = {"token": correctToken, "text": text, "eyes": eyes, "tongue":tongue};
        request(server)
            .post("")
            .send(reqBody)
            .expect(200, allParamsResponseTemplate.format({text: text, eyes: eyes, tongue: tongue}), done);
    });

    it("should send an empty reposnse when token is incorrect", function testIncorrectToken(done) {
        var text = "moo is a cool module";
        var eyes = "**";
        var tongue = "U";

        var reqBody = {"token": "test", "text": text, "eyes": eyes, "tongue":tongue};
        request(server)
            .post("")
            .send(reqBody)
            .expect(200, "", done);
    });

    it('responds incorrect request', function testSlash(done) {
        request(server)
            .get('/')
            .expect(400, "Error: Please check your Slash Command's Integration URL", done);
    });
});

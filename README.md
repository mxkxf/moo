# moo

An express wrapper for cowsay, so you can moo like you mean it in Slack.

## Usage

```
/moo yoyoyo
```

Gives:

```
 ________
< yoyoyo >
 --------
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||
```

## Installation

Click the button below:

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

And make a note on your app's URL.

Then head to Slack and create a custom Slash Command, paste in your app's URL to the Integration URL field, and make a note of your `token`.

Head back to your Heroku app's Settings > Config Variables and create a new `SLACK_TOKEN` with the `token` value from above.

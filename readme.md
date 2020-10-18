# Secret Santa Mailer

A simple script that allows you to anonymously assign gifts from a random category to generated pairs of people - [rules](https://en.wikipedia.org/wiki/Secret_Santa)

## Preparation

Clone the repo and install dependencies.
Then you should copy `.env.example` file into `.env` and insert your Gmail credentials into it

**Disclaimer**
_For now, only gmail mails are supported, you should also have a ["Less secure apps access" enabled](https://support.google.com/accounts/answer/6010255?hl=en)_

Now you can fill all users that will participate in the game, to do this you need to copy `users.json.example` into `users.json` and fill in players details as in example:

```json
[
  {
    "name": "test",
    "mail": "test@example.com
  }
]
```

You have to do simmilar thing with a `categories.json.example` file. There you can enter as many categories of gifts you want.

## Sending mails

If you prepared all data, you can simply run a script using:

```bash
$ yarn start
or
$ npm run start
```

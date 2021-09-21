# Tweetbot for Discord
A simple Node.js bot to retrieve posts and quoted retweets from a Twitter user and post these to a Discord channel.

## Table of contents
* [Getting Started](#getting-started)
    * [Prerequisites](#Prerequisites)
    * [Installation](#installation)
    * [Running the code](#running-the-code)
* [Built with](#built-with)

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
To install the code you will need [Node.js](https://nodejs.org/en/).
See [package.json](package.json) for the minimum _Node.js_ version.

To query Twitter you will need to create an app through the [Twitter Developer Portal](https://developer.twitter.com/en/portal/dashboard).

You will need to create a [Discord webhook](https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks)
to set up your channel and bot.

### Installation
Pull the code from GitHub.

Check out the [example configuration file](./src/config/example.js) and set up a `config.js` file in the same directory with your settings.

**If you don't do this, the code won't run.**

### Running the code
Use `npm start` in a terminal like _CMD_ to run the code.

## Built with
* [Node.js](https://nodejs.org/en/)
* [Twitter API](https://developer.twitter.com/en/docs/twitter-api)
* [Discord Webhook API](https://discord.com/developers/docs/resources/webhook)

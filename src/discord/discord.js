const config = require("../config/config");
const https = require("https");
const logger = require("../helpers/logger")

const bot_name = config.discord.bot_name;
const tweet_url = `https://twitter.com/${config.twitter.username}/status/`;
const api_root = config.discord.api_root;
const webhook_url = config.discord.webhook_url;

/*
 * Posts a tweet in a Discord channel using a webhook
 *
 * Set the Discord connections in the configuration file
 * @param tweet {Object} The Twitter API Tweet object to post to Discord
 * @return {Promise}
 * @see /config/example.js
 */
function sendPost(tweet) {
    logger.info('Posting to Discord...');
    return new Promise((resolve) => {
        logger.debug('Tweet to send:', tweet);
        const json = {
            "username": bot_name,
            "content": `${tweet_url}${tweet.id}`
        }

        const data = JSON.stringify(json);
        logger.debug('Sending data:', data);

        // Create HTTPS request
        const options = {
            hostname: api_root,
            method: 'POST',
            path: webhook_url,
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const req = https.request(options, res => {
            logger.info(`Discord API status code: ${res.statusCode} ${res.statusMessage}`);
            logger.debug('Response headers:', res.headers);
        })

        req.on('error', error => {
            logger.warn('An error has occurred while posting to Discord:', error);
            resolve();
        });

        req.on('close', () => {
            logger.info('Finished posting to Discord');
            resolve();
        })

        req.write(data);
        req.end();
    });
}

exports.sendPost = sendPost;
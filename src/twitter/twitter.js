const config = require("../config/"+(process.env.CONFIG_FILE || "config"));
const https = require("https");
const logger = require("../helpers/logger")

/*
 * Retrieves tweets from a user's timeline based on query parameters
 *
 * Set the query parameters in the configuration file
 * @param query {string} The Twitter query to poll
 * @return {Promise}
 * @see /config/example.js
 */
function getTweets(query) {
    logger.info("Polling Twitter at: " + (new Date(Date.now()).toLocaleString()));
    return new Promise((resolve) => {
        const options = {
            hostname: config.twitter.api_root,
            method: 'GET',
            path: '/2' + query,
            headers: {
                'Authorization': `${config.twitter.auth_method} ${config.twitter.bearer_token}`
            }
        }

        const req = https.request(options, res => {
            logger.info(`Twitter API status code: ${res.statusCode} ${res.statusMessage}`);
            logger.debug('Response headers:', res.headers);

            res.on('data', data => {
                data = JSON.parse(data);
                logger.debug('Response data', data);
                logger.info(`Filtering ${data.meta['result_count']} tweets`);

                let tweets = [];
                for (let id in data.data) {
                    let tweet = data.data[id];
                    if (isPost(tweet) || isQuotedRetweet(tweet)) {
                        tweets.push(tweet);
                    }
                }

                logger.info(`Found ${tweets.length} new tweets`);
                logger.debug('Tweets:', tweets);
                resolve(tweets);
            })
        })

        req.on('error', error => {
            logger.warn('An error has occured while retrieving tweets:', error);
            resolve();
        })

        req.end()
    })
}

/*
 * Checks if a tweet is a post
 *
 * A tweet is a post when there are no referenced tweets
 * @param tweet {Object} Twitter API Object with "referenced_tweets" data
 * @return {boolean}
 */
function isPost(tweet) {
    return tweet["referenced_tweets"] === undefined;
}

/*
 * Checks if a tweet is a quoted retweet
 *
 * A tweet is a quoted retweet when the referenced tweet is of type quoted
 * @param tweet {Object} Twitter API Object with "referenced_tweets" data
 * @return {boolean}
 */
function isQuotedRetweet(tweet) {
    return tweet["referenced_tweets"]["type"] === 'quoted';
}

exports.getTweets = getTweets;
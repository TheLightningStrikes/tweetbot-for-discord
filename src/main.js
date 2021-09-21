const config = require("./config/"+(process.env.CONFIG_FILE || "config"));
const logger = require('./helpers/logger');
const twitter = require('./twitter/twitter');
const discord = require('./discord/discord')
const timeConverter = require('./helpers/millisecondsConverter');

const timer_delay = config.bot_settings.timer_delay;
const logFile = config.bot_settings.logfile;
const query = config.twitter.query;

if (logFile) {
    logger.initLogFile();
}

checkTweets(timer_delay);

/*
 * Polls tweets from a user every x milliseconds, then posts these to a Discord channel
 *
 * Set the polling interval in the configuration file
 * @param delay
 * @see /config/example.js
 */
function checkTweets(delay) {
    let date = new Date(Date.now()-delay);
    let start_time = date.toISOString(); // Twitter wants an ISO string..

    twitter.getTweets(query+start_time).then((tweets) => {
            const promises = [];
            for (let id in tweets) {
                promises.push(discord.sendPost(tweets[id]));
            }
            Promise.all(promises).then(() => {
                logger.info(`Polling again in ${timeConverter.convertMilliseconds(delay)}`);
                setTimeout(() => checkTweets(delay), delay)
            });
        }
    )
}
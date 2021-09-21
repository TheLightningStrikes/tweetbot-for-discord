// All settings are MANDATORY

const config = {};

config.twitter = {};
config.bot_settings = {};
config.discord = {};

config.twitter.user_id = process.env.TWITTER_USER_ID || 'TWITTER_ID'; // get this by using the Twitter API with cURL or Postman
config.twitter.username = process.env.TWITTER_USERNAME || 'TWITTER_USERNAME';
config.twitter.api_root = process.env.TWITTER_API_ROOT || 'api.twitter.com';
config.twitter.auth_method = process.env.TWITTER_AUTH_METHOD || 'Bearer';
config.twitter.bearer_token = process.env.TWITTER_BEARER_TOKEN
    || 'TWITTER_BEARER_TOKEN';

// this is the part of the url that comes AFTER twitter.com
config.twitter.query = process.env.TWITTER_QUERY
    || `/users/${config.twitter.user_id}/tweets?tweet.fields=referenced_tweets&max_results=20&start_time=`

config.bot_settings.timer_delay = process.env.TIMER_DELAY || 5 * 60000; // 5 minutes, delay is in milliseconds
config.bot_settings.loggingLevel = process.env.LOGGING_LEVEL || 4;
config.bot_settings.logfile = process.env.LOGFILE || true;
config.bot_settings.logfileName = process.env.LOGFILE_NAME || `verbose`;

config.discord.api_root = process.env.DISCORD_API_ROOT || 'discord.com';

// this is the part of the url that comes AFTER discord.com
config.discord.webhook_url = process.env.DISCORD_WEBHOOK_URL
    || 'WEBHOOK_URL';
config.discord.bot_name = process.env.DISCORD_BOT_NAME || 'DISCORD_BOT_NAME';

module.exports = config;
const config = require("../config/"+(process.env.CONFIG_FILE || "config"));
const fs = require('fs');
const {resolve} = require("path");

const datetime = new Date(Date.now());
const date = datetime.toLocaleDateString().replace(/\//g,'-');
const time = `${datetime.getHours()}h${datetime.getMinutes()}m${datetime.getSeconds()}s`;

const logFilePath = './log';
const logFileName = `${config.bot_settings.logfileName} [${date}][${time}].txt`;
const path = resolve(`${logFilePath}`);
const filepath = `${path}/${logFileName}`;
const options = {encoding: "utf8", flag: "w"};
let stream;
let logFile = false;

const logLevel = {
   "error": 0,
   "warn": 1,
   "info": 2,
   "debug": 3,
   "silly": 4
}

/*
 * Create a directory and a writing stream to write logfiles
 */
function initLogfile() {
   info(`Creating logging directory at "${path}"`);
   if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
   }
   logFile = true;
   stream = fs.createWriteStream(filepath, options);
}

/*
 * Writes data to a logfile
 */
function logToFile(data) {
   stream.write(data+ "\n");
}

/*
 * Sets the level to ERROR and logs if the required loglevel is met
 * @param message {string} The log message
 * @param data {Object} Optional data to log
 * @see /config/example.js
 */
function error(message, data) {
   if (config.bot_settings.loggingLevel >= logLevel.error) {
      const level = 'ERROR';
      log(level, message, data);
   }
}

/*
 * Sets the level to WARN and logs if the required loglevel is met
 * @param message {string} The log message
 * @param data {Object} Optional data to log
 * @see /config/example.js
 */
function warn(message, data) {
   if (config.bot_settings.loggingLevel >= logLevel.warn) {
      const level = 'WARN';
      log(level, message, data);
   }
}

/*
 * Sets the level to INFO and logs if the required loglevel is met
 * @param message {string} The log message
 * @param data {Object} Optional data to log
 * @see /config/example.js
 */
function info(message, data) {
   if (config.bot_settings.loggingLevel >= logLevel.info) {
      const level = 'INFO';
      log(level, message, data);
   }
}

/*
 * Sets the level to DEBUG and logs if the required loglevel is met
 * @param message {string} The log message
 * @param data {Object} Optional data to log
 * @see /config/example.js
 */
function debug(message, data) {
   if (config.bot_settings.loggingLevel >= logLevel.debug) {
      const level = 'DBUG';
      log(level, message, data);
   }
}

/*
 * Sets the level to SILLY and logs if the required loglevel is met
 * @param message {string} The log message
 * @param data {Object} Optional data to log
 * @see /config/example.js
 */
function silly(message, data) {
   if (config.bot_settings.loggingLevel >= logLevel.silly) {
      const level = 'SILL';
      log(level, message, data);
   }
}

/*
 * Logs a statement to the console
 *
 * If logfile is set to true in config-apache.js, also logs to a logfile
 * @param level {string} The loglevel
 * @param message {string} The log message
 * @param data {Object} Optional data to log
 * @see /config/example.js
 */
function log(level, message, data) {
   const datetime = new Date(Date.now());
   const time = `${datetime.toLocaleTimeString()}.${datetime.getMilliseconds()}`;
   const date = datetime.toLocaleDateString();
   const text = `[${date}] [${time}] [${level}]`;
   console.log(`${text} - ${message}`);

   if (data) {
      console.log(data);
   }

   if (logFile) {
      logToFile(`${text} - ${message}`);
      if (data) {
         data = JSON.stringify(data);
         logToFile(`${text} - ${data}`);
      }
   }
}

exports.error = error;
exports.warn = warn;
exports.info = info;
exports.debug = debug;
exports.silly = silly;
exports.initLogFile = initLogfile;

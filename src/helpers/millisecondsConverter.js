/*
 * Convert milliseconds to a readable unit
 * @param ms {number} The milliseconds to convert
 * @return {string}
 */
function millisecondsToString(ms) {
    if (ms < 1000) {
        return `${ms} milliseconds`;
    }
    else if (ms > 1000 && ms < 60000) {
        return `${ms/1000} seconds`;
    }
    else if (ms > 60000 && ms < 3600000) {
        return `${ms/60000} minutes`;
    }
    else if (ms > 3600000 && ms < 86400000) {
        return `${ms/3600000} hours`;
    }
    else {
        return `${ms/86400000} days`;
    }
}

exports.convertMilliseconds = millisecondsToString;
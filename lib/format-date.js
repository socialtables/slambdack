var format = require("util").format;

/**
 * @param {Date} date
 * @return {String} Date formatted like: "01 Jan 1969 at 12:00:00 GMT"
 */
module.exports = function formatDate (date) {
	var UTCString = date.toUTCString();
	var matches = UTCString.match(/^[^\d]+(\d+ [A-Za-z]+ \d+) (.+)$/);
	var UTCDate = matches[1];
	var UTCTime = matches[2];
	var result = format("%s at %s", UTCDate, UTCTime);
	return result;
};

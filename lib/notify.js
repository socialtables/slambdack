var https = require("https");
var querystring = require("querystring");
var urlParse = require("url").parse;
var log = require("./log");

var requestParams = {
	hostname: "hooks.slack.com",
	port: 443,
	path: undefined,
	method: "POST",
	headers: {
		"Content-Type": "application/x-www-form-urlencoded",
		"Content-Length": undefined
	}
};

/**
 * @param {Object} params
 * @return {String} JSON formatted and urlencoded query parameter for `payload`
 */
function formatPayload (params) {
	var payloadString = JSON.stringify(params);
	var postData = querystring.stringify({
		"payload": payloadString
	});
	log("[POSTDATA]: %s", postData);
	return postData;
}

/**
 * @param {Object} conf Configuration hash
 * @param {String} conf.webhookUri
 * @property {String} webhookUri Your Slack WebHook API
 * @return {Function} sender
 */
module.exports = function (conf) {
	conf || (conf = {});
	var webhookUri = conf.webhookUri || conf.webhookUrl;
	if (!webhookUri) {
		throw new Error("Missing parameter: webhookUri");
	}

	/**
	 * All of the following should work:
	 * - full url - https://hooks.slack.com/services/<token>
	 * - full path - /services/<token>
	 * - path with missing leading slash - services/<token>
	 * - bare token - <token>
	 */
	requestParams.path = urlParse(webhookUri).path.replace(/^(?:.*?services\/)?/i, "/services/");

	/**
	 * Sender
	 *
	 * @param {Object} payload See:
	 *                         - https://api.slack.com/docs/formatting
	 *                         - https://api.slack.com/docs/attachments
	 * @param {Function} callback
	 */
	return function sender (payload, callback) {
		var postData = formatPayload(payload);
		requestParams.headers["Content-Length"] = postData.length;

		var req = https.request(requestParams, function(res) {
			log("[SLACK RESPONSE CODE]: %s", res.statusCode);
			res.setEncoding("utf8");
			var body = "";
			res.on("data", function (chunk) {
				log("[SLACK RESPONSE BODY]: %s", chunk);
				body += chunk;
			});
			res.on("end", function () {
				callback(null, body);
			});
		});
		req.on("error", function (err) {
			callback(err);
		});
		req.write(postData);
		req.end();
	};
};

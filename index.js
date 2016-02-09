module.exports = function (conf) {
	return {
		notify: require("./lib/notify")(conf),
		formatDate: require("./lib/format-date"),
		log: require("./lib/log")
	};
};

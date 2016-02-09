var noop = function () {};

// By default, we log stuff to stdout.
//
// This is useful on AWS Lambda because it's the only way to get logs into
// your Cloudwatch logs.
//
// Set `process.env.SLAMBDACK_SILENT` to something truthy to disable this output.
module.exports = process.env.SLAMBDACK_SILENT ?
	noop :
	console.log.bind(console);

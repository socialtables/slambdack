# slambdack

Slack Helpers for AWS Lambda

# Usage

```js
// You need to provide the URL for your Webhook endpoint (or just the token)
var webhookUri = "https://hooks.slack.com/services/<some long token>";
var slack = require("slambdack")({
	webhookUri: webhookUri
});
// See:
//   - https://api.slack.com/docs/formatting
//   - https://api.slack.com/docs/attachments
var message = {
	username: "slambdack", // optional: overrides the default webhook username
	channel: "#my-channel", // optional: overrides the default webhook channel
	text: "*Hi, there, _friend_!*",
	attachments: [
		{
			fallback: "Hi, there",
			text: "*Hi, there!*",
			mrkdwn_in: [ "text", "fields" ],
			fields: [
				{
					title: "Message",
					value: "*Hi, there, _friend_!*"
				},
				{
					title: "Post time",
					value: slack.formatDate(new Date()), // formatted like: "01 Jan 1969 at 12:00:00 GMT"
					short: true // short-width fields allow you to stack fields side-by-side
				}
			]
		}
	]
};
slack.notify(message, function (err, response) {
	// maybe do something
});
```

## Methods

### `notify(message<Object>, cb<Function>)`

Posts the `message` to Slack.

### `formatDate(date<Date>)`

Returns `date` formatted like: "01 Jan 1969 at 12:00:00 GMT".

### `log()`

By default, we log stuff to `stdout`. This exposes that log function.

This is useful on AWS Lambda because it's the only way to get logs into your
Cloudwatch logs. Set `process.env.SLAMBDACK_SILENT` to something truthy to
disable this output.

- - -

Copyright (C) 2016 Social Tables, Inc. (https://www.socialtables.com) All rights reserved.

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

	http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

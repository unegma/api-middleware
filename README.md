THIS PACKAGE IS DEPRECIATED AND WILL BE REPLACED WITH @unegma/logger

# Error Handler Utility

* Console log version (basic logging)
* Slack Version (posts errors to Slack based on desired timestamp formate)

## Usage

`npm install @unegma/error-handler --save`

```
const {
  SLACK_ERROR_LOG
} = process.env;
const { SlackErrorHandler } = require('@unegma/error-handler');
const slackErrorHandler = new SlackErrorHandler(SLACK_ERROR_LOG);

...

try {
  throw new Error();

} catch(error) {
  await slackErrorHandler.handleError('myFunction', `myModule failed.`, error);
}
```

Regular Logging (not async):

```
const {
  SLACK_ERROR_LOG
} = process.env;
const { ErrorHandler } = require('@unegma/error-handler');
const errorHandler = new ErrorHandler();

...

try {
  throw new Error();

} catch(error) {
  errorHandler.handleError('myFunction', `myModule failed.`, error);
}
```

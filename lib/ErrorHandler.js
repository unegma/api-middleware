const moment = require('moment');
const ERROR_FORMAT = '### *YYYY-MM-DD/ddd* *HH:mm:ss*';
const ErrorWithErrorHandlerError = require('./errors/ErrorWithErrorHandlerError');

/**
 * Error Handler
 */
class ErrorHandler {

  /**
   * Constructor
   *
   * @param format
   */
  constructor(format = ERROR_FORMAT) {
    this.format = format;
    this._errorString = '';
  }

  /**
   * Handle Error with just Console logging
   *
   * @param identifier
   * @param details
   * @param error
   */
  handleError(identifier, details = "", error) {
    console.log(`## Beginning handleError`);
    try {
      let errorMessage = 'See Log for details';
      let stack = ''; let errorName = '';

      if (typeof error === 'string') {
        errorMessage = error;
      } else if (typeof error !== 'undefined' && typeof error.message === 'string') {
        errorMessage = error.message;
        if (error.stack) stack = error.stack;
        if (error.name) errorName = error.name;
      }

      this._errorString = `${moment(Date.now()).format(this.format)}\nERROR handling ${identifier}: ${details}.\n${errorMessage} ${errorName}:\n${stack}`;
      console.log(this._errorString);

    } catch(error) {
      console.log("ERROR WITH ERROR HANDLER");
      throw new ErrorWithErrorHandlerError(error.message);
    }
  }

  // used for testing
  throwError() {
    throw new ErrorWithErrorHandlerError();
  }

}

module.exports = ErrorHandler;

require('dotenv').config({ path: '.env' });
const {
  SLACK_ERROR_LOG,
} = process.env;
const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const nock = require('nock')
const ErrorHandler = require('../lib/ErrorHandler');
const SlackErrorHandler = require('../lib/SlackErrorHandler');
const ErrorWithErrorHandlerError = require('../lib/errors/ErrorWithErrorHandlerError');

describe('Errors Test', () => {
  beforeEach(function() {
    sinon.spy(console, 'log');
  });

  afterEach(function() {
    console.log.restore();
  });

  it('should create an instance of an ErrorWithErrorHandlerError', () => {
    const error = new ErrorWithErrorHandlerError('Error Happened');
    expect(error.message).to.equal('Error Happened');
  });

  it('should create an instance of an ErrorHandler', () => {
    const errorHandler = new ErrorHandler();
    expect(errorHandler).to.be.instanceOf(ErrorHandler);
    expect(() => {
      errorHandler.throwError('Message')
    }).to.throw(ErrorWithErrorHandlerError);
  });

  it('should create an instance of a SlackErrorHandler', () => {
    const slackErrorHandler = new SlackErrorHandler(SLACK_ERROR_LOG);
    expect(slackErrorHandler).to.be.instanceOf(SlackErrorHandler);
    expect(() => {
      slackErrorHandler.throwError()
    }).to.throw(ErrorWithErrorHandlerError);
  });

  it('should handle an Error', () => {
    const errorHandler = new ErrorHandler();
    errorHandler.handleError('testError', 'This is a test', 'Test Error');
    expect(console.log).to.have.been.calledTwice;
  });

  it('should handle an Error and Post to Slack', async () => {
    nock(SLACK_ERROR_LOG)
      .post(uri => uri.includes('services'))
      .reply(200, "ok");

    const slackErrorHandler = new SlackErrorHandler(SLACK_ERROR_LOG); // 'YYYY-MM-DD-dddd'
    const response = await slackErrorHandler.handleError('testError', 'This is a test', 'Test Error');
    expect(console.log).to.have.callCount(3);
    expect(response).to.equal('ok');
  });

});

//This is a custom logger that is mostly being used to illustrate that we could plug in
//an actual logging service if we had one

const CustomLogger = class CustomLogger {
  constructor() {
    this.logs = [];
  }

  log(logLevel, method, logMessage, payload) {
    const timestamp = new Date().toISOString();
    const logLine = `[${timestamp}] ${logLevel} - ${method}: ${logMessage} ${JSON.stringify(
      payload
    )}`;
    this.logs.push({ timestamp, logLevel, method, logMessage, payload });
    console.log(logLine);
  }

  //These methods could technically be refactored into a single method, since they do basically the same thing,
  //But most logging services i work with differentiate between errors and info, and these are just stubs anyway
  error(method, logMessage, payload) {
    const timestamp = new Date().toISOString();
    const logLevel = 'error';
    const errorMessage = `[${timestamp}] error - ${method}: ${logMessage} ${JSON.stringify(
      payload
    )}`;
    this.logs.push({ timestamp, logLevel, method, logMessage, payload });
    console.error(errorMessage);
  }

  getLogs() {
    return this.logs;
  }

  clearLogs() {
    this.logs = [];
  }
};

//singleton pattern here with the logger

module.exports = new CustomLogger();

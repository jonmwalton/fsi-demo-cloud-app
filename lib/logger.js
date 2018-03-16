var winston = require('winston');

// Extend a winston by making it expand errors when passed in as the
// second argument (the first argument is the log level).
function expandErrors(logger) {
  var oldLogFunc = logger.log;
  logger.log = function () {
    var args = Array.prototype.slice.call(arguments, 0);

    if (args[0] === 'error') {
      // Emit the error as is, it will contain the stack
      // We need the type in order to act as the code
      // logger.emit('errorLogged', args);
      logger.info(args[1]);
    }

    if (args.length >= 2 && args[1] instanceof Error) {
      // Change the error object into hte stack trace
      if (args[1].parentError) {
        // recursively throw the parent error
        // logger.error(args[1].parentError);
      }
      args[1] = args[1].stack;
    }

    return oldLogFunc.apply(this, args);
  };
  return logger;
}

winston.addColors({
  error: 'red',
  warn: 'yellow',
  info: 'green',
  verbose: 'cyan',
  debug: 'blue',
  silly: 'grey'
});

var transportOptions = {
  'timestamp': true,
  'level': process.env.LOG_LEVEL || 'silly'
}

// Only colourise if working locally
if (process.env['FH_USE_LOCAL_DB']) {
  transportOptions['colorize'] = true;
}

var logger = expandErrors(new(winston.Logger)({
  transports: [
    new(winston.transports.Console)(transportOptions),
  ]
}));

// When an error happens, re log it at info level.
// We do this as FH writes errors to console.error
// and everything else to console.log
// this way we can read everything in line in console.log

// TODO: add this back
// logger.on('errorLogged', function () {
//   var args = Array.prototype.slice.call(arguments, 0);
//   args[0] = 'info';
//   if (args.length >= 2 && args[1] instanceof Error) {
//     args[1] = args[1].stack;
//   }
//   logger.log.apply(this, args);
// })

module.exports = logger;

// Either of these will give a stack trace:
// logger.error(new Error('bad error1'));
// logger.error('Error bla %s', new Error('bad error').stack);

// Log Levels available:

// {
//   error: 0,
//   warn: 1,
//   info: 2,
//   verbose: 3,
//   debug: 4,
//   silly: 5
// }

// Used in this project
// error     : unhandled errors, i.e. things that should never happen !! app crashes, fatal error - app does not crash but maybe data is corrupt etc !!!
// warn      : something that should not happen, but is controlled - does not cause the app to crash, unexpected event - db record not found !!!
// info      : standard data
// debug     : verbose logs console.dir etc

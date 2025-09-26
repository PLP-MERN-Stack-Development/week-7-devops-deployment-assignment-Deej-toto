const winston = require('winston');
const logger = winston.createLogger({ transports: [new winston.transports.Console()] });

function errorHandler(err, req, res, next) {
  logger.error(err && (err.stack || err.message || err));
  res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
}

module.exports = errorHandler;

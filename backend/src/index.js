require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');
const winston = require('winston');

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  transports: [new winston.transports.Console()],
});

mongoose.connect(MONGO_URI, { 
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
})
  .then(() => {
    logger.info('Connected to MongoDB');
    app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
  })
  .catch(err => {
    logger.error('Mongo connection error', err);
    process.exit(1);
  });

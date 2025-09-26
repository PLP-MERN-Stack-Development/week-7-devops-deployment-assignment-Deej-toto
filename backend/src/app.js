const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const bugRoutes = require('./routes/bugRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('combined'));

// rate limiting
const limiter = rateLimit({ windowMs: 60*1000, max: 100 });
app.use(limiter);

app.get('/health', (req, res) => res.json({ status: 'ok', time: new Date() }));

app.use('/api/bugs', bugRoutes);

app.use(errorHandler);

module.exports = app;

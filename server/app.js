// Load environment variables from .env file
require('dotenv').config();

// Node.js core modules
const path = require('path');

// Third-party modules
const express = require('express');
const compression = require('compression');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const expressHandlebars = require('express-handlebars');
const helmet = require('helmet');
const session = require('express-session');
const RedisStore = require('connect-redis').default;
const redis = require('redis');

// Local imports
const router = require('./router.js');

// Server configuration
const port = process.env.PORT || process.env.NODE_PORT || 3000;
const dbURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1/forum';

// Connect to MongoDB
mongoose.connect(dbURI).catch((err) => {
  console.log('Could not connect to database');
  throw err;
});

// Create and configure Redis client
const redisClient = redis.createClient({
  url: process.env.REDISCLOUD_URL,
});

// Handle Redis connection errors
redisClient.on('error', (err) => console.log('Redis Error ', err));

// Connect to Redis and start the Express application
redisClient.connect().then(() => {
  const app = express();

  // Security middleware
  app.use(helmet());

  // Serve static files from the "hosted" directory
  app.use('/assets', express.static(path.resolve(`${__dirname}/../hosted`)));

  // Serve favicon
  app.use(favicon(`${__dirname}/../hosted/img/favicon.png`));

  // Compression middleware
  app.use(compression());

  // Body parser middleware
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  // Session management using Redis
  app.use(session({
    key: 'sessionid',
    store: new RedisStore({ client: redisClient }),
    secret: 'Very Good Website',
    resave: false,
    saveUninitialized: false,
  }));

  // Handlebars view engine setup
  app.engine('handlebars', expressHandlebars.engine({ defaultLayout: '' }));
  app.set('view engine', 'handlebars');
  app.set('views', `${__dirname}/../views`);

  // Initialize routes
  router(app);

  // Start listening for requests
  app.listen(port, (err) => {
    if (err) { throw err; }
    console.log(`Listening on PORT ${port}`);
  });
});

const winston = require('winston');
const fse = require('fs-extra');
const path = require('path');
const bodyParser = require('body-parser');

if (fse.existsSync('interview_app.log')) {
  fse.unlinkSync('interview_app.log');
}
const logger = new winston.createLogger({
  level: 'debug',
  transports: [
    new (winston.transports.File)({ filename: 'interview_app.log', timestamp: false, json: false }),
  ],
});

const express = require('express');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const userModel = require('./model/user.model')(mongoose, logger);
const users = require('./routes/users')(userModel, express, logger);
const app = express();

// mongoose.connect('mongodb://localhost:27017/userapp', {useNewUrlParser: true});
mongoose.connect('mongodb://localhost/interview_app', {useNewUrlParser: true});
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../../public', 'index.html')));

app.use('/api/users', users);

const server = app.listen(8080);

process.on('SIGINT', () => {
  logger.error('closing server');
  process.exit();
  server.close();
});

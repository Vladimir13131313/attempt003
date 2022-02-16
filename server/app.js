const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const keys = require('./config/keys');
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./routes/index');

const app = express();

mongoose.connect(keys.mongoURI)
    .then(() => {console.log("mongo DB has been connected")})
    .catch(err => console.log(err));


app.use(require('morgan')('dev'));
app.use(passport.initialize());
require('./middleware/passport')(passport);
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
app.use(express.json());
app.use(cors());

app.use('/api', router);

module.exports = app;
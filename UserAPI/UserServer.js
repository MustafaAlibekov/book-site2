const express = require('express')
const app = express()
require('dotenv').config(); 
const db = require('./db')
const UserRoute = require('./routes/userrouter')
const BookRoute = require('./routes/bookrouter')
const bodyParser = require('body-parser');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

app.use(bodyParser.json());


//обработчик json файлов
app.use(express.json());

app.use('/userapi', UserRoute)
app.use('/bookapi', BookRoute);

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'your_jwt_secret'
};

passport.use(new JwtStrategy(jwtOptions, (jwtPayload, done) => {
  const user = getUser(jwtPayload.username);

  if (user) {
    done(null, user);
  } else {
    done(null, false);
  }
}));

app.use(passport.initialize());


db.sync()
  .then(() => {
    console.log('Database & tables created!');
    app.listen(process.env.USERAPIPORT, ()=>
    {
        console.log("Сервер работает на порту:" + process.env.USERAPIPORT)
    })
  })
  .catch((err) => {
    console.error('Unable to create database & tables:', err);
  });

app.get('/', (req, res)=>{
    res.send("Hello world")
})




const express = require('express')
const app = express()
require('dotenv').config(); 
const db = require('./db')
const UserRoute = require('./routes/userrouter')
const BookRoute = require('./routes/bookrouter')
//обработчик json файлов
app.use(express.json());

app.use('/userapi', UserRoute)
app.use('/bookapi', BookRoute);


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




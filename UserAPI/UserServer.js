const express = require('express')
const app = express()
const PORT = 4000
const db = require('./db')
const UserRoute = require('./routes/userrouter')
//обработчик json файлов
app.use(express.json());

app.use('/userapi', UserRoute)



db.sync()
  .then(() => {
    console.log('Database & tables created!');
    app.listen(PORT, ()=>
    {
        console.log("Сервер работает на порту:" + PORT)
    })
  })
  .catch((err) => {
    console.error('Unable to create database & tables:', err);
  });

app.get('/', (req, res)=>{
    res.send("Hello world")
})




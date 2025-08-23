const { Sequelize} = require('sequelize');
//Данные бд
const sequelize = new Sequelize( process.env.DB_NAME, 
  process.env.DB_USER, 
  process.env.DB_PASSWORD, 
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres'
  });


sequelize.authenticate()
  .then(() => {
    console.log('Подключение к БД успешно.');
  })
  .catch(err => {
    console.error('Ошибка подключения:', err);
  });

  module.exports  = sequelize;

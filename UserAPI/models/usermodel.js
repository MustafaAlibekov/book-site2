const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config(); 

const db = require('../db')

const User = db.define('users', 
    {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
        len: [0, 100] // Ограничение от 0 до 100 символов
    }
    }
    })

const Review = db.define('userreview', 
    {
    review_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    reviev_title: {
        type: Sequelize.STRING,
        allowNull: false,
        len: [0, 30]
    },
    reviev_description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    mark: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
    })

User.hasMany(Review, { foreignKey: 'userId' });
Review.belongsTo(User, { foreignKey: 'userId' });


const Book = db.define('Book', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  book_url: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isUrl: true //URL validation
    }
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isUrl: true
    }
  }
});

    module.exports = {
  User,
  Review,
  Book
};
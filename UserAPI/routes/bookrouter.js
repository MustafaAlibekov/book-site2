const express = require('express');
const BookRoute = express.Router();
const controller = require('../controllers/bookcontroller');

// Book Routes
BookRoute.get('/getbooks', controller.getAllBooks);
BookRoute.post('/createbook', controller.createBook);
BookRoute.put('/updatebook/:id', controller.updateBook);
BookRoute.delete('/deletebook/:id', controller.deleteBook);

module.exports = BookRoute;
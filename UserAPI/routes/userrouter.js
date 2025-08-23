const express = require('express')
UserRoute = express.Router()
const controller = require('../controllers/usercontroller')

//User Routes
UserRoute.get('/getusers',controller.getAllUsers)
//UserRoute.post('createuser')
//UserRoute.patch('updateuser/:id')
//UserRoute.put('updateuser/:id')
//UserRoute.delete('deleteuser/:id')


module.exports = UserRoute
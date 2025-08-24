const express = require('express')
UserRoute = express.Router()
const controller = require('../controllers/usercontroller')

//User Routes
UserRoute.get('/getusers',controller.getAllUsers)
UserRoute.post('/createuser', controller.createUser)
//UserRoute.patch('/updateuser/:id')
UserRoute.put('/updateuser/:id', controller.updateUser)
UserRoute.delete('/deleteuser/:id', controller.deleteUser)


module.exports = UserRoute
const express = require('express')
const User = require('../models/usermodel')
exports.getAllUsers = async (req, res)=>
    {
        try
        {
            const users = await User.findAll();
            res.status(200).json(users);
        }
        catch(e)
        {
            console.error(e);
            res.status(500).json(e);
        }
    }
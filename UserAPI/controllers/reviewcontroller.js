const express = require('express')
const User = require('../models/usermodel')
require('dotenv').config();

exports.getAllUsers = async (req, res)=>
    {
        const bookId = req.params.id;
        try
        {
            const reviews = await User.findAll({
                where:
                {
                    bookId:bookId
                }
            });
            res.status(200).json(reviews);
        }
        catch(e)
        {
            console.error(e);
            res.status(500).json(e);
        }
    }
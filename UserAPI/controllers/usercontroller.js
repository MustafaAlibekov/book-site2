const express = require('express')
const bcrypt = require('bcrypt');
const User = require('../models/usermodel')
require('dotenv').config();
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


exports.createUser = async (req, res)=>
    {
        const { username, password } = req.body;
        try
        {
            const hashedpassword = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUNDS, 10));
            
            const NewUser = await User.create(
                {
                    name: username,
                    password: hashedpassword
                }
            );
            console.log("OK")
            res.status(201).json(NewUser);
        }
        catch(e)
        {
            console.error('Ошибка при создании пользователя:', e);
            res.status(500).json(e);
        }
    }

exports.deleteUser = async (req, res) =>
    {
        const userId = req.params.id;
        
        try
        {

            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(404).json({ message: 'Пользователь не найден.' });
            }

            await user.destroy();
            res.status(204).json({});
            console.log(`Пользователь с ID ${userId} удалён.`);
        }
        catch(e)
        {
            console.error('Ошибка при удалении пользователя:',e);
            res.status(500).json(e);
        }
    }


    exports.updateUser = async (req, res)=>
    {
        const { username, password } = req.body;
        const userId = req.params.id;
        try
        {
             // Простая проверка: если пароль не существует, возвращаем ошибку
        if (!password) {
            return res.status(400).json({ message: 'Пароль обязателен для обновления.' });
        }

            const hashedpassword = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUNDS, 10));
            
            const [updatedRows] = await User.update(
                {
                        name: username,
                        password: hashedpassword
                    },
                    {
                        where: {
                            id: userId
                    }
                });

                if(updatedRows>0)
                    {
                        const updatedUser = await User.findByPk(userId, { attributes: { exclude: ['password'] } });
                        return res.status(200).json(updatedUser);
                    }
                    else
                    {
                            console.log(res.message)
                            return res.status(400).json({ message: 'Не удалось обновить пользователя.' });
                    }
        }
        catch(e)
        {
            console.error('Ошибка при обновлении пользователя:', e);
            res.status(500).json(e);
        }
    }
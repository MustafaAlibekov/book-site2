const bcrypt = require('bcrypt');
const {User} = require('../models/usermodel');
require('dotenv').config();

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
};

exports.createUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(
            password,
            parseInt(process.env.BCRYPT_SALT_ROUNDS, 10)
        );

        const newUser = await User.create({
            name: username,
            password: hashedPassword,
        });

        console.log('OK');
        res.status(201).json(newUser);
    } catch (e) {
        console.error('Ошибка при создании пользователя:', e);
        res.status(500).json(e);
    }
};

exports.deleteUser = async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден.' });
        }

        await user.destroy();
        res.status(204).json({});
        console.log(`Пользователь с ID ${userId} удалён.`);
    } catch (e) {
        console.error('Ошибка при удалении пользователя:', e);
        res.status(500).json(e);
    }
};

exports.updateUser = async (req, res) => {
    const { username, password } = req.body;
    const userId = req.params.id;

    try {
        //если пароль не существует, возвращаем ошибку
        if (!password) {
            return res.status(400).json({ message: 'Пароль обязателен для обновления.' });
        }

        const hashedPassword = await bcrypt.hash(
            password,
            parseInt(process.env.BCRYPT_SALT_ROUNDS, 10)
        );

        const [updatedRows] = await User.update(
            {
                name: username,
                password: hashedPassword,
            },
            {
                where: {
                    id: userId,
                },
            }
        );

        if (updatedRows > 0) {
            const updatedUser = await User.findByPk(userId, {
                attributes: { exclude: ['password'] },
            });
            return res.status(200).json(updatedUser);
        } else {
            console.log(res.message);
            return res.status(400).json({ message: 'Не удалось обновить пользователя.' });
        }
    } catch (e) {
        console.error('Ошибка при обновлении пользователя:', e);
        res.status(500).json(e);
    }
};
//авторизация
exports.login = async (req, res) => {
    const { username, password } = req.body;
    const user = getUser(username);

    if (!user || !bcrypt.compareSync(password, user.password)) {
        res.status(401).json({ success: false, message: 'Invalid username or password' });
        return;
    }

    const token = jwt.sign({ username: user.username }, jwtOptions.secretOrKey);
    res.json({ success: true, token });
};

app.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({ success: true, message: 'Welcome to the protected route!' });
});
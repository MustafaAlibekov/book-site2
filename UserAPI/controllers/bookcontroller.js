const {Book} = require('../models/usermodel');

// GET all books
exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.findAll();
        res.status(200).json(books);
    } catch (e) {
        console.error('Ошибка при получении книг:', e);
        res.status(500).json({ message: 'Внутренняя ошибка сервера.', error: e.message });
    }
};

// POST a new book
exports.createBook = async (req, res) => {
    const { title, author, book_url, image_url } = req.body;
    try {
        if (!title || !author || !book_url) {
            return res.status(400).json({ message: 'Поля title, author и book_url обязательны.' });
        }

        const newBook = await Book.create({
            title,
            author,
            book_url,
            image_url
        });
        
        res.status(201).json(newBook);
    } catch (e) {
        console.error('Ошибка при создании книги:', e);
        res.status(500).json({ message: 'Внутренняя ошибка сервера.', error: e.message });
    }
};

// PUT to update a book by ID
exports.updateBook = async (req, res) => {
    const { title, author, book_url, image_url } = req.body;
    const bookId = req.params.id;

    try {
        const updateData = {};
        if (title) updateData.title = title;
        if (author) updateData.author = author;
        if (book_url) updateData.book_url = book_url;
        if (image_url) updateData.image_url = image_url;

        // Check if any data was provided
        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({ message: 'Нет данных для обновления.' });
        }
        
        const [updatedRows] = await Book.update(updateData, {
            where: { id: bookId }
        });

        if (updatedRows > 0) {
            const updatedBook = await Book.findByPk(bookId);
            return res.status(200).json(updatedBook);
        } else {
            return res.status(404).json({ message: 'Книга не найдена или нет изменений.' });
        }
    } catch (e) {
        console.error('Ошибка при обновлении книги:', e);
        res.status(500).json({ message: 'Внутренняя ошибка сервера.', error: e.message });
    }
};

// DELETE a book by ID
exports.deleteBook = async (req, res) => {
    const bookId = req.params.id;

    try {
        const bookToDelete = await Book.findByPk(bookId);
        if (!bookToDelete) {
            return res.status(404).json({ message: 'Книга не найдена.' });
        }

        await bookToDelete.destroy();
        res.status(204).send(); // No Content
        console.log(`Книга с ID ${bookId} удалена.`);
    } catch (e) {
        console.error('Ошибка при удалении книги:', e);
        res.status(500).json({ message: 'Внутренняя ошибка сервера.', error: e.message });
    }
};
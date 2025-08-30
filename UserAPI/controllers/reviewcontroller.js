const { Review } = require('../models/usermodel');
require('dotenv').config();

exports.ReviewByBook = async (req, res) => {
    const bookId = req.params.id;
    try {
        const reviews = await Review.findAll({
            where: {
                bookId: bookId,
            },
        });

        if (reviews.length === 0) {
            return res.status(404).json({ message: 'Отзывов по этой книге еще нет' });
        }

        res.status(200).json(reviews);
    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
};


exports.deletereview = async (req, res) => {
    try {
        const reviewId = req.params.id;
        const reviewToDelete = await Review.findByPk(reviewId);

        if (!reviewToDelete) {
            return res.status(404).json({ message: 'Отзыв не найден' });
        }

        await reviewToDelete.destroy();
        return res.status(204).end();
    } catch (e) {
        console.error(e);
        res.status(500).json(e);
    }
};


exports.createReview = async (req, res) => {
    const { review_id, userid, review_title, review_description, mark } = req.body;
    try {
        const reviewcreate = await Review.create({
            review_id: review_id,
            review_title: review_title,
            review_description: review_description,
            mark: mark,
            userid: userid,
        });

        res.status(201).json(reviewcreate);
    } catch (e) {
        console.error('Ошибка при создании отзыва:', e);
        res.status(500).json(e);
    }
};
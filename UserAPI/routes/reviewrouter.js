const router = require('express').Router();
const {
    ReviewByBook,
    deletereview,
    createReview,
} = require('../controllers/review.controller');

router.get('/reviews/:id', ReviewByBook);
router.post('/reviews', createReview);
router.delete('/reviews/:id', deletereview);

module.exports = router;
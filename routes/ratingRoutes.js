    const express = require('express');
    const router = express.Router({ mergeParams: true });
    const ratingController = require('../controllers/ratingController');
    const auth = require('../middleware/auth');

    router.post('/submit', auth(), ratingController.submitRating);

    module.exports = router;

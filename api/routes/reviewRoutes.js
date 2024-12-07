const express = require('express');
const router = express.Router();
const { postReview } = require('../controllers/reviewController');

router.post('/postreview', postReview);

module.exports = router;

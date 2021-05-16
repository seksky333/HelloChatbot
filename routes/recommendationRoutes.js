const express = require('express');

const recommendationController = require('../controllers/RecommendationController');

const router = express.Router();

router.route('/hello').get(recommendationController.getHello);
router.route('/sentiment').get(recommendationController.getSentimentAnalysis);

module.exports = router;

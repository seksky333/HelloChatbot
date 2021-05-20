const express = require('express');

const recommendationController = require('../controllers/RecommendationController');

const router = express.Router();

router.route('/hello').get(recommendationController.getHello);
router.route('/sentiment').get(recommendationController.getSentimentAnalysis);
router.route('/place').get(recommendationController.getPlaces);
router.route('/classification').get(recommendationController.getClassification);

module.exports = router;

const express = require('express');

const recommendationController = require('../controllers/recommendationController');

const router = express.Router();

router.route('/hello').get(recommendationController.getHello);
router.route('/sentiment').get(recommendationController.getSentimentAnalysis);
router
  .route('/nounChunks')
  .get(recommendationController.getNounChuncksExtraction);
router.route('/place').get(recommendationController.getPlaces);
router.route('/classification').get(recommendationController.getClassification);
router.route('/recommendation').get(recommendationController.getRecommendation);

module.exports = router;

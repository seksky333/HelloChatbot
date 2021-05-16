const express = require('express');

const helloController = require('../controllers/helloController');

const router = express.Router();

router.route('/').get(helloController.getHello);

module.exports = router;

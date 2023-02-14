const express = require('express');
const itemsController = require('../controllers/itemsController');
const router = express.Router();

router.route('/').get(itemsController.getAllItems);

module.exports = router;

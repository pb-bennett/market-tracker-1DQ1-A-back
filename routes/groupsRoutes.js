const express = require('express');
const groupsController = require('../controllers/groupsController');
const router = express.Router();

router.route('/').get(groupsController.getAllGroups);

module.exports = router;

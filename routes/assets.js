const express = require('express');
const router = express.Router();
const assetController = require('../controllers/assetController');

router.get('/:filename', assetController.getAsset);

module.exports = router;
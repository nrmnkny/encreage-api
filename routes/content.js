const express = require('express');
const router = express.Router();
const contentController = require('../controllers/contentController');

// Get all content blocks
router.get('/', contentController.getAllContent);

// Get content by ID
router.get('/:id', contentController.getContentById);

// Add new content block
router.post('/', contentController.createContent);

// Update content block
router.put('/:id', contentController.updateContent);

// Delete content block
router.delete('/:id', contentController.deleteContent);

module.exports = router;

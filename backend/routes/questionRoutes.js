// Imports
const express = require('express');
const router = express.Router();

// Access controller
const{
    getQuestions,
    setQuestions,
} = require('../controllers/questionsController');

router.get('/', getQuestions);
router.post('/', setQuestions);

// Export router
module.exports = router;

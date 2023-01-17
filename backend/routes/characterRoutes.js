// Imports
const express = require('express');
const router = express.Router()

// Access controller
const{
    getCharacters,
    setCharacters,
} = require('../controllers/charactersController');

router.get('/', getCharacters);
router.post('/', setCharacters);

// Export router
module.exports = router;

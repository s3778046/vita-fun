// Imports
const express = require('express');
const router = express.Router();

// Access controller
const{
    getRecipes,
    setRecipes,
} = require('../controllers/recipesController');

router.get('/', getRecipes);
router.post('/', setRecipes);

// Export router
module.exports = router;
